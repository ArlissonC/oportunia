namespace Oportunia.Domain.Responses;

public class GetVacanciesResponse
{
    public Guid Id { get; set; }
    public int Type { get; set; }   
    public DateTime CreatedAt { get; set; }
    public string Title { get; set; } = null!;
    public double? Salary { get; set; }
    public int Modality { get; set; }
    public string? Location { get; set; }   
    public int Area { get; set; }
    public string CompanyName { get; set; } = null!;
    public bool UserCreatedOrAppliedVacancy { get; set; }
}
