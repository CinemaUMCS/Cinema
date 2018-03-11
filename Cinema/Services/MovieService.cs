using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Repositories;

namespace Cinema.Services
{
    class MovieService : IMovieService
    {
        private readonly IMovieRepository _movieRepository;

        public MovieService(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }

        public async Task<ICollection<Movie>> GetAllAsync()
        {
            return await _movieRepository.GetAllAsync();
        }

        public async Task<Movie> GetAsync(int id)
        {
            return await _movieRepository.GetAsync(id);
        }

        public async Task AddAsync(Movie movie)
        {
            await _movieRepository.AddAsync(movie);
        }

        public async Task UpdateAsync(int id, Movie movie)
        {
            await _movieRepository.UpdateAsync(id,movie);
        }

        public async Task DeleteAsync(int id)
        {
            await _movieRepository.DeleteAsync(id);
        }
    }
}
