using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
  class SeanceRepository : ISeanceRepository
  {
    private readonly CinemaDbContext _context;

    public SeanceRepository(CinemaDbContext context)
    {
      _context = context;
    }

    public async Task<ICollection<Seance>> GetAllAsync()
    {
      return await _context.Seances.Include(s => s.Movie)
        .Include(s => s.Reservations)
        .Include(s => s.Room).ToListAsync();
    }

    public async Task<Seance> GetAsync(int id)
    {
      var show = await _context.Seances.Include(s => s.Movie)
        .Include(s => s.Reservations).ThenInclude(r=>r.ReservedSeats)
        .Include(s => s.Room).ThenInclude(r=>r.Seats)
        .SingleOrDefaultAsync(s => s.Id == id);
      return show;
    }

    public async Task AddAsync(Seance seance)
    {
      await _context.Seances.AddAsync(seance);
      await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, Seance seance)
    {
      var showdb = await _context.Seances.SingleOrDefaultAsync(s => s.Id == id);

      if (showdb == null)
        throw new Exception($"Seances with id: {id} not found.");

      showdb.SeanceStart = seance.SeanceStart;
      showdb.RoomId = seance.RoomId;
      showdb.MovieId = seance.MovieId;
      showdb.Reservations = seance.Reservations;

      await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
      var show = _context.Seances.SingleOrDefault(s => s.Id == id);

      if (show == null)
        throw new Exception($"Seances with id: {id} not found.");
      _context.Seances.Remove(show);
      await _context.SaveChangesAsync();
    }
  }
}
