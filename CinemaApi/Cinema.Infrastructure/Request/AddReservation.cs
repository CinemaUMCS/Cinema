using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Request
{
  public class AddReservation
  {
    public class SeatToReserve
    {
      public int Row { get; set; }
      public int Number { get; set; }
    }
    public int SeanceId { get; set; }
    public IEnumerable<SeatToReserve> SeatsToReserve { get; set; }
    public int NumberOfConcessionaryTickets { get; set; }
    public int NumberOfNormalTickets { get; set; }
  }
}
