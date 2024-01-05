using Oportunia.Business.Interfaces;
using Oportunia.Data.Interfaces;
using Oportunia.Domain;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;
using Oportunia.Utils;
using System.Reflection;

namespace Oportunia.Business.Services;

public class VacancyService : IVacancyService
{
    private readonly IVacancyRepository _vacancyRepository;

    public VacancyService(IVacancyRepository vacancyRepository)
    {
        _vacancyRepository = vacancyRepository;
    }
    public async Task<IEnumerable<Vacancy>> GetCompanyVacanciesAsync(Guid companyId)
    {
        try
        {
            return await _vacancyRepository.GetCompanyVacanciesAsync(companyId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetVacancyByIdResponse> GetVacancyByIdAsync(Guid vacancyId, Guid? userId)
    {
        try
        {
            return await _vacancyRepository.GetVacancyByIdAsync(vacancyId, userId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<GetVacanciesResponse>> GetVacanciesAsync(int currentPage, Guid? userId, string? search)
    {
        try
        {
            int offset = (currentPage - 1) * 10;
            if (search != null) search = ManipulateString.SubstituirCaracteresEspeciais(search);
            return await _vacancyRepository.GetVacanciesAsync(offset, search, userId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task ApplyToVacancyAsync(Guid vacancyId, Guid candidateId)
    {
        try
        {
            await _vacancyRepository.ApplyToVacancyAsync(vacancyId, candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CreateVacancyAsync(CreateVacancyRequest model, Guid companyId)
    {
        try
        {
            await _vacancyRepository.CreateVacancyAsync(model, companyId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateVacancyAsync(UpdateVacancyRequest model)
    {
        try
        {
            if (model.Modality == 1) model.Location = null;
            await _vacancyRepository.UpdateVacancyAsync(model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task DisqualifyCandidateAsync(DisqualifyCandidateRequest model)
    {
        try
        {
            await _vacancyRepository.DisqualifyCandidateAsync(model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CloseVacancyAsync(Guid vacancyId)
    {
        try
        {
            await _vacancyRepository.CloseVacancyAsync(vacancyId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetCompanyVacancyToEdditionResponse> GetCompanyVacancyToEdditionAsync(Guid vacancyId)
    {
        try
        {
            return await _vacancyRepository.GetCompanyVacancyToEdditionAsync(vacancyId);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
