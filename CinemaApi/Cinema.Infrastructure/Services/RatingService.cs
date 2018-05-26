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
  public class RatingService : IRatingService
  {
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public RatingService(CinemaDbContext dbContext, IMapper mapper)
    {
      this._dbContext = dbContext;
      this._mapper = mapper;
    }
    public async Task<IEnumerable<MovieWithUserRatingDto>> GetWatchedMoviesWithRatings(int userId)
    {
      var user = await _dbContext.Users.
      Include(x => x.Ratings).ThenInclude(x => x.Movie).
      Include(x => x.Reservations).ThenInclude(x => x.Seance).ThenInclude(x => x.Movie).ThenInclude(x => x.Ratings).
      SingleOrDefaultAsync(x => x.Id == userId);
      if (user == null)
        throw new Exception("User doesn't exists");
      var viewedMovies = user.Reservations.Where(x => x.Paid == true && x.Seance.SeanceStart < DateTime.Now).Select(x => x.Seance.Movie)
        .GroupBy(x => x.Id).Select(y => y.First());
      var watchedMovies= _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(viewedMovies);

      List<MovieWithUserRatingDto> moviesWithUserRating = new List<MovieWithUserRatingDto>();
      foreach(var movie in watchedMovies)
      {
        var movieWithUserRating = new MovieWithUserRatingDto();
        movieWithUserRating.Movie = movie;
        var rating= await GetRating(userId, movie.Id);
        movieWithUserRating.UserRating = rating;
        moviesWithUserRating.Add(movieWithUserRating);
      }
      return moviesWithUserRating;

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
      {
        await UpdateRateAsync(userId,movieId,mark);
      }
      else
      {
        ratingInDb = new Rating(userId, movieId, mark);
        await _dbContext.Ratings.AddAsync(ratingInDb);
        await _dbContext.SaveChangesAsync();
      }
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
    public async Task<int> GetRating(int userId, int movieId)
    {
      var rating= await _dbContext.Ratings.SingleOrDefaultAsync(x => x.UserId == userId && x.MovieId == movieId);
      if(rating==null)
        return 0;
      return rating.Mark;
    }
  }
}
