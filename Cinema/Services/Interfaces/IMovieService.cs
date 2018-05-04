using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Request;

namespace Cinema.Services
{
  public interface IMovieService
  {
    Task<IEnumerable<MovieDto>> GetAllAsync();
    Task<IEnumerable<MovieDto>> GetMoviesPlayingAtDate(DateTime date);
    Task<MovieDto> GetAsync(int id);
    Task AddAsync(MovieRequest addMovie);
    Task UpdateAsync(int id, MovieRequest updateMovie);
    Task DeleteAsync(int id);
    IEnumerable<string> GetCategories();
  }
}
