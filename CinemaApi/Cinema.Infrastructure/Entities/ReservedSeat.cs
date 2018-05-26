namespace Cinema.Entities
{
  public class ReservedSeat
  {
    public int Id { get; private set; }
    public int ReservationId { get; private set; }
    public int SeatId { get; private set; }

    public Reservation Reservation { get; private set; }
    public Seat Seat { get;private set; }

    private ReservedSeat()
    {

    }

    public ReservedSeat(int seatId)
    {
      SeatId = seatId;
    }
    public ReservedSeat(int seatId, int reservationId): this(seatId)
    {
      ReservationId = reservationId;
    }
  }
}
