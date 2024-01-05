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

public class VacancyRepository : IVacancyRepository
{
    private readonly IDbConnection _connection;

    public VacancyRepository(IOptions<DatabaseConfig> configuration)
    {
        _connection = new SqlConnection(configuration.Value.ApplicationConnection);
    }

    public async Task<GetVacancyByIdResponse> GetVacancyByIdAsync(Guid vacancyId, Guid? userId)
    {
        try
        {
            var query = $@"SELECT V.*, CV.*, C.Id, C.Name, C.Tag
                        FROM Vacancy V
                        LEFT JOIN AspNetUsers C ON C.Id = V.CompanyId
						LEFT JOIN CandidateVacancy CV ON CV.VacancyId = V.Id
                        WHERE V.Id = @VacancyId;";

            var vacancy = await _connection.QueryAsync<Vacancy, CandidateVacancy, Company, GetVacancyByIdResponse>(query, (v, cv, c) =>
            {
                GetVacancyByIdResponse vacancy = new()
                {
                    Id = v.Id,
                    CompanyTag = c.Tag,
                    CompanyName = c.Name,
                    Benefits = v.Benefits,
                    Description = v.Description,
                    Differential = v.Differential,
                    Essential = v.Essential,
                    Modality = v.Modality,
                    Responsibilities = v.Responsibilities,
                    Title = v.Title
                };

                if (cv != null && (cv.CandidateId == userId || v.CompanyId == userId)) vacancy.UserCreatedOrAppliedVacancy = true;

                return vacancy;
            }, param: new { vacancyId });

            return vacancy.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<GetVacanciesResponse>> GetVacanciesAsync(int offset, string? search, Guid? userId)
    {
        try
        {
            var querySearch = search != null ? $"AND V.Title LIKE '%{search}%'" : "";   

            var query = $@"SELECT DISTINCT V.Id, V.Type, V.CreatedAt, V.Title, V.Salary, V.Modality, V.Location, V.Area, V.CompanyId, CV.*, CD.CompanyId, CD.CompanyName
                          FROM Vacancy V
                          LEFT JOIN CandidateVacancy CV ON CV.VacancyId = V.Id
                          LEFT JOIN CompanyData CD ON CD.CompanyId = V.CompanyId
                          WHERE V.VacancyStatus = 0
                          {querySearch}
                          ORDER BY V.CreatedAt DESC
                          OFFSET @Offset ROWS
                          FETCH NEXT 10 ROWS ONLY;";


            List<GetVacanciesResponse> vacancies = new();
            var response = await _connection.QueryAsync<Vacancy, CandidateVacancy, CompanyData, GetVacanciesResponse>(
                query,
                (v, cv, cd) =>
                {
                    var vacancy = new GetVacanciesResponse
                    {
                        Salary = v.Salary,
                        Area = v.Area,
                        Id = v.Id,
                        CompanyName = cd.CompanyName,
                        CreatedAt = v.CreatedAt,
                        Location = v.Location,
                        Modality = v.Modality,
                        Title = v.Title,
                        Type = v.Type
                    };

                    if (cv != null && cv.CandidateId == userId) vacancy.UserCreatedOrAppliedVacancy = true;
                    if (v.CompanyId == userId) vacancy.UserCreatedOrAppliedVacancy = true;

                    if (!vacancies.Any(vac => vac.Id == v.Id)) vacancies.Add(vacancy);

                    return vacancy;
                },
                param: new { offset },
                splitOn: "Id, Id, CompanyId");


            return vacancies;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task ApplyToVacancyAsync(Guid vacancyId, Guid candidateId)
    {
        try
        {
            var query = $@" INSERT INTO CandidateVacancy (VacancyId, CandidateId) VALUES (@VacancyId, @CandidateId);";

            await _connection.ExecuteAsync(query, param: new { vacancyId, candidateId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CreateVacancyAsync(CreateVacancyRequest model, Guid companyId)
    {
        try
        {
            var vacancyQuery = $@" INSERT INTO Vacancy 
                                            (CompanyId, Location, Modality, Area, Level, Type, Salary, Title, Description, Responsibilities, Essential, Differential, Benefits)
                                            VALUES 
                                            (@CompanyId, @Location, @Modality, @Area, @Level, @Type, @Salary, @Title, @Description, @Responsibilities, @Essential, @Differential, @Benefits);";

            await _connection.ExecuteAsync(vacancyQuery, param: new { companyId, model.Location, model.Modality, model.Area, model.Level, model.Type, model.Salary, model.Title, model.Description, model.Responsibilities, model.Essential, model.Differential, model.Benefits });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateVacancyAsync(UpdateVacancyRequest model)
    {
        try
        {
            var query = $@"UPDATE Vacancy
                            SET Title = @Title, Salary = @Salary, Area = @Area, Modality = @Modality, Level = @Level, Type = @Type, 
                            Location = @Location, Description = @Description, Responsibilities = @Responsibilities, Essential = @Essential, 
                            Differential = @Differential, Benefits = @Benefits
                            WHERE Id = @VacancyId";

            await _connection.ExecuteAsync(query, model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task DisqualifyCandidateAsync(DisqualifyCandidateRequest model)
    {
        try
        {
            var query = $@"UPDATE CandidateVacancy
                            SET VacancyStatus = 2
                            WHERE VacancyId = @VacancyId 
                            AND CandidateId = @CandidateId";

            await _connection.ExecuteAsync(query, model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<Vacancy>> GetCompanyVacanciesAsync(Guid companyId)
    {
        try
        {
            var query = $@"SELECT * FROM Vacancy 
                            WHERE CompanyId = @CompanyId
                            AND VacancyStatus = 0";

            return await _connection.QueryAsync<Vacancy>(query, param: new { companyId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CloseVacancyAsync(Guid vacancyId)
    {
        try
        {
            _connection.Open();
            var transaction = _connection.BeginTransaction();

            try
            {
                var vacancyQuery = $@"UPDATE Vacancy SET VacancyStatus = 1
                                      WHERE Id = @VacancyId;";

                var candidateVacancyQuery = $@"UPDATE CandidateVacancy SET VacancyStatus = 2
                                        WHERE VacancyId = @VacancyId;";

                await _connection.ExecuteAsync(vacancyQuery, param: new { vacancyId }, transaction);
                await _connection.ExecuteAsync(candidateVacancyQuery, param: new { vacancyId }, transaction);

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

    public async Task<GetCompanyVacancyToEdditionResponse> GetCompanyVacancyToEdditionAsync(Guid vacancyId)
    {
        try
        {
            _connection.Open();
            var transaction = _connection.BeginTransaction();

            try
            {
                GetCompanyVacancyToEdditionResponse vacancyMapped = new();
                List<Candidate> candidates = new();
                var query = $@"SELECT V.*, C.Id, C.Name, C.Email, C.Tag, CD.Id, CD.JobPosition, CD.CandidateId
                                FROM Vacancy V
                                LEFT JOIN CandidateVacancy CV ON V.Id = CV.VacancyId AND CV.VacancyStatus <> 2
                                LEFT JOIN AspNetUsers C ON C.Id = CV.CandidateId
                                LEFT JOIN CandidateData CD ON CD.CandidateId = CV.CandidateId
                                WHERE V.Id = @VacancyId;";

                var response = await _connection.QueryAsync<Vacancy, Candidate, CandidateData, GetCompanyVacancyToEdditionResponse>(query, (vacancy, candidate, candidateData) =>
                {
                    if (candidate != null && candidateData != null)
                    {
                        candidate.JobPosition = candidateData.JobPosition;
                        candidates.Add(candidate);
                    }

                    vacancyMapped.Vacancy = vacancy;
                    vacancyMapped.Candidates = candidates;
                    return vacancyMapped;
                }, param: new { vacancyId }, transaction);

                transaction.Commit();
                return vacancyMapped;
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
}
