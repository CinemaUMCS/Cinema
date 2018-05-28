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
  public class RatingController : BaseController
  {
    private readonly IRatingService _rateService;

    public RatingController(IRatingService rateService)
    {
      this._rateService = rateService;
    }
    [HttpPost("{movieId}")]
    [Authorize]
    public async Task<IActionResult> Rate(int movieId, int rating)
    {
      await _rateService.RateAsync(GetCurrentUserId(), movieId, rating);
      return Ok();
    }
    [HttpPut("{movieId}")]
    [Authorize]
    public async Task<IActionResult> UpdateRate(int movieId, int rating)
    {
      await _rateService.UpdateRateAsync(GetCurrentUserId(), movieId, rating);
      return Ok();
    }
    [HttpGet("UnratedMovies")]
    [Authorize]
    public async Task<IActionResult> GetUnrated()
    {
      var movies = await _rateService.GetUnratedMovies(GetCurrentUserId());
      return Ok(movies);
    }
    [HttpGet("WatchedMoviesWithRatings")]
    [Authorize]
    public async Task<IActionResult> GetWatchedMoviesWithRatings()
    {
      var watchedMovies=await _rateService.GetWatchedMoviesWithRatings(GetCurrentUserId());
      return Ok(watchedMovies);
    }
    [HttpGet()]
    public async Task<IActionResult> GetRate(int userId,int movieId)
    {
      var rate= await _rateService.GetRating(userId, movieId);
      return Ok(rate);
      
    }
  }
}
