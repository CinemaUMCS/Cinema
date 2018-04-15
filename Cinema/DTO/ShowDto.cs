using System;
using System.Collections.Generic;
using cinema.Entities;

namespace Cinema.DTO
{
    public class ShowDto
    {

        public int Id { get; set; }
        public DateTime ShowDate { get; set; }
        public int MovieId { get; set; }
        public int RoomId { get; set; }
    }
}