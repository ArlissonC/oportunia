namespace Oportunia.Domain;

public class Address
{
    public Guid Id { get; set; }
    public string Cep { get; set; } = null!;
    public string State { get; set; } = null!;
    public string City { get; set; } = null!;
    public string Street { get; set; } = null!;
    public string Neighborhood { get; set; } = null!;
    public string Number { get; set; } = null!;
    public Guid UserId { get; set; }
}
