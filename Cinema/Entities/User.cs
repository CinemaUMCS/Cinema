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

        public User(string email, string firstName, string lastName, string password, string salt, string role)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            Password = password;
            Salt = salt;
            Role = role;
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Role { get; set; }


        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Rating> Ratings { get; set; }
    }
}