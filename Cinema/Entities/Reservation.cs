using Cinema.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;

namespace Cinema.Entities
{
  public class Reservation
  {
    public int Id { get; private set; }

    public bool Paid { get; private set; }
    public int NumberOfConcessionaryTickets { get; private set; }
    public int NumberOfNormalTickets { get; private set; }
    public double Value { get; private set; }

    public int SeanceId { get; private set; }
    public int UserId { get; private set; }
    public Seance Seance { get; private set; }
    public User User { get; private set; }

    private HashSet<ReservedSeat> _reservedSeats;
    public IEnumerable<ReservedSeat> ReservedSeats => _reservedSeats.ToList();

    private Reservation()
    {

    }
    public Reservation(int seanceId, int userId, int numberOfNormalTickets, int numberOfConcessionaryTickets)
    {
      SeanceId = seanceId;
      UserId = userId;
      NumberOfNormalTickets = numberOfNormalTickets;
      NumberOfConcessionaryTickets = numberOfConcessionaryTickets;
      _reservedSeats = new HashSet<ReservedSeat>();
      
    }
    public void AddReservedSeat(int seatId,CinemaDbContext context = null)
    {
      if (_reservedSeats != null)
      {
        _reservedSeats.Add(new ReservedSeat(seatId));
      }
      else if (context == null)
      {
        throw new ArgumentNullException(nameof(context),
            "You must provide a context if the ReservedSeats collection isn't valid.");
      }
      else if (context.Entry(this).IsKeySet)
      {
        context.Add(new ReservedSeat(seatId,Id));
      }
      else
      {
        throw new InvalidOperationException("Could not add a reservedSeat.");
      }
    }
    private void UpdateReservationValue()
    {
      //double concessionaryTicketsCost = NumberOfConcessionaryTickets * Seance.ConcessionaryTicketPrice;
      //double normalTicketsCost = addReservation.NumberOfNormalTickets * Seance.NormalTicketPrice;
    }
  }
}
