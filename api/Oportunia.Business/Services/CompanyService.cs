using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Oportunia.Api.Helpers;
using Oportunia.Business.Interfaces;
using Oportunia.Data.Interfaces;
using Oportunia.Domain.Configuration;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;
using System.Text;

namespace Oportunia.Business.Services;

public class CompanyService : ICompanyService
{
    private readonly ICompanyRepository _companyRepository;


    public CompanyService(ICompanyRepository companyRepository)
    {
        _companyRepository = companyRepository;
    }
    public async Task<GetBasicCompanyDataByCompanyIdResponse> GetBasicCompanyDataByCompanyIdAsync(Guid companyId)
    {
        try
        {
            return await _companyRepository.GetBasicCompanyDataByCompanyIdAsync(companyId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CreateCompanyDataAsync(CreateCompanyDataRequest model)
    {
        try
        {
            string? logo = null;
            if (model.CompanyData.Logo != null)
            {
                logo = await Files.SaveFile(model.CompanyData.Logo);

            }

            await _companyRepository.CreateCompanyDataAsync(model, model.CompanyId, logo);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCompanyDataAsync(UpdateCompanyDataRequest model, Guid companyId)
    {
        try
        {
            await _companyRepository.UpdateCompanyDataAsync(model, companyId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCompanyProfileLogoAsync(IFormFile logo, Guid companyId)
    {
        try
        {
            var logoName = await Files.SaveFile(logo);
            await _companyRepository.UpdateCompanyProfileLogoAsync(logoName, companyId);
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
            return await _companyRepository.GetCompanyProfileAsync(tag);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
