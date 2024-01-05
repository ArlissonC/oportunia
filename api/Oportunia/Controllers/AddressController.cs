using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Oportunia.Business.Interfaces;
using Oportunia.Domain.Requests;
using TutorNotaMil.Api.Helpers;

namespace Oportunia.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressService _addressService;
        public AddressController(IAddressService addressService)
        {
            _addressService = addressService;
        }

        [Authorize(Roles = "Company, Candidate")]
        [HttpGet("GetAddressByUser")]
        public async Task<ActionResult> GetAddressByUser()
        {
            Guid userId = ClaimsHelper.GetUserIdFromHttpContext(HttpContext);
            var address = await _addressService.GetAddressByUserAsync(userId);
            return Ok(address);
        }

        [Authorize(Roles = "Company, Candidate")]
        [HttpPut("UpdateAddress")]
        public async Task<ActionResult> UpdateAddress(UpdateAddressRequest model)
        {
            await _addressService.UpdateAddressAsync(model);
            return Ok("Endereço atualizado com sucesso!");
        }
    }
}
