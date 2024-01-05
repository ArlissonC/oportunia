using Microsoft.Extensions.Configuration;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Oportunia.Utils.SendGrid;

public abstract class SenGridService
{
    private readonly IConfiguration _configuration;

    public SenGridService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailWithTemplate<T>(string recipientEmail, string templateId, T modelVariables)
    {
        var key = _configuration["SendGridConfiguration:API_Key"];
        var sender = _configuration["SendGridConfiguration:Sender"];
        var senderName = _configuration["SendGridConfiguration:Name"];

        var msg = new SendGridMessage();
        var client = new SendGridClient(key);

        msg.SetFrom(new EmailAddress(sender, senderName));
        msg.AddTo(recipientEmail);
        msg.SetTemplateId(templateId);
        msg.SetTemplateData(modelVariables);

        await client.SendEmailAsync(msg);
    }
}
