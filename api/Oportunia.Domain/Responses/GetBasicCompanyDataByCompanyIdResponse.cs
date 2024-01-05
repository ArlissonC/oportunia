namespace Oportunia.Domain.Responses;

public class GetBasicCompanyDataByCompanyIdResponse
{
    public Guid Id { get; set; }
    public string CompanyName { get; set; } = null!;
    public string Cnpj { get; set; } = null!;
    public string? Description { get; set; }
    public string? LogoUrl { get; set; }
    public string? LinkedinUrl { get; set; } 
    public string? InstagramUrl { get; set; }
    public string Tag { get; set; } = null!;
    public string? PhoneNumber { get; set; } 
}
