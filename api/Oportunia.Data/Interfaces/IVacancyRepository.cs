using Oportunia.Domain;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Data.Interfaces;

public interface IVacancyRepository
{
    Task ApplyToVacancyAsync(Guid vacancyId, Guid candidateId);
    Task CloseVacancyAsync(Guid vacancyId);
    Task CreateVacancyAsync(CreateVacancyRequest model, Guid companyId);
    Task DisqualifyCandidateAsync(DisqualifyCandidateRequest model);
    Task<IEnumerable<Vacancy>> GetCompanyVacanciesAsync(Guid companyId);
    Task<GetCompanyVacancyToEdditionResponse> GetCompanyVacancyToEdditionAsync(Guid vacancyId);
    Task<IEnumerable<GetVacanciesResponse>> GetVacanciesAsync(int offset, string? search, Guid? userId);
    Task<GetVacancyByIdResponse> GetVacancyByIdAsync(Guid vacancyId, Guid? userId);
    Task UpdateVacancyAsync(UpdateVacancyRequest model);
}
