using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Api.Helpers;
using Oportunia.Business.Interfaces;
using Oportunia.Business.Services;
using Oportunia.Domain.Requests;
using TutorNotaMil.Api.Helpers;

namespace Oportunia.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CompanyController : ControllerBase
{
    private readonly ICompanyService _companyService;

    public CompanyController(ICompanyService companyService)
    {
        _companyService = companyService;
    }

    [HttpGet("GetCompanyProfile/{tag}")]
    public async Task<ActionResult> GetCompanyProfile(string tag)
    {
        var companyProfile = await _companyService.GetCompanyProfileAsync(tag);
        return Ok(companyProfile);
    }

    [Authorize(Roles = "Company")]
    [HttpGet("GetBasicCompanyDataByCompanyId")] 
    public async Task<ActionResult> GetBasicCompanyDataByCompanyId()
    {
        Guid companyId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var basicCompanyData = await _companyService.GetBasicCompanyDataByCompanyIdAsync(companyId);
        return Ok(basicCompanyData);
    } 

    [HttpPost("CreateCompanyData")]
    public async Task<ActionResult> CreateCompanyData([FromForm] CreateCompanyDataRequest model)
    {
        await _companyService.CreateCompanyDataAsync(model);
        return Ok("Empresa cadastrada com sucesso!");
    }

    [Authorize(Roles = "Company")]
    [HttpPut("UpdateCompanyProfileLogo")]
    public async Task<ActionResult> UpdateCompanyProfileLogo([FromForm] UpdateCompanyProfileLogoRequest model)
    {
        Guid companyId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _companyService.UpdateCompanyProfileLogoAsync(model.Logo, companyId);
        return Ok("Logo atualizada com sucesso!");
    }

    [Authorize(Roles = "Company")]
    [HttpPut("UpdateCompanyData")]
    public async Task<ActionResult> UpdateCompanyData(UpdateCompanyDataRequest model)
    {
        Guid companyId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _companyService.UpdateCompanyDataAsync(model, companyId);
        return Ok("Informações básicas atualizadas!");
    }
}
