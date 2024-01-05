using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Oportunia.Authentication.Models;

namespace Oportunia.Authentication.Data;

public class ApplicationDbContext : IdentityDbContext<OportuniaIdentityUser, OportuniaIdentityRoles, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
}
