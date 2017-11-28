
using System;
using System.Collections.Generic;

namespace cinema.Entities
{
    public class User
    {
        public User()
        {
            Reservations = new HashSet<Reservation>();
            Ratings = new HashSet<Rating>();
        }
        public Guid UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}