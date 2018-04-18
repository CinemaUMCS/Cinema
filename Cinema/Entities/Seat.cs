namespace Cinema.Entities
{
  public class Seat
  {
    public int Id { get; set; }
    public int Row { get; set; }
    public int Number { get; set; }

    public Room Room { get; set; }
    public int RoomId { get; set; }

    public Seat(int row, int number)
    {
      Row = row;
      Number = number;
    }

    public Seat() { }
  }
}
