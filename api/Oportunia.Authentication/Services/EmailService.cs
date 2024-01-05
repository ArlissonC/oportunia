using Oportunia.Authentication.Services.Interfaces;
using Oportunia.Utils.SendGrid;

namespace Oportunia.Authentication.Services;

public class EmailService : SenGridService, IEmailService
{
    public EmailService(IConfiguration configuration) : base(configuration)
    {
    }
}
