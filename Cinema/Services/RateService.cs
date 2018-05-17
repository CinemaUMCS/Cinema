using AutoMapper;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Services.Interfaces
{
  public class RateService : IRateService
  {
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public RateService(CinemaDbContext dbContext, IMapper mapper)
    {
      this._dbContext = dbContext;
      this._mapper = mapper;
    }

    public async Task<IEnumerable<MovieDto>> GetUnratedMovies(int userId)
    {
      var user=await _dbContext.Users.
        Include(x=>x.Ratings).ThenInclude(x=>x.Movie).
        Include(x=>x.Reservations).ThenInclude(x=>x.Seance).ThenInclude(x=>x.Movie).ThenInclude(x=>x.Ratings).
        SingleOrDefaultAsync(x=>x.Id==userId);
      if(user==null)
        throw new Exception("User doesn't exists");
      var viewedMovies=user.Reservations.Where(x=>x.Paid==true && x.Seance.SeanceStart<DateTime.Now).Select(x=>x.Seance.Movie);
      var unratedMovies=viewedMovies.Except(user.Ratings.Select(x=>x.Movie));
      return _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(unratedMovies);
      
    }

    public async Task RateAsync(int userId, int movieId, int mark)
    {
      var movie = await _dbContext.Movies.SingleOrDefaultAsync(x => x.Id == movieId);
      if (movie == null)
        throw new Exception("Movie doesn't exists");

      var user = await _dbContext.Users.
        Include(x => x.Reservations).ThenInclude(x => x.Seance).
        SingleOrDefaultAsync(x => x.Id == userId);

      if (user == null)
        throw new Exception("User doesn't exists");
      if (!user.Reservations.Any(x => x.Paid == true && x.Seance.MovieId == movieId))
        throw new Exception("User didn't watch selected movie");

      var ratingInDb = await _dbContext.Ratings.SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);
      if (ratingInDb != null)
        throw new Exception("User already rate this movie");

      ratingInDb = new Rating(userId, movieId, mark);
      await _dbContext.Ratings.AddAsync(ratingInDb);
      await _dbContext.SaveChangesAsync();
    }
    public async Task UpdateRateAsync(int userId, int movieId, int mark)
    {
      var rating = await _dbContext.Ratings.SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);
      if (rating == null)
        throw new Exception("Rating doesn't exists");
      rating.SetMark(mark);
      _dbContext.Ratings.Update(rating);
      await _dbContext.SaveChangesAsync();
    }
  }
}
