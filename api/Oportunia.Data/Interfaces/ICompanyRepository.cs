using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Data.Interfaces;

public interface ICompanyRepository
{
    Task CreateCompanyDataAsync(CreateCompanyDataRequest model, Guid companyId, string? logo);
    Task<GetBasicCompanyDataByCompanyIdResponse> GetBasicCompanyDataByCompanyIdAsync(Guid companyId);
    Task UpdateCompanyProfileLogoAsync(string logoName, Guid companyId);
    Task UpdateCompanyDataAsync(UpdateCompanyDataRequest model, Guid companyId);
    Task<GetCompanyProfileResponse> GetCompanyProfileAsync(string tag);
}
