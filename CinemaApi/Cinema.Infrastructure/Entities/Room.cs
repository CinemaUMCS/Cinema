using System.Collections.Generic;
using System.Linq;

namespace Cinema.Entities
{
    public class Room
    {
        public int Id { get; private set; }
        public string Name { get; private set; }


        private HashSet<Seance> _seances;
        private HashSet<Seat> _seats;
        public IEnumerable<Seat> Seats => _seats.ToList();
        public IEnumerable<Seance> Seances => _seances.ToList();


        public Room(string name, int numberOfRows, int numberOfSeatsInRow) : this()
        {
            Name = name;
            _seats = new HashSet<Seat>();
            _seances = new HashSet<Seance>();
            for (int i = 0; i < numberOfRows; ++i)
            {
                for (int j = 0; j < numberOfSeatsInRow; ++j)
                {
                    var seat = new Seat(i, j);
                    AddSeat(seat);
                }
            }

        }

        private Room()
        {

        }
        public void AddSeat(Seat seat)
        {
            _seats.Add(seat);
        }
    }
}
