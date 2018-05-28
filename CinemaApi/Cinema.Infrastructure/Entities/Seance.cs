using System;
using System.Collections.Generic;
using System.Linq;

namespace Cinema.Entities
{
    public class Seance
    {

        public int Id { get; private set; }
        public DateTime SeanceStart { get; private set; }
        public TimeSpan Duration { get; private set; }
        public double ConcessionaryTicketPrice { get;private set; }
        public double NormalTicketPrice { get; private set; }

        private HashSet<Reservation> _reservations;
        public ICollection<Reservation> Reservations => _reservations?.ToList();
        public Room Room { get; private set; }
        public Movie Movie { get;private set; }
        public int MovieId { get;private set; }
        public int RoomId { get;private set; }

    public Seance()
    {
    }

    public Seance(int movieId, int roomId,DateTime seanceStart, TimeSpan duration, double concessionaryTicketPrice, double normalTicketPrice)
    {
      SeanceStart = seanceStart;
      Duration = duration;
      ConcessionaryTicketPrice = concessionaryTicketPrice;
      NormalTicketPrice = normalTicketPrice;
      MovieId = movieId;
      RoomId = roomId;
      _reservations = new HashSet<Reservation>();
    }

    public void SetDuration(TimeSpan timeSpan)
    {
      Duration = timeSpan;
    }

    public void SetNormalTicketPrice(double normalTicketPrice)
    {
      NormalTicketPrice = normalTicketPrice;
    }

    public void SetConcessionaryTicketPrice(double concessionaryTicketPrice)
    {
      ConcessionaryTicketPrice = concessionaryTicketPrice;
    }
  }
}
