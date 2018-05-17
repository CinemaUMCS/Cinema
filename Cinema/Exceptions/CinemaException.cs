using System;
using System.Runtime.Serialization;

namespace Cinema.Exceptions
{
  public class CinemaException : Exception
  {
    public CinemaException(string errorCode): base(errorCode)
    {
      ErrorCode = errorCode;
    }

    public  CinemaException(string errorCode, string message) : base(message)
    {
      ErrorCode = errorCode;
    }

    public CinemaException(string errorCode, string message, Exception innerException) : base(message,
      innerException)
    {
      ErrorCode = errorCode;
    }

    public string ErrorCode { get; }
  }
}
