using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.DTO
{
    public class SeatDto
    {
      public int Id { get; set; }
      public int Row { get; set; }
      public int Number { get; set; }
      public int RoomId { get; set; }
    }
}
