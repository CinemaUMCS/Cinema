using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace Cinema.Entities
{
  public class Reservation
  {
    public int Id { get; set; }
    public int SeanceId { get; set; }
    public int UserId { get; set; }
    public bool Paid { get; set; }
    public int NumberOfConcessionaryTickets { get; set; }
    public int NumberOfNormalTickets { get; set; }
    public double Value { get; set; }

    public ICollection<ReservedSeat> ReservedSeats { get; set; }

    public Seance Seance { get; set; }
    public User User { get; set; }

    public Reservation()
    {
    }

    public Reservation(int seanceId, int userId)
    {
      SeanceId = seanceId;
      UserId = userId;
      ReservedSeats=new HashSet<ReservedSeat>();
    }
  }
}
