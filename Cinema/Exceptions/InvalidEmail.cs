using System;

namespace Cinema.Exceptions
{
  public class InvalidEmail : CinemaException
  {
    private static readonly string errorCode = "InvalidEmail";

    public InvalidEmail() : base(errorCode) { }

    public InvalidEmail(string message) : base(errorCode, message) { }

    public InvalidEmail(string message, Exception innerException) : base(errorCode, message, innerException) { }
  }
}
