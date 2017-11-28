using System;
using System.Collections.Generic;

namespace cinema.Entities {
    public class Reservation {
        public Guid Id { get; set; }
        public bool Status { get; set; }
        public bool Paid { get; set; }

        public virtual Show Show { get; set; }
        public virtual User User { get; set; }
        public Seat Seat { get; set; }
        public Guid ShowId { get; set; }
        public Guid UserId { get; set; }
        public Guid SeatId { get; set; }
    }
}