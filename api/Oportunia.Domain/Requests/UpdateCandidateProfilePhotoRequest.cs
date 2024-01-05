using Microsoft.AspNetCore.Http;

namespace Oportunia.Domain.Requests;

public class UpdateCandidateProfilePhotoRequest
{
    public IFormFile Photo { get; set; } = null!;
}
