namespace Cinema.Entities
{
  public class Seat
  {
    public virtual int Id { get; set; }
    public virtual int Row { get; set; }
    public virtual int Number { get; set; }

    public virtual Room Room { get; set; }
    public virtual int RoomId { get; set; }

    public Seat(int row, int number)
    {
      Row = row;
      Number = number;
    }

    public Seat() { }
  }
}
