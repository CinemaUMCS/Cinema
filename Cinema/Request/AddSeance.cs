using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Request
{
  public class AddSeance
  {
    public DateTime SeanceStart { get; set; }
    public int DurationInMinutes { get; set; }
    public int MovieId { get; set; }
    public int RoomId { get; set; }
    public double ConcessionaryTicketPrice { get; set; }
    public double NormalTicketPrice { get; set; }
  }
}
