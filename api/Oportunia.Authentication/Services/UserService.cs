using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Oportunia.Authentication.Data.Interfaces;
using Oportunia.Authentication.Models;
using Oportunia.Authentication.Models.DTOs;
using Oportunia.Authentication.Services.Interfaces;
using Oportunia.Utils;
using System.Security.Claims;
using System.Text;

namespace Oportunia.Authentication.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly IEmailService _emailService;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserService(IUserRepository userRepository, ITokenService tokenService, IEmailService emailService, IHttpContextAccessor httpContextAccessor)
    {
        _userRepository = userRepository;
        _tokenService = tokenService;
        _emailService = emailService;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<OportuniaIdentityUser> Register(CreateUserDTO model)
    {
        try
        {
            var tag = ManipulateString.RemoveSpacesSpecialCharactersAccents(model.Name) + Guid.NewGuid().ToString().Substring(28);

            OportuniaIdentityUser userData = new()
            {
                Tag = tag,
                Name = model.Name,  
                Email = model.Email,
                UserName = model.Email,
                PhoneNumber = model.PhoneNumber
            };

            OportuniaIdentityUser user = await GetUserByEmailAsync(model.Email);

            if (user != null) throw new Exception("Usuário já cadastrado!");

            var result = await _userRepository.RegisterAsync(userData, model.Password, model.Role);

            if (result.Succeeded)
            {
                user = await GetUserByEmailAsync(model.Email);
                userData.Id = user!.Id;
            }

            return userData;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<string> Login(LoginUserDTO model)
    {
        try
        {
            OportuniaIdentityUser user = await GetUserByEmailAsync(model.Email) ?? throw new ArgumentNullException(null, "Usuário não encontrado!");

            var loginUser = await _userRepository.LoginAsync(user, model.Password);

            if (!loginUser.Succeeded)
            {
                throw new ArgumentException("E-mail ou senha inválidos!");
            }

            IList<string> roles = await _userRepository.GetUserRolesAsync(user);

            return _tokenService.GenerateToken(user, roles);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task ForgotPassword(string email)
    {
        try
        {
            OportuniaIdentityUser user = await GetUserByEmailAsync(email) ?? throw new Exception("Não existe um usuário com esse endereço de e-mail.");

            var resetToken = _userRepository.GenerateEmailConfirmationTokenAsync(user).Result;

            await _emailService.SendEmailWithTemplate(user.Email!, "d-2f3632bffc774be4b0a3eb865345e43d", new
            {
                redefinePasswordUrl = $"http://localhost:3000/reset-password?resetToken={WebEncoders.Base64UrlEncode(Encoding.UTF8.GetBytes(resetToken))}"
            });
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<IdentityResult> ResetUserPassword(ResetUserPasswordDTO model)
    {
        try
        {
            byte[] encodedResetToken = WebEncoders.Base64UrlDecode(model.ResetToken);
            string decodedResetToken = Encoding.UTF8.GetString(encodedResetToken);

            OportuniaIdentityUser user = await GetUserByEmailAsync(model.Email);

            IdentityResult passwordResetResponse = await _userRepository.ResetUserPasswordAsync(user, decodedResetToken, model.NewPassword);

            if (!passwordResetResponse.Succeeded) throw new ApplicationException("O token de redefinição de senha já foi utilizado ou é inválido!");

            return passwordResetResponse;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task ChangeUserPassword(ChangeUserPasswordDTO model)
    {
        var userEmail = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Email)?.Value!;

        OportuniaIdentityUser user = await GetUserByEmailAsync(userEmail);

        await _userRepository.ChangeUserPasswordAsync(user, model.CurrentPassword, model.NewPassword);

    }

    public async Task<OportuniaIdentityUser> GetUserByEmailAsync(string email)
    {
        OportuniaIdentityUser user = await _userRepository.GetUserByEmailAsync(email);

        return user;
    }

    public async Task<MeDTO> Me(Guid userId)
    {
        var user = await _userRepository.Me(userId);

        return user;
    }
}
