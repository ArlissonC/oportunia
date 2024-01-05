using Oportunia.Authentication.Models.DTOs;

namespace Oportunia.Authentication.Services.Interfaces;

public interface IAdminService
{
    Task RegisterRoles(RegisterRolesDTO model);
}
