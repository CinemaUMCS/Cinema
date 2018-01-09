using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
    class ShowRepository : IShowRepository
    {
        private readonly CinemaDbContext _context;

        public ShowRepository(CinemaDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Show>> GetAllAsync()
        {
            return await _context.Shows.Include(s => s.Movie)
                .Include(s => s.Reservations)
                .Include(s => s.Room).ToListAsync();
        }

        public async Task<Show> GetAsync(int id)
        {
            var show = await _context.Shows.Include(s => s.Movie)
                .Include(s => s.Reservations)
                .Include(s => s.Room)
                .SingleOrDefaultAsync(s => s.Id == id);
            return show;
        }

        public async Task AddAsync(Show show)
        {
            await _context.Shows.AddAsync(show);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, Show show)
        {

            var showdb = await _context.Shows.SingleOrDefaultAsync(s => s.Id == id);

            if (showdb == null)
                throw new Exception($"Show with id: {id} not found.");

            showdb.ShowDate = show.ShowDate;
            showdb.RoomId = show.RoomId;
            showdb.MovieId = show.MovieId;
            showdb.Reservations = show.Reservations;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var show = _context.Shows.SingleOrDefault(s => s.Id == id);

            if (show == null)
                throw new Exception($"Show with id: {id} not found.");
            _context.Shows.Remove(show);
            await _context.SaveChangesAsync();
        }
    }
}