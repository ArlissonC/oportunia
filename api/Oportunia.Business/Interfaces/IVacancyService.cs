using Oportunia.Domain;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;

namespace Oportunia.Business.Interfaces;

public interface IVacancyService
{
    Task ApplyToVacancyAsync(Guid vacancyId, Guid candidateId);
    Task CloseVacancyAsync(Guid vacancyId);
    Task CreateVacancyAsync(CreateVacancyRequest model, Guid companyId);
    Task DisqualifyCandidateAsync(DisqualifyCandidateRequest model);
    Task<IEnumerable<Vacancy>> GetCompanyVacanciesAsync(Guid companyId);
    Task<GetCompanyVacancyToEdditionResponse> GetCompanyVacancyToEdditionAsync(Guid vacancyId);
    Task<IEnumerable<GetVacanciesResponse>> GetVacanciesAsync(int currentPage, Guid? userId, string? search);
    Task<GetVacancyByIdResponse> GetVacancyByIdAsync(Guid vacancyId, Guid? userId);
    Task UpdateVacancyAsync(UpdateVacancyRequest model);
}
