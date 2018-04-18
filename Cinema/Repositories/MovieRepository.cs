using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
  public class MovieRepository : IMovieRepository
  {
    private readonly CinemaDbContext _context;

    public MovieRepository(CinemaDbContext context)
    {
      _context = context;
    }

    public async Task<ICollection<Movie>> GetAllAsync()
    {
      return await _context.Movies.Include(m => m.Ratings).Include(m => m.Seances).ToListAsync();
    }

    public async Task<Movie> GetAsync(int id)
    {
      var movie = await _context.Movies
        .Include(m => m.Ratings)
        .Include(m => m.Seances)
        .SingleOrDefaultAsync(m => m.Id == id);
      return movie;
    }

    public async Task AddAsync(Movie movie)
    {
      await _context.Movies.AddAsync(movie);
      await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, Movie movie)
    {
      var moviedb = await _context.Movies.SingleOrDefaultAsync(m => m.Id == id);

      if (moviedb == null)
        throw new Exception($"Movie with id: {id} not found.");

      moviedb.Title = movie.Title;
      moviedb.Description = movie.Description;
      moviedb.ProductionDate = movie.ProductionDate;
      moviedb.Ratings = movie.Ratings;
      moviedb.Seances = movie.Seances;
      moviedb.Category = movie.Category;
      await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
      var movie = await _context.Movies.SingleOrDefaultAsync(m => m.Id == id);
      if (movie == null)
        throw new Exception($"Movie with id: {id} not found.");

      _context.Movies.Remove(movie);
      await _context.SaveChangesAsync();
    }
  }
}
