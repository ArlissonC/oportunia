namespace Oportunia.Authentication.Data.Interfaces;

public interface IAdminRepository
{
    Task RegisterRolesAsync(List<string> roles);
}
