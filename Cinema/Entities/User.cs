using Cinema.Exceptions;
using Cinema.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.RegularExpressions;

namespace Cinema.Entities
{
  public class User
  {
    public int Id { get; private set; }
    public string Email { get; private set; }
    public string FirstName { get; private set; }
    public string LastName { get; private set; }
    public string PhoneNumber { get; set; }
    public string Password { get; private set; }
    public string Salt { get; private set; }
    public string Role { get; private set; }

    private HashSet<Reservation> _reservations;
    private HashSet<Rating> _ratings;
    public IEnumerable<Reservation> Reservations => _reservations.ToList();
    public IEnumerable<Rating> Ratings => _ratings.ToList();

    private User() { }
    public User(string email, string firstName, string lastName, string password, string role)
    {
      SetEmail(email);
      FirstName = firstName;
      LastName = lastName;
      SetPassword(password);
      SetRole(role);
      _reservations = new HashSet<Reservation>();
      _ratings = new HashSet<Rating>();
    }

    private void SetPhoneNumber(string phoneNumber)
    {
      if(!phoneNumber.All(char.IsDigit) || phoneNumber.Length!=9)
        throw new Exception("Invalid phone number");
      PhoneNumber=phoneNumber;
    }

    private void SetEmail(string email)
    {
      bool isEmailValid = new EmailAddressAttribute().IsValid(email);
      if (!isEmailValid)
        throw new CinemaException(ErrorCodes.InvalidEmail);
      Email = email;
    }
    public void SetPassword(string password)
    {
      if (!IsPasswordValid(password))
        throw new CinemaException(ErrorCodes.InvalidPassword);
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
        throw new CinemaException(ErrorCodes.InvalidRole);
    }
    private bool IsRoleValid(string role)
    {
      if (role == "user" || role == "admin" || role == "employee")
        return true;
      return false;
    }
  }
}
