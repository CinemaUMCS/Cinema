using System;
using System.Collections;
using System.Collections.Generic;

namespace cinema.Entities
{
    public class Room
    {
        public Guid RoomId { get; set; }
        public int Number { get; set; }

        public ICollection<Seat> Seats { get; set; }
    }
}