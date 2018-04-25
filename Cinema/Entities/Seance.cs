using System;
using System.Collections.Generic;

namespace Cinema.Entities
{
    public class Seance
    {

        public virtual int Id { get; set; }
        public virtual DateTime SeanceStart { get; set; }
        public virtual TimeSpan Duration { get; set; }
        public virtual double ConcessionaryTicketPrice { get; set; }
        public virtual double NormalTicketPrice { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual Room Room { get; set; }
        public virtual Movie Movie { get; set; }
        public virtual int MovieId { get; set; }
        public virtual int RoomId { get; set; }

      public Seance()
      {
        Reservations=new HashSet<Reservation>();
      }
    }
}
