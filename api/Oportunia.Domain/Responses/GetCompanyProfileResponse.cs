namespace Oportunia.Domain.Responses;

public class GetCompanyProfileResponse
{
    public string Email { get; set; } = null!;
    public string? PhoneNumber { get; set; } 
    public string CompanyName { get; set; } = null!;
    public string? Description { get; set; }
    public string Cnpj { get; set; } = null!;
    public string? LinkedinUrl { get; set; } 
    public string? InstagramUrl { get; set; }
    public string LogoUrl { get; set; } = null!;
    public List<ActiveVacancyInCompany>? ActiveVacancies { get; set; }
}

public class ActiveVacancyInCompany
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
}
