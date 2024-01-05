using Microsoft.AspNetCore.Identity;

namespace Oportunia.Authentication.Models;

public class OportuniaIdentityUser : IdentityUser<Guid>
{
    public string Name { get; set; } = null!;
    public string Tag { get; set; } = null!;
}
