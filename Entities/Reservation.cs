using System;
using System.Collections.Generic;

namespace cinema.Entities {
    public class Reservation {
        public int Id { get; set; }
        public bool Status { get; set; }
        public bool Paid { get; set; }

        public virtual Show Show { get; set; }
        public virtual User User { get; set; }
        public ICollection<Seat> Seats { get; set; }
        public int ShowId { get; set; }
        public int UserId { get; set; }
    }
}