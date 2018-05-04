using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Repositories;
using Cinema.Request;
using System;
using System.Linq;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  public class ReservationService : IReservationService
  {
    private readonly ISeanceRepository _seanceRepository;
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public ReservationService(CinemaDbContext dbContext, ISeanceRepository seanceRepository,  IMapper mapper)
    {
      _dbContext = dbContext;
      _seanceRepository = seanceRepository;
      _mapper = mapper;
    }

    public async Task<ICollection<ReservationDto>> GetAllAsync()
    {
      var reservations = await _dbContext.Reservations.ToListAsync();
      return _mapper.Map<ICollection<Reservation>, ICollection<ReservationDto>>(reservations);
    }

    public async Task<ReservationDto> GetAsync(int id)
    {
      var reservation = await _dbContext.Reservations.FirstOrDefaultAsync(x => x.Id == id);
      return _mapper.Map<Reservation, ReservationDto>(reservation);
    }

    public async Task AddAsync(int userId,AddReservation addReservation)
    {
      if (addReservation.NumberOfConcessionaryTickets + addReservation.NumberOfNormalTickets !=
          addReservation.SeatsToReserveIds.Count())
        throw new Exception("Number of tickets is not equal to number of choosen seats");

      Seance seance = await _seanceRepository.GetAsync(addReservation.SeanceId);
      if(seance==null)
        throw new Exception("Seance doesn't exist");

      Reservation reservation=new Reservation(addReservation.SeanceId,userId,addReservation.NumberOfNormalTickets,addReservation.NumberOfConcessionaryTickets);
      foreach (var seatToReserveId in addReservation.SeatsToReserveIds)
      {
        if(seance.Room.Seats.All(s=>s.Id!=seatToReserveId))
          throw new Exception($"SeatId: {seatToReserveId} is invalid");
        if(seance.Reservations.Any(r=>r.ReservedSeats.Any(rs=>rs.SeatId==seatToReserveId)))
          throw new Exception($"Seat {seatToReserveId} already reserved");
        reservation.AddReservedSeat(seatToReserveId, _dbContext);
      }

      double concessionaryTicketsCost = addReservation.NumberOfConcessionaryTickets * seance.ConcessionaryTicketPrice;
      double normalTicketsCost = addReservation.NumberOfNormalTickets * seance.NormalTicketPrice;
      reservation.Value = concessionaryTicketsCost + normalTicketsCost;
      await _dbContext.Reservations.AddAsync(reservation);
      await _dbContext.SaveChangesAsync();
    }

    public async Task UpdateAsync(int id, Reservation reservation)
    {
      await _reservationRepository.UpdateAsync(id, reservation);
    }

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
      if(user==null)
        throw new Exception($"User with id={userId} doesn't exist");
      var reservations = await _dbContext.Reservations.Where((r => r.UserId == userId)).ToListAsync();
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(reservations);
    }

    public async Task<IEnumerable<ReservationDto>> GetReservationsForSeanceAsync(int seanceId)
    {
      var seance = await _seanceRepository.GetAsync(seanceId);
      if(seance==null)
        throw new Exception($"Seance with id={seanceId} doesn't exist");

      var reservations = await _dbContext.Reservations.Where((r => r.SeanceId == seanceId)).ToListAsync();
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(reservations);
    }
  }
}
