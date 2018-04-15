using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Controllers
{
    public class MovieController : BaseController
    {
        private readonly IMovieService _movieService;

        public MovieController(IMovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet]
        public async Task<IEnumerable<MovieDto>> Get()
        {
            return await _movieService.GetAllAsync();
        }

        [HttpGet("{id}", Name = "GetMovie")]
        public async Task<IActionResult> Get(int id)
        {
            var movie = await _movieService.GetAsync(id);
            if (movie == null)
                return NotFound();
            return Ok(movie);
        }
        
        [HttpPost]
        //[Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Post([FromBody]Movie movie)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            await _movieService.AddAsync(movie);

            return CreatedAtRoute("GetMovie", new { id = movie.Id }, movie);
        }
        
        [HttpPut("{id}")]
        //[Authorize(Roles = "admin, employee")]
        public async Task<IActionResult> Put(int id, [FromBody]Movie movie)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }

            await _movieService.UpdateAsync(id, movie);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        [Authorize(Roles = "admin, employee")]
        public IActionResult Delete(int id)
        {
            _movieService.DeleteAsync(id);

            return Ok();

        }
    }
}
