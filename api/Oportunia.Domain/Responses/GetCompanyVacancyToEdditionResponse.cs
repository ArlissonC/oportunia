namespace Oportunia.Domain.Responses;

public class GetCompanyVacancyToEdditionResponse
{
    public Vacancy Vacancy { get; set; } = null!;
    public List<Candidate>? Candidates { get; set; }
}