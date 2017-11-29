using System;
using System.Collections;
using System.Collections.Generic;

namespace cinema.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public int Number { get; set; }

        public ICollection<Seat> Seats { get; set; }
        public ICollection<Show> Shows { get; set; }
    }
}