using System;
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
using Cinema.Services.Interfaces;

namespace Cinema.Controllers
{
  public class MovieController : BaseController
  {
    private readonly IMovieService _movieService;
    private readonly IRatingService _rateService;

    public MovieController(IMovieService movieService, IRatingService rateService)
    {
      _movieService = movieService;
      this._rateService = rateService;
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
      var movie = await _movieService.GetAsync(id);
      if (movie == null)
        return NotFound();
      return Ok(movie);
    }
    [HttpGet("getMoviesPlayingAtDate")]
    public async Task<IActionResult> GetMoviesPlayingAtDate(DateTime date)
    {
      var movies = await _movieService.GetMoviesPlayingAtDate(date);
      return Json(movies);
    }

    [HttpPost]
    [Authorize(Roles = "admin, employee")]
    public async Task<IActionResult> Post([FromBody] MovieRequest movie)
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
    public async Task<IActionResult> Put(int id, [FromBody] MovieRequest movie)
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
    public async Task<IActionResult> Delete(int id)
    {
      await _movieService.DeleteAsync(id);

      return Ok();
    }
  }
}
