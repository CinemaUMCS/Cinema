using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.DTO;
using Cinema.Entities;

namespace Cinema.Services.Interfaces
{
  public interface IRatingService
  {
    Task<IEnumerable<MovieDto>> GetUnratedMovies(int userId);
    Task<int> GetRating(int userId, int movieId);
    Task<IEnumerable<WatchedMovieDto>> GetWatchedMoviesWithRatings(int userId);
    Task RateAsync(int userId, int movieId, int mark);
    Task UpdateRateAsync(int userId, int movieId, int mark);
  }
}
