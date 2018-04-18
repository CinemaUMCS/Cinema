using System.Collections.Generic;

namespace Cinema.Entities
{
  public class Reservation
  {
    public int Id { get; set; }
    public bool Status { get; set; }
    public bool Paid { get; set; }

    public Seance Seance { get; set; }
    public User User { get; set; }
    public ICollection<ReservedSeat> ReservedSeats { get; set; }
    public int SeanceId { get; set; }
    public int UserId { get; set; }
  }
}
