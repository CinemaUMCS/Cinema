using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using System.Linq;
using Cinema.Request;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  class MovieService : IMovieService
  {
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public MovieService(CinemaDbContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      _mapper = mapper;
    }

    public async Task<IEnumerable<MovieDto>> GetAllAsync()
    {
      var movies = await _dbContext.Movies.ToListAsync();
      return _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(movies);
    }
    public async Task<IEnumerable<MovieDto>> GetMoviesPlayingAtDate(DateTime date)
    {
      var movies = await _dbContext.Movies.Where(m => m.Seances.Any(s => s.SeanceStart.ToShortDateString() == date.ToShortDateString())).ToListAsync();
      return _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieDto>>(movies);
    }
    public async Task<MovieDto> GetAsync(int id)
    {
      var movie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
      return _mapper.Map<Movie, MovieDto>(movie);
    }

    public async Task AddAsync(MovieRequest addMovie)
    {
      var newMovie = new Movie(addMovie.Title, addMovie.TrailerPath, addMovie.PosterPath, addMovie.Category, addMovie.Description, addMovie.ProductionDate
        ,addMovie.Duration, addMovie.MinimalAge);
      await _dbContext.Movies.AddAsync(newMovie);
      await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, MovieRequest updateMovie)
    {
      var movie= await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
      if (movie == null)
        throw new Exception($"Movie with id: {id} not found.");

      movie.SetTitle(updateMovie.Title);
      movie.SetTrailerPath(updateMovie.TrailerPath);
      movie.SetProductionDate(updateMovie.ProductionDate);
      movie.SetPosterPath(updateMovie.TrailerPath);
      movie.SetCategory(updateMovie.Category);
      movie.SetDescription(updateMovie.Description);
      movie.SetDuration(updateMovie.Duration);
      movie.SetMinimalAge(updateMovie.MinimalAge);
      _dbContext.Update(movie);
      await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
      var movie = await _dbContext.Movies.SingleOrDefaultAsync(m => m.Id == id);
      if (movie == null)
        throw new Exception($"Movie with id: {id} not found.");

      _dbContext.Movies.Remove(movie);
      await _dbContext.SaveChangesAsync();
    }

    public IEnumerable<string> GetCategories()
    {
      IEnumerable<string> categories = Enum.GetNames(typeof(Category));
      return categories;
    }
  }
}
