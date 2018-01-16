using System.Collections.Generic;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.DTO;

namespace Cinema.Services
{
    public interface IMovieService
    {
        Task<ICollection<MovieDto>> GetAllAsync();
        Task<MovieDto> GetAsync(int id);
        Task AddAsync(Movie movie);
        Task UpdateAsync(int id, Movie movie);
        Task DeleteAsync(int id);
    }
}