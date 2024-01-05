using Microsoft.AspNetCore.Http;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Business.Interfaces;

public interface ICompanyService
{
    Task CreateCompanyDataAsync(CreateCompanyDataRequest model);
    Task<GetBasicCompanyDataByCompanyIdResponse> GetBasicCompanyDataByCompanyIdAsync(Guid companyId);
    Task<GetCompanyProfileResponse> GetCompanyProfileAsync(string tag);
    Task UpdateCompanyDataAsync(UpdateCompanyDataRequest model, Guid companyId);
    Task UpdateCompanyProfileLogoAsync(IFormFile logo, Guid companyId);
}
