using System;
using System.Collections.Generic;

namespace cinema.Entities
{
    public class Show
    {
        public Show()
        {
            Reservations = new HashSet<Reservation>();
        }
        public int Id { get; set; }
        public DateTime ShowDate { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual Room Room { get; set; }
        public virtual Movie Movie { get; set;}
        public int MovieId { get; set; }
        public int RoomId { get; set; }
    }
}