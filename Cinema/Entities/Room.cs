using System.Collections.Generic;

namespace Cinema.Entities
{
  public class Room
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public ICollection<Seat> Seats { get; set; }
    public ICollection<Seance> Seances { get; set; }

    public Room(string name) : this()
    {
      Name = name;
    }

    public Room()
    {
      Seats = new HashSet<Seat>();
      Seances = new HashSet<Seance>();
    }
  }
}
