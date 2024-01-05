using Microsoft.AspNetCore.Identity;
using Oportunia.Authentication.Data.Interfaces;
using Oportunia.Authentication.Models;

namespace Oportunia.Authentication.Data.Repositories;

public class AdminRepository : IAdminRepository
{
    private readonly RoleManager<OportuniaIdentityRoles> _roleManager;

    public AdminRepository(RoleManager<OportuniaIdentityRoles> roleManager)
    {
        _roleManager = roleManager;
    }

    public async Task RegisterRolesAsync(List<string> roles)
    {
        try
        {
            foreach (var roleName in roles)
            {
                if (!await _roleManager.RoleExistsAsync(roleName))
                {
                    OportuniaIdentityRoles role = new() { Name = roleName };

                    await _roleManager.CreateAsync(role);
                }
            }
        }
        catch (Exception)
        {
            throw;
        }
    }
}
