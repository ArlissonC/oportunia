namespace Oportunia.Authentication.Models.DTOs;

public class ResetUserPasswordDTO
{
    public string ResetToken { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}
