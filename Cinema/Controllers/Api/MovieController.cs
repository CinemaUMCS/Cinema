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
    [Route("Api/Movie")]
    public class MovieController : Controller
    {
        private readonly CinemaDbContext _context;
        public MovieController(CinemaDbContext context)
        {
            _context =  context;
        }

        [HttpGet]
        public IEnumerable<Movie> Get()
        {
            return _context.Movies.Include(m=>m.Ratings).Include(m=>m.Shows).ToList();
        }

        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var movie = _context.Movies.Include(m => m.Ratings).Include(m => m.Shows).SingleOrDefault(m => m.Id == id);
            if (movie == null)
                return NotFound();
            return Ok(movie);
        }
        
        [HttpPost]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Post([FromBody]Movie movie)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            _context.Movies.Add(movie);
            _context.SaveChanges();

            return CreatedAtRoute("Get", new { id = movie.Id }, movie);
        }
        
        [HttpPut("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Put(int id, [FromBody]Movie movie)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            var moviedb = _context.Movies.SingleOrDefault(m => m.Id == id);

            if (moviedb == null)
                return NotFound();

            moviedb.Title = movie.Title;
            moviedb.Description = movie.Description;
            moviedb.ProductionDate = movie.ProductionDate;
            moviedb.Ratings = movie.Ratings;
            moviedb.Shows = movie.Shows;
            moviedb.Category = movie.Category;
            _context.SaveChanges();

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Delete(int id)
        {
            var movie = _context.Movies.SingleOrDefault(m => m.Id == id);

            if (movie == null)
                return NotFound();

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return Ok();

        }
    }
}
