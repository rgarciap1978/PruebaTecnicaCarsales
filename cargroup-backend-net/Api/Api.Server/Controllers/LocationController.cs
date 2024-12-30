using Api.DTO;
using Api.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _service;

        public LocationController(ILocationService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var response = await _service.GetAsync();
                return response.Success ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var response = await _service.GetByIdAsync(id);
                return response.Success ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpGet("multiple")]
        public async Task<IActionResult> GetMultiple([FromQuery] string ids)
        {
            try
            {
                var response = await _service.GetMultipleAsync(ids);
                return response.Success ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }

        [HttpGet("filter")]
        public async Task<IActionResult> Filter([FromQuery] LocationFilterDTO locationFilterDTO)
        {
            try
            {
                var response = await _service.FilterAsync(locationFilterDTO);
                return response.Success ? Ok(response) : NoContent();
            }
            catch (Exception ex)
            {
                return NotFound();
            }
        }
    }
}
