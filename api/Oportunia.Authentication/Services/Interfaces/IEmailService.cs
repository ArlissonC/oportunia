namespace Oportunia.Authentication.Services.Interfaces;

public interface IEmailService
{
    Task SendEmailWithTemplate<T>(string recipientEmail, string templateId, T modelVariables);
}
