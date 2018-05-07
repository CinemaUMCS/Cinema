namespace Cinema.Entities
{
  public class Seat
  {
    public int Id { get;private set; }
    public int Row { get;private set; }
    public int Number { get;private set; }

    public Room Room { get;private set; }
    public int RoomId { get;private set; }

    public Seat(int row, int number)
    {
      Row = row;
      Number = number;
    }

    private Seat() { }
  }
}
