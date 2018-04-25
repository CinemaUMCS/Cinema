using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Repositories;
using Cinema.Request;

namespace Cinema.Services
{
  class MovieService : IMovieService
  {
    private readonly IMovieRepository _movieRepository;
    private readonly IMapper _mapper;

    public MovieService(IMovieRepository movieRepository, IMapper mapper)
    {
      _movieRepository = movieRepository;
      _mapper = mapper;
    }

    public async Task<IEnumerable<MovieDto>> GetAllAsync()
    {
      var movies = await _movieRepository.GetAllAsync();
      return _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(movies);
    }
    public async Task<IEnumerable<MovieDto>> GetMoviesPlayingAtDate(DateTime date)
    {
      var movies = await _movieRepository.GetAllAsync();
      var filteredMovies = movies.Where(m => m.Seances.Any(s => s.SeanceStart.ToShortDateString() == date.ToShortDateString()));
      return _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(filteredMovies);
    }
    public async Task<MovieDto> GetAsync(int id)
    {
      var movie = await _movieRepository.GetAsync(id);
      return _mapper.Map<Movie, MovieDto>(movie);
    }

    public async Task AddAsync(AddMovie movie)
    {
      var newMovie = _mapper.Map<AddMovie, Movie>(movie);
      await _movieRepository.AddAsync(newMovie);
    }

    public async Task UpdateAsync(int id, Movie movie)
    {
      await _movieRepository.UpdateAsync(id, movie);
    }

    public async Task DeleteAsync(int id)
    {
      await _movieRepository.DeleteAsync(id);
    }

    public IEnumerable<string> GetCategories()
    {
      IEnumerable<string> categories = Enum.GetNames(typeof(Category));
      return categories;
    }


  }
}
