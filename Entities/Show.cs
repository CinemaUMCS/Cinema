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
        public Guid Id { get; set; }
        public DateTime? ShowDate { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual Room Room { get; set; }
        public virtual Movie Movie { get; set;}
        public Guid MovieId { get; set; }
        public Guid RoomId { get; set; }
    }
}