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

    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
      var categories = _movieService.GetCategories();
      return Json(categories);
    }

    [HttpGet("{id}", Name = "GetMovie")]
    public async Task<IActionResult> Get(int id)
    {
      //wyswietlac jeszcze seanse i ratingi
      var movie = await _movieService.GetAsync(id);
      if (movie == null)
        return NotFound();
      return Ok(movie);
    }

    [HttpPost]
    [Authorize(Roles = "admin, employee")]
    public async Task<IActionResult> Post([FromBody] AddMovie movie)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      await _movieService.AddAsync(movie);

      return Ok();
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "admin, employee")]
    public async Task<IActionResult> Put(int id, [FromBody] Movie movie)
    {
      if (!ModelState.IsValid)
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
