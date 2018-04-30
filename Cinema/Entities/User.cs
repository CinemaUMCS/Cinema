using Cinema.Exceptions;
using Cinema.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Cinema.Entities
{
  public class User
  {
    public virtual int Id { get; private set; }
    public virtual string Email { get; private set; }
    public virtual string FirstName { get; private set; }
    public virtual string LastName { get; private set; }
    public virtual string Password { get; private set; }
    public virtual string Salt { get; private set; }
    public virtual string Role { get; private set; }

    private HashSet<Reservation> _reservations;
    private HashSet<Rating> _ratings;
    public virtual IEnumerable<Reservation> Reservations => _reservations.ToList();
    public virtual IEnumerable<Rating> Ratings => _ratings.ToList();

    public User(string email, string firstName, string lastName, string password, string salt, string role)
    {
      Email = email;
      FirstName = firstName;
      LastName = lastName;
      SetPassword(password);
      SetRole(role);
      _reservations = new HashSet<Reservation>();
      _ratings = new HashSet<Rating>();
    }
    public void SetPassword(string password)
    {
      if (IsPasswordValid(password))
        throw new InvalidPassword();
      var encrypterService = new EncrypterService();
      Salt = encrypterService.GenerateSalt();
      Password = encrypterService.Compute(password, Salt);
    }
    private bool IsPasswordValid(string password)
    {
      if (password.Length < 6)
        return false;
      var lower = new Regex("(.*[a-z].*)");
      if (!lower.Match(password).Success)
        return false;
      var upper = new Regex("(.*[A-Z].*)");
      if (!upper.Match(password).Success)
        return false;
      var number = new Regex("(.*[0-9].*)");
      if (!number.Match(password).Success)
        return false;
      return true;
    }
    public void SetRole(string role)
    {
      if (IsRoleValid(role))
        Role = role;
      else
        throw new InvalidRole();
    }
    private bool IsRoleValid(string role)
    {
      if (role == "user" && role == "admin" && role == "employee")
        return true;
      return false;
    }
  }
}
