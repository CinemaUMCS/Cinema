using System;
using System.Collections.Generic;

namespace Cinema.Entities
{
    public class Show
    {
        public Show()
        {
            Reservations = new HashSet<Reservation>();
        }

        public int Id { get; set; }
        public DateTime ShowDate { get; set; }

        public ICollection<Reservation> Reservations { get; set; }
        public Room Room { get; set; }
        public Movie Movie { get; set; }
        public int MovieId { get; set; }
        public int RoomId { get; set; }
    }
}
