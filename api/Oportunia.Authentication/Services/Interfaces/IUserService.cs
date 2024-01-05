using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Authentication.Models;
using Oportunia.Authentication.Models.DTOs;

namespace Oportunia.Authentication.Services.Interfaces;

public interface IUserService
{
    Task<OportuniaIdentityUser> Register(CreateUserDTO model);
    Task<string> Login(LoginUserDTO model);
    Task ForgotPassword(string email);
    Task<IdentityResult> ResetUserPassword(ResetUserPasswordDTO model);
    Task ChangeUserPassword(ChangeUserPasswordDTO model);
    Task<OportuniaIdentityUser> GetUserByEmailAsync(string email);
    Task<MeDTO> Me(Guid userId);
}
