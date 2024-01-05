namespace Oportunia.Domain.Requests;

public class UpdateVacancyRequest
{
    public Guid VacancyId { get; set; }
    public int Area {  get; set; }
    public int Level { get; set; }
    public int Type { get; set; }
    public double? Salary { get; set; }
    public int Modality { get; set; }
    public string? Location { get; set; }
    public string Title { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string? Responsibilities { get; set; }
    public string? Essential { get; set; }
    public string? Differential { get; set; } 
    public string? Benefits { get; set; }
}
