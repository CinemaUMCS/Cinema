using System.Collections.Generic;

namespace Cinema.Entities
{
  public class Room
  {
    public virtual int Id { get; set; }
    public virtual string Name { get; set; }

    public virtual ICollection<Seat> Seats { get; set; }
    public virtual ICollection<Seance> Seances { get; set; }

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
