using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;

namespace Cinema.Entities
{
  public class Reservation
  {
    public virtual int Id { get; set; }
    public virtual int SeanceId { get; set; }
    public virtual int UserId { get; set; }
    public virtual bool Paid { get; set; }
    public virtual int NumberOfConcessionaryTickets { get; set; }
    public virtual int NumberOfNormalTickets { get; set; }
    public virtual double Value { get; set; }

    public virtual ICollection<ReservedSeat> ReservedSeats { get; set; }

    public virtual Seance Seance { get; set; }
    public virtual User User { get; set; }

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
