using Microsoft.AspNetCore.Identity;
using Oportunia.Authentication.Models;
using Oportunia.Authentication.Data.Interfaces;
using Oportunia.Utils.Enums;
using Oportunia.Authentication.Models.DTOs;

namespace Oportunia.Authentication.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly UserManager<OportuniaIdentityUser> _userManager;
    private readonly SignInManager<OportuniaIdentityUser> _signInManager;

    public UserRepository(UserManager<OportuniaIdentityUser> userManager, SignInManager<OportuniaIdentityUser> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<IdentityResult> RegisterAsync(OportuniaIdentityUser user, string password, Roles role)
    {
        try
        {
            IdentityResult responseCreateUser = await _userManager.CreateAsync(user, password);

            if (responseCreateUser.Succeeded)
            {
                if (role == Roles.Candidate)
                {
                    return await _userManager.AddToRoleAsync(user, Roles.Candidate.ToString());
                }

                return await _userManager.AddToRoleAsync(user, Roles.Company.ToString());
            }

            return responseCreateUser;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<SignInResult> LoginAsync(OportuniaIdentityUser user, string password)
    {
        return await _signInManager.PasswordSignInAsync(user.UserName, password, false, false);
    }

    public async Task<OportuniaIdentityUser> GetUserByEmailAsync(string email)
    {
        try
        {
            OportuniaIdentityUser user = await _userManager.FindByEmailAsync(email);

            return user;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IList<string>> GetUserRolesAsync(OportuniaIdentityUser user)
    {
        try
        {
            return await _userManager.GetRolesAsync(user);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<string> GenerateEmailConfirmationTokenAsync(OportuniaIdentityUser user)
    {
        try
        {
            return await _userManager.GeneratePasswordResetTokenAsync(user);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IdentityResult> ResetUserPasswordAsync(OportuniaIdentityUser user, string resetToken, string newPassword)
    {
        try
        {
            return await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IdentityResult> ChangeUserPasswordAsync(OportuniaIdentityUser user, string currentPassword, string newPassword)
    {
        try
        {
            var result = await _signInManager.CheckPasswordSignInAsync(user, currentPassword, false);
            if (!result.Succeeded) throw new Exception("Senha incorreta");

            return await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<MeDTO> Me(Guid userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        var userRoles = await _userManager.GetRolesAsync(user!);
        List<string> minhaLista = new(userRoles);

        MeDTO me = new()
        {
            Email = user.Email,
            Roles = minhaLista
        };

        return me;

    }
}
