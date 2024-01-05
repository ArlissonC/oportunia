using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Business.Interfaces;
using Oportunia.Business.Services;
using Oportunia.Domain.Requests;
using TutorNotaMil.Api.Helpers;

namespace Oportunia.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VacancyController : ControllerBase
{
    private readonly IVacancyService _vacancyService;

    public VacancyController(IVacancyService vacancyService)
    {
        _vacancyService = vacancyService;
    }

    [HttpGet("GetVacancies")]
    public async Task<ActionResult> GetVacancies([FromQuery] string? search, [FromQuery] int currentPage = 1)
    {
        Guid userId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var vacancies = await _vacancyService.GetVacanciesAsync(currentPage, userId, search);
        return Ok(vacancies);
    }

    [Authorize(Roles = "Company")]
    [HttpGet("GetCompanyVacancies")]
    public async Task<ActionResult> GetCompanyVacancies()
    {
        Guid companyId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var vacancies = await _vacancyService.GetCompanyVacanciesAsync(companyId);

        return Ok(vacancies);
    }

    [Authorize(Roles = "Company")]
    [HttpGet("GetCompanyVacancyToEddition/{vacancyId}")]
    public async Task<ActionResult> GetCompanyVacancyToEddition(Guid vacancyId)
    {
        var vacancies = await _vacancyService.GetCompanyVacancyToEdditionAsync(vacancyId);
        return Ok(vacancies);
    }

    [Authorize(Roles = "Company, Candidate")]
    [HttpGet("GetVacancyById/{vacancyId}")]
    public async Task<ActionResult> GetVacancyById(Guid vacancyId)
    {
        Guid? userId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var vacancy = await _vacancyService.GetVacancyByIdAsync(vacancyId, userId);

        return Ok(vacancy);
    }

    [Authorize(Roles = "Company")]
    [HttpPut("UpdateVacancy")]
    public async Task<ActionResult> UpdateVacancy(UpdateVacancyRequest model)
    {
        await _vacancyService.UpdateVacancyAsync(model);
        return Ok("Vaga atualizada com sucesso!");
    }

    [Authorize(Roles = "Company")]
    [HttpPut("DisqualifyCandidate")]
    public async Task<ActionResult> DisqualifyCandidate(DisqualifyCandidateRequest model)
    {
        await _vacancyService.DisqualifyCandidateAsync(model);
        return Ok("Candidato desclassificado!");
    }

    [Authorize(Roles = "Company")]
    [HttpPut("CloseVacancy/{vacancyId}")]
    public async Task<ActionResult> CloseVacancy(Guid vacancyId)
    {
        await _vacancyService.CloseVacancyAsync(vacancyId);
        return Ok("Vaga encerrada com sucesso!");
    }

    [Authorize(Roles = "Company")]
    [HttpPost("CreateVacancy")]
    public async Task<ActionResult> CreateVacancy(CreateVacancyRequest model)
    {
        Guid companyId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _vacancyService.CreateVacancyAsync(model, companyId);
        return Ok("Vaga foi criada com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpPost("ApplyToVacancy")]
    public async Task<ActionResult> ApplyToVacancy([FromBody] ApplyToVacancyRequest model)
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _vacancyService.ApplyToVacancyAsync(model.VacancyId, candidateId);
        return Ok("Candidatura realizada com sucesso!");
    }
}
