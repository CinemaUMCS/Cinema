using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
    class ReservationRepository : IReservationRepository
    {
        private readonly CinemaDbContext _context;

        public ReservationRepository(CinemaDbContext context)
        {
            _context = context;
        }
        public async Task<ICollection<Reservation>> GetAllAsync()
        {
            return await _context.Reservations.Include(r => r.Show).ThenInclude(s => s.Movie)
                .Include(r => r.User)
                .Include(r => r.ReservedSeats)
                .ToListAsync();
        }

        public async Task<Reservation> GetAsync(int id)
        {
            var reservation = await _context.Reservations.Include(r => r.Show).ThenInclude(s => s.Movie)
                .Include(r => r.User)
                .Include(r => r.ReservedSeats).SingleOrDefaultAsync(s => s.Id == id);
            return reservation;
        }

        public async Task AddAsync(Reservation reservation)
        {
            await _context.Reservations.AddAsync(reservation);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(int id, Reservation reservation)
        {
            var reservationdb = await _context.Reservations.SingleOrDefaultAsync(r => r.Id == id);

            if (reservationdb == null)
                throw new Exception($"Reservation with id: {id} not found.");

            reservationdb.Paid = reservation.Paid;
            reservationdb.ShowId = reservation.ShowId;
            reservationdb.UserId = reservation.UserId;
            reservationdb.Status = reservation.Status;

            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var show = _context.Shows.SingleOrDefault(s => s.Id == id);

            if (show == null)
                throw new Exception($"Reservation with id: {id} not found.");
            _context.Shows.Remove(show);
            await _context.SaveChangesAsync();
        }
    }
}
