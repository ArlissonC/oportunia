using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Business.Interfaces;
using Oportunia.Business.Services;
using Oportunia.Domain;
using Oportunia.Domain.Requests;
using TutorNotaMil.Api.Helpers;

namespace Oportunia.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CandidateController : ControllerBase
{
    private readonly ICandidateService _candidateService;

    public CandidateController(ICandidateService candidateService)
    {
        _candidateService = candidateService;
    }

    [HttpGet("GetCandidateProfile/{tag}")]
    public async Task<ActionResult> GetCandidateProfile(string tag)
    {
        var candidateProfile = await _candidateService.GetCandidateProfileAsync(tag);
        return Ok(candidateProfile);
    }

    [Authorize(Roles = "Candidate")]
    [HttpGet("GetCandidateProfessionalExperiences")]
    public async Task<ActionResult> GetCandidateProfessionalExperiences()
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var professionalExperiences = await _candidateService.GetCandidateProfessionalExperiencesAsync(candidateId);
        return Ok(professionalExperiences);
    }

    [Authorize(Roles = "Candidate")]
    [HttpGet("GetVacanciesCandidate")]
    public async Task<ActionResult> GetVacanciesCandidate()
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var vacancies = await _candidateService.GetVacanciesCandidateAsync(candidateId);
        return Ok(vacancies);
    }

    [Authorize(Roles = "Candidate")]
    [HttpGet("GetBasicCandidateData")]
    public async Task<ActionResult> GetBasicCandidateData()
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var basicCandidateData = await _candidateService.GetBasicCandidateDataAsync(candidateId);
        return Ok(basicCandidateData);
    }

    [Authorize(Roles = "Candidate")]
    [HttpGet("GetProfessionalExperienceById/{id}")]
    public async Task<ActionResult> GetProfessionalExperienceById(Guid id)
    {
        var professionalExperience = await _candidateService.GetProfessionalExperienceByIdAsync(id);
        return Ok(professionalExperience);
    }

    [HttpPost("CreateCandidateData")]
    public async Task<ActionResult> CreateCandidateData([FromForm] CreateCandidateDataRequest model)
    {
        await _candidateService.CreateCandidateDataAsync(model);
        return Ok("Candidato cadastrado com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpPost("CreateCandidateProfessionalExperience")]
    public async Task<ActionResult> CreateCandidateProfessionalExperience(ProfessionalExperience model)
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _candidateService.CreateCandidateProfessionalExperienceAsync(model, candidateId);
        return Ok("Experiência profissional criada com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpPut("UpdateCandidateProfessionalExperience")]
    public async Task<ActionResult> UpdateCandidateProfessionalExperience(ProfessionalExperience model)
    {
        await _candidateService.UpdateCandidateProfessionalExperienceAsync(model);
        return Ok("Experiência profissional atualizada com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpPut("UpdateCandidateData")]
    public async Task<ActionResult> UpdateCandidateData([FromForm] UpdateCandidateDataRequest model)
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _candidateService.UpdateCandidateDataAsync(model, candidateId);
        return Ok("Informações básicas atualizadas com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpPut("UpdateCandidateProfilePhoto")]
    public async Task<ActionResult> UpdateCandidateProfilePhoto([FromForm] UpdateCandidateProfilePhotoRequest model)
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _candidateService.UpdateCandidateProfilePhotoAsync(model.Photo, candidateId);
        return Ok("Foto atualizada com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpDelete("DeleteCandidateProfessionalExperience/{id}")]
    public async Task<ActionResult> DeleteCandidateProfessionalExperience(Guid id)
    {
        await _candidateService.DeleteCandidateProfessionalExperienceAsync(id);
        return Ok("Experiência profissional excluída com sucesso!");
    }

    [Authorize(Roles = "Candidate")]
    [HttpDelete("WithdrawApplicationVacancy/{vacancyId}")]
    public async Task<ActionResult> WithdrawApplicationVacancy(Guid vacancyId)
    {
        Guid candidateId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        await _candidateService.WithdrawApplicationVacancyAsync(vacancyId, candidateId);
        return Ok("Candidatura retirada com sucesso!");
    }
}
