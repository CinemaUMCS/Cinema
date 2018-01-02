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
    [Route("Api/Show")]
    public class ShowController : Controller
    {
        private readonly CinemaDbContext _context;
        public ShowController(CinemaDbContext context)
        {
            _context =  context;
        }

        [HttpGet]
        public IEnumerable<Show> Get()
        {
            return _context.Shows.Include(s=>s.Movie).Include(s=>s.Reservations).Include(s=>s.Room).ToList();
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var show = _context.Shows.Include(s => s.Movie).Include(s => s.Reservations).Include(s => s.Room).SingleOrDefault(s => s.Id == id);
            if (show == null)
                return NotFound();
            return Ok(show);
        }
        
        [HttpPost]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Post([FromBody]Show show)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            _context.Shows.Add(show);
            _context.SaveChanges();

            return CreatedAtRoute("Get", new { id = show.Id }, show);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Put(int id, [FromBody]Show show)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var showdb = _context.Shows.SingleOrDefault(s => s.Id == id);

            if (showdb == null)
                return NotFound();

            showdb.ShowDate = show.ShowDate;
            showdb.RoomId = show.RoomId;
            showdb.MovieId = show.MovieId;
            showdb.Reservations = show.Reservations;

            _context.SaveChanges();

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Delete(int id)
        {
            var show = _context.Shows.SingleOrDefault(s => s.Id == id);

            if (show == null)
                return NotFound();

            _context.Shows.Remove(show);
            _context.SaveChanges();

            return Ok();

        }
    }
}
