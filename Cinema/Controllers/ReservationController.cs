using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
    public class ReservationController : BaseController
    {
        private readonly ReservationService _reservationService;

        public ReservationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IEnumerable<Reservation>> Get()
        {
            return await _reservationService.GetAllAsync();
        }

        [HttpGet("{id}", Name = "GetReservation")]
        public async Task<IActionResult> Get(int id)
        {
            var reservation = await _reservationService.GetAsync(id);
            if (reservation == null)
                return NotFound();
            return Ok(reservation);
        }
        
        [HttpPost]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Post([FromBody]Reservation reservation)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _reservationService.AddAsync(reservation);

            return CreatedAtRoute("GetReservation", new { id = reservation.Id }, reservation);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Put(int id, [FromBody]Reservation reservation)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _reservationService.UpdateAsync(id, reservation);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Delete(int id)
        {
            await _reservationService.DeleteAsync(id);
            return Ok();

        }
    }
}
