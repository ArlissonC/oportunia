using Microsoft.AspNetCore.Mvc;
using Oportunia.Authentication.Models.DTOs;
using Oportunia.Authentication.Services.Interfaces;

namespace Oportunia.Authentication.Controllers;

[ApiController]
[Route("[controller]")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpPost("RegisterRoles")]
    public async Task<ActionResult> RegisterRoles([FromBody] RegisterRolesDTO model)
    {
        await _adminService.RegisterRoles(model);

        return Ok("Role(s) cadastrada(s) com sucesso!");
    }
}
