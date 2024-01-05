using Oportunia.Authentication.Data.Interfaces;
using Oportunia.Authentication.Models.DTOs;
using Oportunia.Authentication.Services.Interfaces;

namespace Oportunia.Authentication.Services;

public class AdminService : IAdminService
{
    private readonly IAdminRepository _adminRepository;

    public AdminService(IAdminRepository adminRepository)
    {
        _adminRepository = adminRepository;
    }

    public async Task RegisterRoles(RegisterRolesDTO model)
    {
        try
        {
            await _adminRepository.RegisterRolesAsync(model.Roles);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
