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

namespace Cinema.Services
{
  public class ReservationService : IReservationService
  {
    private readonly IReservationRepository _reservationRepository;
    private readonly ISeanceRepository _seanceRepository;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public ReservationService(IReservationRepository reservationRepository, ISeanceRepository seanceRepository, IUserRepository userRepository,  IMapper mapper)
    {
      _reservationRepository = reservationRepository;
      _seanceRepository = seanceRepository;
      _userRepository = userRepository;
      _mapper = mapper;
    }

    public async Task<ICollection<ReservationDto>> GetAllAsync()
    {
      var reservations = await _reservationRepository.GetAllAsync();
      return _mapper.Map<ICollection<Reservation>, ICollection<ReservationDto>>(reservations);
    }

    public async Task<ReservationDto> GetAsync(int id)
    {
      var reservation = await _reservationRepository.GetAsync(id);
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

      Reservation reservation=new Reservation(addReservation.SeanceId,userId);
      foreach (var seatToReserveId in addReservation.SeatsToReserveIds)
      {
        if(seance.Room.Seats.All(s=>s.Id!=seatToReserveId))
          throw new Exception($"SeatId: {seatToReserveId} is invalid");
        if(seance.Reservations.Any(r=>r.ReservedSeats.Any(rs=>rs.SeatId==seatToReserveId)))
          throw new Exception($"Seat {seatToReserveId} already reserved");
        reservation.ReservedSeats.Add(new ReservedSeat(reservation.Id,seatToReserveId));
      }

      reservation.NumberOfConcessionaryTickets = addReservation.NumberOfConcessionaryTickets;
      reservation.NumberOfNormalTickets = addReservation.NumberOfNormalTickets;

      double concessionaryTicketsCost = addReservation.NumberOfConcessionaryTickets * seance.ConcessionaryTicketPrice;
      double normalTicketsCost = addReservation.NumberOfNormalTickets * seance.NormalTicketPrice;
      reservation.Value = concessionaryTicketsCost + normalTicketsCost;
      await _reservationRepository.AddAsync(reservation);
    }

    public async Task UpdateAsync(int id, Reservation reservation)
    {
      await _reservationRepository.UpdateAsync(id, reservation);
    }

    public async Task DeleteAsync(int id)
    {
      await _reservationRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<ReservationDto>> GetReservationsForUserAsync(int userId)
    {
      var user = await _userRepository.GetByIdAsync(userId);
      if(user==null)
        throw new Exception($"User with id={userId} doesn't exist");
      var reservations = await _reservationRepository.GetAllAsync();
      var userReservations =reservations.Where((r => r.UserId == userId));
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(userReservations);
    }

    public async Task<IEnumerable<ReservationDto>> GetReservationsForSeanceAsync(int seanceId)
    {
      var seance = await _seanceRepository.GetAsync(seanceId);
      if(seance==null)
        throw new Exception($"Seance with id={seanceId} doesn't exist");

      var reservations = await _reservationRepository.GetAllAsync();
      var seanceReservations =reservations.Where((r => r.SeanceId == seanceId));
      return _mapper.Map<IEnumerable<Reservation>, IEnumerable<ReservationDto>>(seanceReservations);
    }
  }
}
