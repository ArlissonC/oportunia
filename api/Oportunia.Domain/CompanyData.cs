namespace Oportunia.Domain;

public class CompanyData
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public string CompanyName { get; set; } = null!;
    public string CNPJ { get; set; } = null!;
    public string? Description { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? Logo {  get; set; }  
}
