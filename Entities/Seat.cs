using System;
using System.Collections.Generic;

namespace cinema.Entities {
    public class Seat {
        
        public Guid Id { get; set; }
        public int Row { get; set; }
        public int Number { get; set; }

        public virtual Room Room { get; set; }
        public int RoomId { get; set; }
    }
}