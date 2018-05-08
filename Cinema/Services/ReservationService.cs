using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Request;
using System;
using System.Linq;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  public class ReservationService : IReservationService
  {
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public ReservationService(CinemaDbContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      _mapper = mapper;
    }

    public async Task<ICollection<ReservationDto>> GetAllAsync()
    {
      var reservations = await _dbContext.Reservations
        .Include(x => x.ReservedSeats).ThenInclude(x => x.Seat)
        .Include(x => x.Seance)
        .ToListAsync();
      return _mapper.Map<ICollection<Reservation>, ICollection<ReservationDto>>(reservations);
    }

    public async Task<ReservationDto> GetAsync(int id)
    {
      var reservation = await _dbContext.Reservations
        .Include(x => x.ReservedSeats).ThenInclude(x=>x.Seat)
        .Include(x => x.Seance)
        .FirstOrDefaultAsync(x => x.Id == id);

      var reservationDto = _mapper.Map<Reservation, ReservationDto>(reservation);
      return reservationDto;
    }

    public async Task AddAsync(int userId, AddReservation addReservation)
    {
      if (addReservation.NumberOfConcessionaryTickets + addReservation.NumberOfNormalTickets !=
          addReservation.SeatsToReserve.Count())
        throw new Exception("Number of tickets is not equal to number of choosen seats");

      Seance seance = await _dbContext.Seances
        .Include(x => x.Room).ThenInclude(x => x.Seats)
        .Include(x => x.Reservations).ThenInclude(x => x.ReservedSeats)
        .FirstOrDefaultAsync(x => x.Id == addReservation.SeanceId);
      if (seance == null)
        throw new Exception("Seance doesn't exist");

      Reservation reservation = new Reservation(addReservation.SeanceId, userId, addReservation.NumberOfNormalTickets, addReservation.NumberOfConcessionaryTickets);
      foreach (var seatToReserve in addReservation.SeatsToReserve)
      {
        var seat = await _dbContext.Seats.SingleOrDefaultAsync(x => x.RoomId == seance.RoomId && x.Number == seatToReserve.Number && x.Row == seatToReserve.Row);
        if (seat == null)
          throw new Exception("Seat with given row and numer doesn't exist in seance room.");
        if (seance.Reservations.Any(r => r.ReservedSeats.Any(rs => rs.SeatId == seat.Id)))
          throw new Exception($"Seat {seat.Row}|{seat.Number} already reserved");
        reservation.AddReservedSeat(seat.Id, _dbContext);
      }
      await _dbContext.Reservations.AddAsync(reservation);
      await _dbContext.SaveChangesAsync();
    }

    //public async Task UpdateAsync(int id, Reservation reservation)
    //{
    //var reservationdb = await _context.Reservations.SingleOrDefaultAsync(r => r.Id == id);

    //if (reservationdb == null)
    //  throw new Exception($"Reservation with id: {id} not found.");

    //reservationdb.Paid = reservation.Paid;
    //reservationdb.SeanceId = reservation.SeanceId;
    //reservationdb.UserId = reservation.UserId;

    //await _context.SaveChangesAsync();
    //await _reservationRepository.UpdateAsync(id, reservation);
    //}

    public async Task DeleteAsync(int id)
    {
      var reservation = await _dbContext.Seances.FirstOrDefaultAsync(s => s.Id == id);

      if (reservation == null)
        throw new Exception($"Reservation with id: {id} not found.");
      _dbContext.Seances.Remove(reservation);
      await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<ReservationDto>> GetReservationsForUserAsync(int userId)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
      if (user == null)
        throw new Exception($"User with id={userId} doesn't exist");
      var reservations = await _dbContext.Reservations
        .Include(x => x.ReservedSeats).ThenInclude(x=>x.Seat)
        .Include(x => x.Seance)
        .Where((r => r.UserId == userId)).ToListAsync();
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(reservations);
    }

    public async Task<IEnumerable<ReservationDto>> GetReservationsForSeanceAsync(int seanceId)
    {
      var seance = await _dbContext.Seances.FirstOrDefaultAsync(x => x.Id == seanceId);
      if (seance == null)
        throw new Exception($"Seance with id={seanceId} doesn't exist");

      var reservations = await _dbContext.Reservations
        .Include(x => x.ReservedSeats).ThenInclude(x=>x.Seat)
        .Include(x => x.Seance)
        .Where((r => r.SeanceId == seanceId)).ToListAsync();
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(reservations);
    }

  }
}
