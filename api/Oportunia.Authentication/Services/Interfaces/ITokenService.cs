using Oportunia.Authentication.Models;

namespace Oportunia.Authentication.Services.Interfaces;

public interface ITokenService
{
    string GenerateToken(OportuniaIdentityUser user, IList<string> roles);
}
