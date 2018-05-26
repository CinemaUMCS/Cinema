using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.DTO
{
    public class ReservedSeatDto
    {
      public int Id { get; set; }
      public int ReservationId { get; set; }
      public SeatDto Seat { get; set; }
    }
}
