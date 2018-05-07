using System;
using System.Collections.Generic;
using System.Linq;

namespace Cinema.Entities
{
    public class Seance
    {

        public int Id { get; private set; }
        public DateTime SeanceStart { get;private  set; }
        public TimeSpan Duration { get;private  set; }
        public double ConcessionaryTicketPrice { get;private set; }
        public double NormalTicketPrice { get;private set; }

        private HashSet<Reservation> _reservations;
        public ICollection<Reservation> Reservations => _reservations.ToList();
        public Room Room { get; private set; }
        public Movie Movie { get;private set; }
        public int MovieId { get;private set; }
        public int RoomId { get;private set; }

    public Seance()
    {
      _reservations=new HashSet<Reservation>();
    }

    internal void SetDuration(TimeSpan timeSpan)
    {
      throw new NotImplementedException();
    }

    internal void SetNormalTicketPrice(double v)
    {
      throw new NotImplementedException();
    }

    internal void SetConcessionaryTicketPrice(double v)
    {
      throw new NotImplementedException();
    }
  }
}
