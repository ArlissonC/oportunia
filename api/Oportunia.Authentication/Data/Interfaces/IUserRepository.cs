using Microsoft.AspNetCore.Identity;
using Oportunia.Authentication.Models;
using Oportunia.Authentication.Models.DTOs;
using Oportunia.Utils.Enums;

namespace Oportunia.Authentication.Data.Interfaces;

public interface IUserRepository
{
    Task<IdentityResult> RegisterAsync(OportuniaIdentityUser user, string password, Roles role);
    Task<SignInResult> LoginAsync(OportuniaIdentityUser user, string password);
    Task<OportuniaIdentityUser> GetUserByEmailAsync(string email);
    Task<IList<string>> GetUserRolesAsync(OportuniaIdentityUser user);
    Task<string> GenerateEmailConfirmationTokenAsync(OportuniaIdentityUser user);
    Task<IdentityResult> ResetUserPasswordAsync(OportuniaIdentityUser user, string resetToken, string newPassword);
    Task<IdentityResult> ChangeUserPasswordAsync(OportuniaIdentityUser user, string currentPassword, string newPassword);
    Task<MeDTO> Me(Guid userId);
}
