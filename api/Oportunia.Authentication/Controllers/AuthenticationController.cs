using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Authentication.Models.DTOs;
using Oportunia.Authentication.Services.Interfaces;
using System.Security.Claims;
using TutorNotaMil.Api.Helpers;

namespace Oportunia.Authentication.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthenticationController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("Me")]
    public async Task<ActionResult> Me()
    {
        Guid userId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
        var user = await _userService.Me(userId);

        return Ok(user);
    }

    [HttpPost("Register")]
    public async Task<ActionResult> RegisterUser([FromBody] CreateUserDTO model)
    {
        var user = await _userService.Register(model);

        return Ok(new { Message = "Usuário cadastrado com sucesso!", user.Id });
    }

    [HttpPost("Login")]
    public async Task<ActionResult> Login([FromBody] LoginUserDTO model)
    {
        var token = await _userService.Login(model);

        return Ok(new
        {
            token
        });
    }

    [HttpPost("ForgotPassword")]
    public async Task<ActionResult> ForgotPassword([FromBody] ForgotPasswordDTO model)
    {
        await _userService.ForgotPassword(model.Email);

        return Ok(new { Message = "Você receberá um e-mail com as instruções de redefinição." });
    }

    [HttpPost("ResetUserPassword")]
    public async Task<ActionResult> ResetUserPassword([FromBody] ResetUserPasswordDTO model)
    {
        await _userService.ResetUserPassword(model);

        return Ok(new { Message = "Sua senha foi redefinida!" });
    }

    [HttpPost("ChangeUserPassword")]
    [Authorize]
    public async Task<ActionResult> ChangeUserPassword([FromBody] ChangeUserPasswordDTO model)
    {
        await _userService.ChangeUserPassword(model);

        return Ok("Sua senha foi redefinida!");
    }
}