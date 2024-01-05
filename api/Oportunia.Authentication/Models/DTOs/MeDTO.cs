using Oportunia.Utils.Enums;

namespace Oportunia.Authentication.Models.DTOs;

public class MeDTO
{
    public string Email { get; set; } = null!;
    public List<string> Roles { get; set; } = null!;
}
