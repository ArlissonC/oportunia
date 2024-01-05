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

public class CompanyRepository : ICompanyRepository
{
    private readonly IDbConnection _connection;
    private readonly string _baseApiUrl;

    public CompanyRepository(IOptions<DatabaseConfig> configuration, IOptions<UrlConfig> url)
    {
        _connection = new SqlConnection(configuration.Value.ApplicationConnection);
        _baseApiUrl = url.Value.BaseApiUrl;
    }
    public async Task<GetBasicCompanyDataByCompanyIdResponse> GetBasicCompanyDataByCompanyIdAsync(Guid companyId)
    {
        try
        {
            var query = $@"SELECT CD.*, C.Id, C.Tag, C.PhoneNumber
                           FROM CompanyData CD
                           LEFT JOIN AspNetUsers C ON C.Id = CD.CompanyId
                           WHERE CompanyId = @CompanyId";

            var response = await _connection.QueryAsync<CompanyData, Company, GetBasicCompanyDataByCompanyIdResponse>(query, (cd, c) =>
            {
                GetBasicCompanyDataByCompanyIdResponse mapping = new()
                {
                    CompanyName = cd.CompanyName,
                    Cnpj = cd.CNPJ,
                    Description = cd.Description,
                    Id = cd.Id,
                    Tag = c.Tag,
                    LinkedinUrl = cd.LinkedinUrl,
                    InstagramUrl = cd.InstagramUrl,
                    PhoneNumber = c.PhoneNumber
                };

                if (cd.Logo != null) mapping.LogoUrl = $@"{_baseApiUrl}/api/File/GetFile/{cd.Logo}";

                return mapping;
            }, param: new { companyId });

            return response.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CreateCompanyDataAsync(CreateCompanyDataRequest model, Guid companyId, string? logo)
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

                var companyDataQuery = $@"INSERT
                                          INTO CompanyData (CompanyName, Cnpj, Description, LinkedinUrl, InstagramUrl, CompanyId, Logo)
                                          VALUES (@CompanyName, @Cnpj, @Description, @LinkedinUrl, @InstagramUrl, @CompanyId, @Logo);";

                await _connection.ExecuteAsync(addressQuery,
                    param: new { UserId = companyId, model.Address.Cep, model.Address.Street, model.Address.State, model.Address.City, model.Address.Neighborhood, model.Address.Number }, transaction);
                await _connection.ExecuteAsync(companyDataQuery,
                    param: new { CompanyId = companyId, model.CompanyData.CompanyName, model.CompanyData.CNPJ, model.CompanyData.Description, model.CompanyData.LinkedinUrl, model.CompanyData.InstagramUrl, logo }, transaction);

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

    public async Task UpdateCompanyDataAsync(UpdateCompanyDataRequest model, Guid companyId)
    {
        _connection.Open();
        var transaction = _connection.BeginTransaction();

        try
        {
            var updateCompanyDataQuery = $@"UPDATE CompanyData SET CompanyName = @CompanyName, Cnpj = @Cnpj, Description = @Description, LinkedinUrl = @LinkedinUrl, InstagramUrl = @InstagramUrl
                                            WHERE CompanyId = @CompanyId";

            var updateAspNetUsersQuery = $@"UPDATE AspNetUsers SET Tag = @Tag, PhoneNumber = @PhoneNumber WHERE Id = @CompanyId";

            await _connection.ExecuteAsync(updateCompanyDataQuery, param: new { model.CompanyName, model.Cnpj, model.Description, model.LinkedinUrl, model.InstagramUrl, companyId }, transaction);
            await _connection.ExecuteAsync(updateAspNetUsersQuery, param: new { model.Tag, model.PhoneNumber, companyId }, transaction);

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

    public async Task UpdateCompanyProfileLogoAsync(string logoName, Guid companyId)
    {
        try
        {
            var query = @"UPDATE CompanyData SET Logo = @LogoName WHERE CompanyId = @CompanyId";

            await _connection.ExecuteAsync(query, param: new { logoName, companyId });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetCompanyProfileResponse> GetCompanyProfileAsync(string tag)
    {
        try
        {
            var query = @"SELECT CD.*, C.Id, C.Tag, C.PhoneNumber, C.Email, V.Id, V.Title 
                         FROM CompanyData CD
                         LEFT JOIN AspNetUsers C ON C.Id = CD.CompanyId
                         LEFT JOIN Vacancy V ON V.CompanyId = CD.CompanyId AND V.VacancyStatus <> 1
                         WHERE C.Tag = @Tag";

            GetCompanyProfileResponse companyProfile = new();
            List<ActiveVacancyInCompany> activesVacancies = new();

            var response = await _connection.QueryAsync<CompanyData, Company, Vacancy, GetCompanyProfileResponse>(query, (cd, c, v) =>
            {
                companyProfile.PhoneNumber = c.PhoneNumber;
                companyProfile.Email = c.Email;
                companyProfile.CompanyName = cd.CompanyName;
                companyProfile.Cnpj = cd.CNPJ;
                companyProfile.Description = cd.Description;
                companyProfile.InstagramUrl = cd.InstagramUrl;
                companyProfile.LinkedinUrl = cd.LinkedinUrl;

                if (cd.Logo != null) companyProfile.LogoUrl = $@"{_baseApiUrl}/api/File/GetFile/{cd.Logo}";

                if (v != null)
                {
                    ActiveVacancyInCompany vacancy = new()
                    {
                        Id = v.Id,
                        Title = v.Title
                    };

                    activesVacancies.Add(vacancy);
                }

                companyProfile.ActiveVacancies = activesVacancies;

                return companyProfile;
            }, param: new { tag });

            return response.FirstOrDefault()!;
        }
        catch (Exception)
        {
            throw;
        }
    }
}
