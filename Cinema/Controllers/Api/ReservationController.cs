using System;
using System.Collections.Generic;
using System.Linq;
using cinema.Entities;
using Cinema.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Cinema.Controllers.Api
{
    [Produces("application/json")]
    [Route("Api/Reservation")]
    public class ReservationController : Controller
    {
        private readonly CinemaDbContext _context;
        public ReservationController(CinemaDbContext context)
        {
            _context =  context;
        }

        [HttpGet]
        public IEnumerable<Reservation> Get()
        {
            return _context.Reservations.Include(r=>r.Show).ThenInclude(s=>s.Movie)
                .Include(r=>r.User)
                .Include(r=>r.Seats)
                .ToList();
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var reservation = _context.Reservations.Include(r => r.Show).ThenInclude(s => s.Movie)
                .Include(r => r.User)
                .Include(r => r.Seats).SingleOrDefault(s => s.Id == id);
            if (reservation == null)
                return NotFound();
            return Ok(reservation);
        }
        
        [HttpPost]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Post([FromBody]Reservation reservation)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            _context.Reservations.Add(reservation);
            _context.SaveChanges();

            return CreatedAtRoute("Get", new { id = reservation.Id }, reservation);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Put(int id, [FromBody]Reservation reservation)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var reservationdb = _context.Reservations.SingleOrDefault(r => r.Id == id);

            if (reservationdb == null)
                return NotFound();

            reservationdb.Paid = reservation.Paid;
            reservationdb.ShowId = reservation.ShowId;
            reservationdb.UserId = reservation.UserId;
            reservationdb.Status = reservation.Status;

            _context.SaveChanges();

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Delete(int id)
        {
            var reservation = _context.Reservations.SingleOrDefault(r => r.Id == id);

            if (reservation == null)
                return NotFound();

            _context.Reservations.Remove(reservation);
            _context.SaveChanges();

            return Ok();

        }
    }
}
