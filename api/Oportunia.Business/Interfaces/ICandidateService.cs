using Microsoft.AspNetCore.Http;
using Oportunia.Domain;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Business.Interfaces;

public interface ICandidateService
{
    Task CreateCandidateDataAsync(CreateCandidateDataRequest model);
    Task CreateCandidateProfessionalExperienceAsync(ProfessionalExperience model, Guid candidateId);
    Task DeleteCandidateProfessionalExperienceAsync(Guid id);
    Task<GetBasicCandidateDataResponse> GetBasicCandidateDataAsync(Guid candidateId);
    Task<IEnumerable<ProfessionalExperience>> GetCandidateProfessionalExperiencesAsync(Guid candidateId);
    Task<GetCandidateProfileResponse> GetCandidateProfileAsync(string tag);
    Task<ProfessionalExperience> GetProfessionalExperienceByIdAsync(Guid id);
    Task<IEnumerable<Vacancy>> GetVacanciesCandidateAsync(Guid candidateId);
    Task UpdateCandidateDataAsync(UpdateCandidateDataRequest model, Guid candidateId);
    Task UpdateCandidateProfessionalExperienceAsync(ProfessionalExperience model);
    Task UpdateCandidateProfilePhotoAsync(IFormFile photo, Guid candidateId);
    Task WithdrawApplicationVacancyAsync(Guid vacancyId, Guid candidateId);
}
