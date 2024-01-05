using Microsoft.AspNetCore.Http;

namespace Oportunia.Domain.Requests;

public class UpdateCompanyProfileLogoRequest
{
    public IFormFile Logo { get; set; } = null!;
}
