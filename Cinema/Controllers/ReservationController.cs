using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Request;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
    public class ReservationController : BaseController
    {
        private readonly IReservationService _reservationService;

        public ReservationController(IReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetReservationsForUser(int userId)
        {
          var userReservations=  await _reservationService.GetReservationsForUserAsync(userId);
          return Json(userReservations);
        }
        [HttpGet("seance/{seanceId}")]
        public async Task<IActionResult> GetReservationsForSeance(int seanceId)
        {
          var seanceReservations=  await _reservationService.GetReservationsForSeanceAsync(seanceId);
          return Json(seanceReservations);
        }

        [HttpGet("{id}", Name = "GetReservation")]
        public async Task<IActionResult> Get(int id)
        {
            var reservation = await _reservationService.GetAsync(id);
            if (reservation == null)
                return NotFound();
            return Json(reservation);
        }
        
        [HttpPost]
        //[Authorize]
        public async Task<IActionResult> AddReservation([FromBody]AddReservation addReservation)
        {
          if(!ModelState.IsValid)
          {
              return BadRequest();
          }
          await _reservationService.AddAsync(GetCurrentUserId(),addReservation);
          return Ok();
        }
        
        [HttpPut("{id}")]
        //[Authorize(Roles = "admin, employee")]
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
        //[Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Delete(int id)
        {
            await _reservationService.DeleteAsync(id);
            return Ok();

        }
    }
}
