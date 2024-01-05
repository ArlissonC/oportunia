namespace Oportunia.Domain;

public class CandidateVacancy
{
    public Guid Id { get; set; }
    public Guid VacancyId { get; set; }
    public Guid CandidateId { get; set; }
    public int VacancyStatus { get; set; }
}
