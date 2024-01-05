using Oportunia.Domain;
using Oportunia.Domain.Requests;

namespace Oportunia.Data.Interfaces;

public interface IAddressRepository
{
    Task<Address> GetAddressByUserAsync(Guid userId);
    Task UpdateAddressAsync(UpdateAddressRequest model);
}
