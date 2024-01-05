namespace Oportunia.Domain;

public class Vacancy
{
    public Guid Id { get; set; }
    public Guid CompanyId { get; set; }
    public int Area {  get; set; }
    public int Level { get; set; }
    public int Type { get; set; }
    public int Modality { get; set; }
    public double? Salary { get; set; }
    public string? Location { get; set; }
    public string Title { get; set; } = null!;
    public string? Description { get; set; }
    public string? Benefits { get; set; }
    public string? Responsibilities { get; set; }
    public string? Essential { get; set; }
    public string? Differential { get; set; }
    public bool UserCreatedOrAppliedVacancy { get; set; }
    public bool Disqualified { get; set; } = false;
    public DateTime CreatedAt { get; set; }
}
