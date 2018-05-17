using Cinema.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Services.Interfaces
{
    public interface IRateService
    {
    Task RateAsync(int userId, int movieId, int rating);
    Task UpdateRateAsync(int userId, int movieId, int rating);
    Task<IEnumerable<MovieDto>> GetUnratedMovies(int userId);
  }
}
