using Microsoft.Extensions.DependencyInjection;
using Oportunia.Business.Interfaces;
using Oportunia.Business.Services;

namespace Oportunia.Business.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static void BusinessInjection(this IServiceCollection services)
    {
        services.AddScoped<IVacancyService, VacancyService>();
        services.AddScoped<ICompanyService, CompanyService>();
        services.AddScoped<IAddressService, AddressService>();
        services.AddScoped<ICandidateService, CandidateService>();
    }
}