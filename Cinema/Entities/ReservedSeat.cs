namespace Cinema.Entities
{
  public class ReservedSeat
  {
    public int Id { get; set; }
    public int ReservationId { get; set; }
    public int SeatId { get; set; }

    public Reservation Reservation { get; set; }
    public Seat Seat { get; set; }
  }
}