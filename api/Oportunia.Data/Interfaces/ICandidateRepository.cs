using Oportunia.Domain;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Data.Interfaces;

public interface ICandidateRepository
{
    Task CreateCandidateProfessionalExperienceAsync(ProfessionalExperience model, Guid candidateId);
    Task CreateCandidateDataAsync(CreateCandidateDataRequest model, Guid candidateId, string photo, string curriculum);
    Task DeleteCandidateProfessionalExperienceAsync(Guid id);
    Task<CandidateData> GetBasicCandidateDataAsync(Guid candidateId);
    Task<IEnumerable<ProfessionalExperience>> GetCandidateProfessionalExperiencesAsync(Guid candidateId);
    Task<GetCandidateProfileResponse?> GetCandidateProfileAsync(string tag);
    Task UpdateCandidateDataAsync(UpdateCandidateDataRequest model, string curriculum, Guid candidateId);
    Task UpdateCandidateProfessionalExperienceAsync(ProfessionalExperience model);
    Task<ProfessionalExperience> GetProfessionalExperienceByIdAsync(Guid id);
    Task WithdrawApplicationVacancyAsync(Guid vacancyId, Guid candidateId);
    Task<IEnumerable<Vacancy>> GetVacanciesCandidateAsync(Guid candidateId);
    Task UpdateCandidateProfilePhotoAsync(string photoName, Guid candidateId);
}
