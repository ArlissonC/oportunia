
using Microsoft.Extensions.DependencyInjection;
using Oportunia.Data.Interfaces;
using Oportunia.Data.Repositories;

namespace Oportunia.Data.DependencyInjection;

public static class ServiceCollectionExtensions
{
    public static void DataInjection(this IServiceCollection services)
    {
        services.AddScoped<IVacancyRepository, VacancyRepository>();
        services.AddScoped<ICompanyRepository, CompanyRepository>();
        services.AddScoped<IAddressRepository, AddressRepository>();
        services.AddScoped<ICandidateRepository, CandidateRepository>();
    }
}