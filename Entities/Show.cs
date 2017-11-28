using System;
using System.Collections.Generic;

namespace cinema.Entities
{
    public class Show
    {
        public Show()
        {
            SeatsReserved = new HashSet<SeatReserved>();
            Reservations = new HashSet<Reservation>();
        }
        public int ShowId { get; set; }
        public int MovieId { get; set; }
        public int RoomId { get; set; }
        public DateTime? ShowDate { get; set; }
        public virtual Room Room { get; set; }
        public virtual Movie Movie { get; set;}
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<SeatReserved> SeatsReserved { get; set; }
    }
}