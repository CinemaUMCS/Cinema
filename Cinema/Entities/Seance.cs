using System;
using System.Collections.Generic;

namespace Cinema.Entities
{
    public class Seance
    {

        public int Id { get; set; }
        public DateTime SeanceStart { get; set; }
        public TimeSpan Duration { get; set; }
        public double ConcessionaryTicketPrice { get; set; }
        public double NormalTicketPrice { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
        public Room Room { get; set; }
        public Movie Movie { get; set; }
        public int MovieId { get; set; }
        public int RoomId { get; set; }

      public Seance()
      {
        Reservations=new HashSet<Reservation>();
      }
    }
}
