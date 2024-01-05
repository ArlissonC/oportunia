using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Options;
using Oportunia.Data.Interfaces;
using Oportunia.Domain;
using Oportunia.Domain.Configuration;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;
using System.Data;

namespace Oportunia.Data.Repositories;

public class CandidateRepository : ICandidateRepository
{
    private readonly IDbConnection _connection;
    private readonly string _baseApiUrl;

    public CandidateRepository(IOptions<DatabaseConfig> configuration, IOptions<UrlConfig> url)
    {
        _connection = new SqlConnection(configuration.Value.ApplicationConnection);
        _baseApiUrl = url.Value.BaseApiUrl;
    }

    public async Task CreateCandidateProfessionalExperienceAsync(ProfessionalExperience model, Guid candidateId)
    {

        _connection.Open();
        var transaction = _connection.BeginTransaction();

        try
        {
            var professionalExperienceQuery = $@"INSERT
                                                 INTO ProfessionalExperience (Id, Description, JobPosition, Company, StartDate, EndDate)
                                                 VALUES (@Id, @Description, @JobPosition, @Company, @StartDate, @EndDate);";

            var candidateProfessionalExperienceQuery = $@"INSERT
                                                          INTO CandidateProfessionalExperience (ProfessionalExperienceId, CandidateId)
                                                          VALUES (@ProfessionalExperienceId, @CandidateId);";

            await _connection.ExecuteAsync(professionalExperienceQuery, model, transaction);
            await _connection.ExecuteAsync(candidateProfessionalExperienceQuery, param: new { ProfessionalExperienceId = model.Id, candidateId }, transaction);

            transaction.Commit();
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
        finally
        {
            _connection.Close();
        }
    }

    public async Task CreateCandidateDataAsync(CreateCandidateDataRequest model, Guid candidateId, string photo, string curriculum)
    {
        try
        {
            _connection.Open();
            var transaction = _connection.BeginTransaction();

            try
            {
                var addressQuery = $@"INSERT
                                       INTO Address (Cep, Street, State, City, Neighborhood, Number, UserId)
                                       VALUES (@Cep, @Street, @State, @City, @Neighborhood, @Number, @UserId);";

                var candidateDataQuery = $@"INSERT
                                              INTO CandidateData (JobPosition, Level, Presentation, SalaryExpectation, LinkedinUrl, InstagramUrl, PortfolioUrl, GitHubUrl, Curriculum, Photo, CandidateId)
                                              VALUES (@JobPosition, @Level, @Presentation, @SalaryExpectation, @LinkedinUrl, @InstagramUrl, @PortfolioUrl, @GitHubUrl, @Curriculum, @Photo, @CandidateId);";

                var professionalExperienceQuery = $@"INSERT INTO ProfessionalExperience (Id, Description, JobPosition, Company, StartDate, EndDate) 
                                                     VALUES (@Id, @Description, @JobPosition, @Company, @StartDate, @EndDate);";

                var candidateProfessionalExperienceQuery = $@"INSERT INTO CandidateProfessionalExperience (CandidateId, ProfessionalExperienceId) 
                                                              VALUES (@CandidateId, @ProfessionalExperienceId);";

                await _connection.ExecuteAsync(addressQuery,
                    param: new { UserId = candidateId, model.Address.Cep, model.Address.Street, model.Address.State, model.Address.City, model.Address.Neighborhood, model.Address.Number }, transaction);
                await _connection.ExecuteAsync(candidateDataQuery,
                    param: new { candidateId, photo, curriculum, model.CandidateData.JobPosition, model.CandidateData.Level, model.CandidateData.Presentation, model.CandidateData.SalaryExpectation, model.CandidateData.LinkedinUrl, model.CandidateData.InstagramUrl, model.CandidateData.PortfolioUrl, model.CandidateData.GitHubUrl }, transaction);

                if (model.ProfessionalExperiences != null)
                {
                    List<CandidateProfessionalExperience> candidateProfessionalExperiences = new();

                    foreach (var professionalExperience in model.ProfessionalExperiences)
                    {
                        CandidateProfessionalExperience candidateProfessionalExperience = new()
                        {
                            CandidateId = candidateId,
                            ProfessionalExperienceId = professionalExperience.Id,
                        };

                        candidateProfessionalExperiences.Add(candidateProfessionalExperience);
                    }

                    await _connection.ExecuteAsync(professionalExperienceQuery, model.ProfessionalExperiences, transaction);
                    await _connection.ExecuteAsync(candidateProfessionalExperienceQuery, candidateProfessionalExperiences, transaction);
                }

                transaction.Commit();
            }
            catch (Exception)
            {
                transaction.Rollback();
                throw;
            }
            finally
            {
                _connection.Close();
            }
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task DeleteCandidateProfessionalExperienceAsync(Guid id)
    {
        try
        {
            var query = $@"DELETE FROM ProfessionalExperience
                            WHERE Id = @Id";

            await _connection.ExecuteAsync(query, param: new { id });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<CandidateData> GetBasicCandidateDataAsync(Guid candidateId)
    {
        try
        {
            var query = $@"SELECT CD.*, C.Id, C.Tag, C.PhoneNumber
                           FROM CandidateData CD
                           LEFT JOIN AspNetUsers C ON C.Id = CD.CandidateId
                           WHERE CandidateId = @CandidateId";

            var response = await _connection.QueryAsync<CandidateData, Candidate, CandidateData>(query, (cd, c) =>
            {
                cd.Tag = c.Tag;
                cd.PhoneNumber = c.PhoneNumber;
                return cd;
            }, param: new { candidateId });

            return response.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<ProfessionalExperience>> GetCandidateProfessionalExperiencesAsync(Guid candidateId)
    {
        try
        {
            var query = $@"SELECT PE.* FROM CandidateProfessionalExperience CPE
                            LEFT JOIN ProfessionalExperience PE ON PE.Id = CPE.ProfessionalExperienceId
                            WHERE CPE.CandidateId = @CandidateId";

            return await _connection.QueryAsync<ProfessionalExperience>(query, param: new { candidateId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetCandidateProfileResponse?> GetCandidateProfileAsync(string tag)
    {
        var query = $@"SELECT C.Id, C.Name, C.PhoneNumber, C.Tag, C.Email, CD.*, A.UserId, A.City, A.State, PE.* FROM AspNetUsers C 
                        LEFT JOIN CandidateData CD ON CD.CandidateId = C.Id
                        LEFT JOIN Address A ON A.UserId = C.Id
                        LEFT JOIN CandidateProfessionalExperience CPE ON CPE.CandidateId = C.Id 
                        LEFT JOIN ProfessionalExperience PE ON PE.Id = CPE.ProfessionalExperienceId
                        WHERE C.Tag = @Tag;";

        List<ProfessionalExperience> professionalExperiences = new();
        var response = await _connection.QueryAsync<Company, CandidateData, Address, ProfessionalExperience, GetCandidateProfileResponse>(query, (candidate, candidateData, address, professionalExperience) =>
        {
            if (professionalExperience != null) professionalExperiences.Add(professionalExperience);
            if (candidateData.Photo != null) candidateData.Photo = $@"{_baseApiUrl}/api/File/GetFile/{candidateData.Photo}";
            if (candidateData.Curriculum != null) candidateData.Curriculum = $@"{_baseApiUrl}/api/File/GetFile/{candidateData.Curriculum}";

            GetCandidateProfileResponse candidateMapped = new()
            {
                Address = address,
                Candidate = candidate,
                CandidateData = candidateData,
                ProfessionalExperiences = professionalExperiences
            };

            return candidateMapped;

        }, param: new { tag }, splitOn: "Id, Id, UserId, Id");

        return response.FirstOrDefault()!;
    }

    public async Task UpdateCandidateDataAsync(UpdateCandidateDataRequest model, string curriculum, Guid candidateId)
    {
        _connection.Open();
        var transaction = _connection.BeginTransaction();

        try
        {
            var curriculumQuery = model.Curriculum != null ? "Curriculum = @Curriculum," : "";
            var updateCandidateDataQuery = $@"
                UPDATE CandidateData
                SET JobPosition = @JobPosition,
                    SalaryExpectation = @SalaryExpectation,
                    Level = @Level,
                    Presentation = @Presentation,
                    LinkedinUrl = @LinkedinUrl,
                    InstagramUrl = @InstagramUrl,
                    PortfolioUrl = @PortfolioUrl,
                    {curriculumQuery}
                    GitHubUrl = @GitHubUrl
                WHERE CandidateId = @CandidateId";

            var updateAspNetUsersQuery = "UPDATE AspNetUsers SET Tag = @Tag, PhoneNumber = @PhoneNumber WHERE Id = @CandidateId";

            var parameters = new
            {
                model.JobPosition,
                curriculum,
                model.SalaryExpectation,
                model.Level,
                model.Presentation,
                model.LinkedinUrl,
                model.InstagramUrl,
                model.PortfolioUrl,
                model.GitHubUrl,
                CandidateId = candidateId,
                model.Tag,
                model.PhoneNumber
            };

            await _connection.ExecuteAsync(updateCandidateDataQuery, parameters, transaction);
            await _connection.ExecuteAsync(updateAspNetUsersQuery, parameters, transaction);

            transaction.Commit();
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
        finally
        {
            _connection.Close();
        }
    }

    public async Task UpdateCandidateProfessionalExperienceAsync(ProfessionalExperience model)
    {
        try
        {
            var query = @"UPDATE ProfessionalExperience
                          SET JobPosition = @JobPosition, Description = @Description, Company = @Company, StartDate = @StartDate, EndDate = @EndDate
                          WHERE Id = @Id";

            await _connection.QueryAsync<ProfessionalExperience>(query, model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<ProfessionalExperience> GetProfessionalExperienceByIdAsync(Guid id)
    {
        try
        {
            var query = @"SELECT * FROM ProfessionalExperience WHERE Id = @Id";

            var response = await _connection.QueryAsync<ProfessionalExperience>(query, param: new { id });

            if (!response.Any()) throw new Exception("Experiência professional não encontrada!");

            return response.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task WithdrawApplicationVacancyAsync(Guid vacancyId, Guid candidateId)
    {
        try
        {
            var query = @"DELETE FROM CandidateVacancy WHERE CandidateId = @CandidateId AND VacancyId = @VacancyId";

            await _connection.ExecuteAsync(query, param: new { vacancyId, candidateId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<Vacancy>> GetVacanciesCandidateAsync(Guid candidateId)
    {
        try
        {
            var query = @"SELECT V.ID, V.Title, CV.Id, CV.VacancyStatus FROM CandidateVacancy CV
                            LEFT JOIN Vacancy V ON V.Id = CV.VacancyId
                            WHERE CV.CandidateId = @CandidateId";

            return await _connection.QueryAsync<Vacancy, CandidateVacancy, Vacancy>(query, (v, cv) =>
            {
                if (cv.VacancyStatus == 2) v.Disqualified = true;

                return v;
            }, param: new { candidateId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCandidateProfilePhotoAsync(string photoName, Guid candidateId)
    {
        try
        {
            var query = @"UPDATE CandidateData SET Photo = @PhotoName WHERE CandidateId = @CandidateId";

            await _connection.ExecuteAsync(query, param: new { photoName, candidateId });
        }
        catch (Exception)
        {
            throw;
        }
    }
}
