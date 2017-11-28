
using System.Collections.Generic;

namespace cinema.Entities
{
    public class User
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
            Raitings = new HashSet<Raiting>();
        }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Raiting> Raitings { get; set; }
    }
}