using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Repositories
{
    public interface IMovieRepository
    {
        Task<ICollection<Movie>> GetAllAsync();
        Task<Movie> GetAsync(int id);
        Task AddAsync(Movie movie);
        Task UpdateAsync(int id, Movie movie);
        Task DeleteAsync(int id);
    }
}