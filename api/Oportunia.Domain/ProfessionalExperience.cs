namespace Oportunia.Domain;

public class ProfessionalExperience
{
    public Guid Id { get; set; }
    public string JobPosition { get; set; } = null!;
    public string? Description { get; set; }
    public string Company { get; set; } = null!;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
