namespace Cinema.Entities
{
  public class ReservedSeat
  {
    public virtual int Id { get; set; }
    public virtual int ReservationId { get; set; }
    public virtual int SeatId { get; set; }

    public virtual Reservation Reservation { get; set; }
    public virtual Seat Seat { get; set; }

    public ReservedSeat(int reservationId, int seatId)
    {
      ReservationId = reservationId;
      SeatId = seatId;
    }

    public ReservedSeat()
    {
    }
  }
}
