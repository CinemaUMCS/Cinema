using System.Collections.Generic;

namespace cinema.Entities {
    public class Seat {
        public Seat()
        {
            SeatsReserved = new HashSet<SeatReserved>();
        }
        public int SeatId { get; set; }
        public int RoomId { get; set;}
        public int Row { get; set; }
        public int Number { get; set; }
        public virtual Room Room { get; set; }
        public virtual ICollection<SeatReserved> SeatsReserved { get; set; }
    }
}