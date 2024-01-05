
using Microsoft.AspNetCore.Http;

namespace Oportunia.Domain.Requests;

public class CreateCompanyDataRequest
{
    public Guid CompanyId { get; set; }
    public CompanyDataRequest CompanyData { get; set; } = null!;
    public CreateCompanyDataAddressRequest Address { get; set; } = null!;
}

public class CreateCompanyDataAddressRequest
{
    public string Cep { get; set; } = null!;
    public string State { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Neighborhood { get; set; } = null!;
    public string Number { get; set; } = null!;
    public string Street { get; set; } = null!;
}

public class CompanyDataRequest
{
    public string CompanyName { get; set; } = null!;
    public string CNPJ { get; set; } = null!;
    public string? Description { get; set; }
    public string? LinkedinUrl { get; set; }
    public string? InstagramUrl { get; set; }
    public IFormFile? Logo { get; set; }
}