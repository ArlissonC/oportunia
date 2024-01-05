namespace Oportunia.Domain.Responses;

public class GetBasicCandidateDataResponse
{
    public Guid Id { get; set; }
    public string JobPosition { get; set; } = null!;
    public string? Presentation { get; set; } = null!;
    public decimal? SalaryExpectation { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? PhotoUrl { get; set; }
    public string? CurriculumUrl { get; set; }
    public string Tag { get; set; } = null!;
    public int Level { get; set; }
    public string? PhoneNumber { get; set; }
}
