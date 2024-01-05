using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Oportunia.Api.Helpers;
using Oportunia.Business.Interfaces;
using Oportunia.Data.Interfaces;
using Oportunia.Domain;
using Oportunia.Domain.Configuration;
using Oportunia.Domain.Requests;
using Oportunia.Domain.Responses;
using System.Reflection;
using System.Text;

namespace Oportunia.Business.Services;

public class CandidateService : ICandidateService
{
    private readonly ICandidateRepository _candidateRepository;
    private readonly string _baseApiUrl;


    public CandidateService(ICandidateRepository candidateRepository, IOptions<UrlConfig> url)
    {
        _candidateRepository = candidateRepository;
        _baseApiUrl = url.Value.BaseApiUrl;
    }

    public async Task CreateCandidateDataAsync(CreateCandidateDataRequest model)
    {
        try
        {
            var photo = "";
            var curriculum = "";
            if (model.CandidateData.Photo != null) photo = await Files.SaveFile(model.CandidateData.Photo);
            if (model.CandidateData.Curriculum != null) curriculum = await Files.SaveFile(model.CandidateData.Curriculum);
            List<ProfessionalExperience> professionalExperiences = new();

            if (model.ProfessionalExperiences != null)
            {
                foreach (var professionalExperience in model.ProfessionalExperiences)
                {
                    professionalExperience.Id = Guid.NewGuid();
                    professionalExperiences.Add(professionalExperience);
                }

                model.ProfessionalExperiences = professionalExperiences;
            }

            await _candidateRepository.CreateCandidateDataAsync(model, model.CandidateId, photo, curriculum);

        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task CreateCandidateProfessionalExperienceAsync(ProfessionalExperience model, Guid candidateId)
    {
        try
        {
            model.Id = Guid.NewGuid();
            await _candidateRepository.CreateCandidateProfessionalExperienceAsync(model, candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task DeleteCandidateProfessionalExperienceAsync(Guid id)
    {
        try
        {
            await _candidateRepository.DeleteCandidateProfessionalExperienceAsync(id);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetBasicCandidateDataResponse> GetBasicCandidateDataAsync(Guid candidateId)
    {
        try
        {
            var basicCandidateData = await _candidateRepository.GetBasicCandidateDataAsync(candidateId);
            GetBasicCandidateDataResponse basicCandidateDataMapped = new()
            {
                Id = basicCandidateData.Id,
                InstagramUrl = basicCandidateData.InstagramUrl,
                JobPosition = basicCandidateData.JobPosition,
                LinkedinUrl = basicCandidateData.LinkedinUrl,
                GitHubUrl = basicCandidateData.GitHubUrl,
                PortfolioUrl = basicCandidateData.PortfolioUrl,
                Presentation = basicCandidateData.Presentation,
                SalaryExpectation = basicCandidateData.SalaryExpectation,
                Tag = basicCandidateData.Tag,
                Level = basicCandidateData.Level,
                PhoneNumber = basicCandidateData.PhoneNumber
            };

            if (basicCandidateData.Curriculum != null) basicCandidateDataMapped.CurriculumUrl = $@"{_baseApiUrl}/api/File/GetFile/{basicCandidateData.Curriculum}";
            if (basicCandidateData.Photo != null) basicCandidateDataMapped.PhotoUrl = $@"{_baseApiUrl}/api/File/GetFile/{basicCandidateData.Photo}";

            return basicCandidateDataMapped;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<ProfessionalExperience>> GetCandidateProfessionalExperiencesAsync(Guid candidateId)
    {
        try
        {
            return await _candidateRepository.GetCandidateProfessionalExperiencesAsync(candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<GetCandidateProfileResponse> GetCandidateProfileAsync(string tag)
    {
        try
        {
            var candidate = await _candidateRepository.GetCandidateProfileAsync(tag);

            return candidate ?? throw new Exception("Candidato não encontrado");
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<ProfessionalExperience> GetProfessionalExperienceByIdAsync(Guid id)
    {
        try
        {
            return await _candidateRepository.GetProfessionalExperienceByIdAsync(id);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IEnumerable<Vacancy>> GetVacanciesCandidateAsync(Guid candidateId)
    {
        try
        {
            return await _candidateRepository.GetVacanciesCandidateAsync(candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCandidateDataAsync(UpdateCandidateDataRequest model, Guid candidateId)
    {
        try
        {
            var curriculum = "";
            if (model.Curriculum != null) curriculum = await Files.SaveFile(model.Curriculum);
            await _candidateRepository.UpdateCandidateDataAsync(model, curriculum, candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCandidateProfessionalExperienceAsync(ProfessionalExperience model)
    {
        try
        {
            await _candidateRepository.UpdateCandidateProfessionalExperienceAsync(model);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateCandidateProfilePhotoAsync(IFormFile photo, Guid candidateId)
    {
        try
        {
            var photoName = await Files.SaveFile(photo);
            await _candidateRepository.UpdateCandidateProfilePhotoAsync(photoName, candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task WithdrawApplicationVacancyAsync(Guid vacancyId, Guid candidateId)
    {
        try
        {
            await _candidateRepository.WithdrawApplicationVacancyAsync(vacancyId, candidateId);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
