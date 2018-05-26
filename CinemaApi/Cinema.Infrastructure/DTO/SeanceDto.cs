using System;

namespace Cinema.DTO
{
  public class SeanceDto
  {
    public int Id { get; set; }
    public DateTime SeanceStart { get; set; }
    public TimeSpan Duration { get; set; }
    public double ConcessionaryTicketPrice { get; set; }
    public double NormalTicketPrice { get; set; }
    public int MovieId { get; set; }
    public int RoomId { get; set; }
  }
}
