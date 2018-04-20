using System;
using System.Collections.Generic;
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

    public async Task<ICollection<MovieDto>> GetAllAsync()
    {
      var movies = await _movieRepository.GetAllAsync();
      return _mapper.Map<ICollection<Movie>, ICollection<MovieDto>>(movies);
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
