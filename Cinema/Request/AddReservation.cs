using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Request
{
  public class AddReservation
  {
    public int SeanceId { get; set; }
    public IEnumerable<int> SeatsToReserveIds { get; set; }
    public int NumberOfConcessionaryTickets { get; set; }
    public int NumberOfNormalTickets { get; set; }
  }
}
