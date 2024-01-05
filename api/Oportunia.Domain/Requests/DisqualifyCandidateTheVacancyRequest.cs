namespace Oportunia.Domain.Requests;

public class DisqualifyCandidateTheVacancyRequest
{
    public Guid VacancyId { get; set; }
    public Guid CandidateId { get; set; }

}
