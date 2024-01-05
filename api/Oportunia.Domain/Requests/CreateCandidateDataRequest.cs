using Microsoft.AspNetCore.Http;

namespace Oportunia.Domain.Requests;

public class CreateCandidateDataRequest
{
    public Guid CandidateId { get; set; }
    public CreateCandidateAddressRequest Address { get; set; } = null!;
    public CandidateDataRequest CandidateData { get; set; } = null!;
    public List<ProfessionalExperience>? ProfessionalExperiences { get; set; } = null!;
}

public class CreateCandidateAddressRequest
{
    public string Cep { get; set; } = null!;
    public string State { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string Neighborhood { get; set; } = null!;
    public string Number { get; set; } = null!;
}

public class CandidateDataRequest
{
    public string JobPosition { get; set; } = null!;
    public string? Presentation { get; set; }
    public decimal? SalaryExpectation { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public IFormFile? Curriculum { get; set; }
    public IFormFile? Photo { get; set; }
    public int Level { get; set; }
}
