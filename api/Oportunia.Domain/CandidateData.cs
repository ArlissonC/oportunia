namespace Oportunia.Domain;

public class CandidateData
{
    public Guid Id { get; set; }
    public Guid CandidateId { get; set; }
    public string JobPosition { get; set; } = null!;
    public string? Presentation {  get; set; }
    public decimal? SalaryExpectation {  get; set; }
    public string? LinkedinUrl {  get; set; }
    public string? InstagramUrl {  get; set; }
    public string? PortfolioUrl {  get; set; }
    public string? GitHubUrl {  get; set; }
    public string? Curriculum {  get; set; }
    public string? Photo {  get; set; }
    public int Level { get; set; }  
    public string Tag { get; set; } = null!;
    public string? PhoneNumber { get; set; } 
}
