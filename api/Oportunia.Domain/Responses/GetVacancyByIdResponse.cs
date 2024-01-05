using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Oportunia.Domain.Responses;

public class GetVacancyByIdResponse
{
    public Guid Id { get; set; }
    public string CompanyTag { get; set; } = null!;
    public string Title { get; set; } = null!;
    public string CompanyName { get; set; } = null!;
    public string? Description { get; set; }
    public string? Benefits { get; set; }
    public string? Responsibilities { get; set; }
    public string? Essential { get; set; }
    public string? Differential { get; set; }
    public int Modality { get; set; }
    public bool UserCreatedOrAppliedVacancy { get; set; }
}
