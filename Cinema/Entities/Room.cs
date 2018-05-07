using System.Collections.Generic;
using System.Linq;

namespace Cinema.Entities
{
  public class Room
  {
    public int Id { get; private set; }
    public string Name { get;private set; }


    private HashSet<Seance> _seances;
    private HashSet<Seat> _seats;
    public IEnumerable<Seat> Seats => _seats.ToList();
    public IEnumerable<Seance> Seances => _seances.ToList();


    public Room(string name) : this()
    {
      Name = name;
    }

    public Room()
    {
      _seats = new HashSet<Seat>();
      _seances = new HashSet<Seance>();
    }
    public void AddSeat(Seat seat)
    {
      _seats.Add(seat);
    }
  }
}
