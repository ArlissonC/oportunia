namespace Oportunia.Domain.Requests;

public class UpdateCompanyDataRequest
{
    public string CompanyName { get; set; } = null!;
    public string Cnpj {  get; set; } = null!;  
    public string? PhoneNumber { get; set; }
    public string? Description { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string Tag { get; set; } = null!;
}
