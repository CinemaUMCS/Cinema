using System.Collections.Generic;

namespace cinema.Entities {
    public class Reservation {
        public Reservation()
        {
            SeatsReserved = new HashSet<SeatReserved>();
        }
        public int ReservationId { get; set; }
        public string UserId { get; set; }
        public int ShowId {get; set; }
        public bool Status { get; set; }
        public bool Paid { get; set; }
        public virtual Show Show { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<SeatReserved> SeatsReserved { get; set; }
    }
}