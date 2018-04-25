using System.Collections.Generic;

namespace Cinema.Entities
{
  public class User
  {
    public virtual int Id { get; set; }
    public virtual string Email { get; set; }
    public virtual string FirstName { get; set; }
    public virtual string LastName { get; set; }
    public virtual string Password { get; set; }
    public virtual string Salt { get; set; }
    public virtual string Role { get; set; }
    public virtual ICollection<Reservation> Reservations { get; set; }
    public virtual ICollection<Rating> Ratings { get; set; }

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
  }
}
