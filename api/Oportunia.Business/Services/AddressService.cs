using Oportunia.Business.Interfaces;
using Oportunia.Data.Interfaces;
using Oportunia.Domain;
using Oportunia.Domain.Requests;
using System.Reflection;

namespace Oportunia.Business.Services;

public class AddressService : IAddressService
{
    private readonly IAddressRepository _addressRepository;

    public AddressService(IAddressRepository addressRepository)
    {
        _addressRepository = addressRepository;
    }

    public async Task<Address> GetAddressByUserAsync(Guid userId)
    {
        try
        {
            return await _addressRepository.GetAddressByUserAsync(userId);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task UpdateAddressAsync(UpdateAddressRequest model)
    {
        try
        {
            await _addressRepository.UpdateAddressAsync(model);
        }
        catch (Exception)
        {
            throw;
        }
    }
}
