namespace Oportunia.Domain.Responses;

public class GetCandidateProfileResponse
{
    public Company Candidate { get; set; } = null!;
    public IEnumerable<ProfessionalExperience>? ProfessionalExperiences { get; set; }    
    public CandidateData CandidateData { get; set; } = null!;
    public Address Address { get; set; } = null!;
}
