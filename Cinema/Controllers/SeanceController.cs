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

namespace Cinema.Controllers
{
  public class SeanceController : BaseController
  {
    private readonly ISeanceService _seanceService;

    public SeanceController(ISeanceService seanceService)
    {
      _seanceService = seanceService;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
      var seances = await _seanceService.GetAllAsync();
      return Json(seances);
    }

    [HttpGet("getByDate")]
    public async Task<IActionResult> GetByDate(DateTime date)
    {
      var seances = await _seanceService.GetByDate(date);
      return Json(seances);
    }

    [HttpGet("getByMovieId/{movieId}")]
    public async Task<IActionResult> GetByMovieId(int movieId)
    {
      var seances = await _seanceService.GetByMovieId(movieId);
      return Json(seances);
    }
    [HttpGet("getByDateAndMovieId")]
    public async Task<IActionResult> GetByMovieId(DateTime date,int movieId)
    {
      var seances = await _seanceService.GetByDateAndMovieId(date, movieId);
      return Json(seances);
    }


    [HttpGet("getSeanceRoomData/{id}")]
    public async Task<IActionResult> GetSeanceRoomData(int id)
    {
      SeanceRoomData seanceRoomData = await _seanceService.GetSeanceRoomData(id);
      return Json(seanceRoomData);
    }

    [HttpGet("{id}", Name = "GetShow")]
    public async Task<IActionResult> Get(int id)
    {
      var show = await _seanceService.GetAsync(id);
      if (show == null)
        return NotFound();
      return Ok(show);
    }

    [HttpPost]
    //[Authorize(Roles = "admin")]
    public async Task<IActionResult> Post([FromBody] AddSeance seance)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      await _seanceService.AddAsync(seance);

      return Ok();
    }

    [HttpPut("{id}")]
    //[Authorize(Roles = "admin, employee")]
    public async Task<IActionResult> Put(int id, [FromBody] Seance seance)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }

      await _seanceService.UpdateAsync(id, seance);

      return Ok();
    }

    [HttpDelete("{id}")]
    //[Authorize(Roles = "admin, employee")]
    public async Task<IActionResult> Delete(int id)
    {
      await _seanceService.DeleteAsync(id);

      return Ok();

    }
  }
}
