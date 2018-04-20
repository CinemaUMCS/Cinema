using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Request
{
  public class AddReservation
  {
    public class Seat
    {
      public int Row { get; set; }
      public int Column { get; set; }
    }

    public int SeanceId { get; set; }
    public IEnumerable<Seat> Seats { get; set; }
  }
}
