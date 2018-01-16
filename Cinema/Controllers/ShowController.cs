using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
    public class ShowController : BaseController
    {
        private readonly IShowService _showService;

        public ShowController(IShowService showService)
        {
            _showService = showService;
        }

        [HttpGet]
        public async Task<IEnumerable<ShowDto>> Get()
        {
            return await _showService.GetAllAsync();
        }

        [HttpGet("{id}", Name = "GetShow")]
        public async Task<IActionResult> Get(int id)
        {
            var show = await _showService.GetAsync(id);
            if (show == null)
                return NotFound();
            return Ok(show);
        }
        
        [HttpPost]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Post([FromBody]Show show)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _showService.AddAsync(show);

            return CreatedAtRoute("GetShow", new { id = show.Id }, show);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Put(int id, [FromBody]Show show)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _showService.UpdateAsync(id,show);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Delete(int id)
        {
            await _showService.DeleteAsync(id);

            return Ok();

        }
    }
}
