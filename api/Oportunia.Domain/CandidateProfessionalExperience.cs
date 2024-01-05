namespace Oportunia.Domain;

public class CandidateProfessionalExperience
{
    public Guid Id { get; set; }
    public Guid CandidateId { get; set; }
    public Guid ProfessionalExperienceId { get; set; }
}
