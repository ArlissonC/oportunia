namespace Oportunia.Domain;

public class User
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Tag { get; set; } = null!;
    public string? PhoneNumber { get; set; } = null!;
}
