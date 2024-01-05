namespace Oportunia.Authentication.Models.DTOs;

public class ChangeUserPasswordDTO
{
    public string CurrentPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
}
