using Oportunia.Domain;
using Oportunia.Domain.Requests;

namespace Oportunia.Business.Interfaces;

public interface IAddressService
{
    Task<Address> GetAddressByUserAsync(Guid userId);
    Task UpdateAddressAsync(UpdateAddressRequest model);
}
