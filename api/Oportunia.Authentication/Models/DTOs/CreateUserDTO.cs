using Oportunia.Utils.Enums;
using System.ComponentModel.DataAnnotations;

namespace Oportunia.Authentication.Models.DTOs;

public class CreateUserDTO
{
    [Required(ErrorMessage = "O campo de E-mail é obrigatório.")]
    [EmailAddress(ErrorMessage = "O campo de E-mail deve ser um endereço de e-mail válido.")]
    public string Email { get; set; } = null!;

    [Required(ErrorMessage = "O campo de Senha é obrigatório.")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$",
       ErrorMessage = "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um dígito e um caractere especial, e ter no mínimo 8 caracteres.")]
    public string Password { get; set; } = null!;
    public string Name { get; set; } = null!;
    public DateTime? BirthDate { get; set; }
    public string? PhoneNumber { get; set; }

    [Required(ErrorMessage = "O campo Role é obrigatório.")]
    [Range(0, 1, ErrorMessage = "O Role campo deve ter o valor 0 ou 1.")]
    public Roles Role { get; set; }
}
