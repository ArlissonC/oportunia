namespace Oportunia.Domain.Requests;

public class DisqualifyCandidateRequest
{
    public Guid CandidateId { get; set; }
    public Guid VacancyId { get; set; }
}
