using System;
using System.Runtime.Serialization;

namespace Cinema.Exceptions
{
    public abstract class CinemaException: Exception
    {
        protected CinemaException(string errorCode)
        {
            ErrorCode = errorCode;
        }

        protected CinemaException(string errorCode,string message) : base(message)
        {
            ErrorCode = errorCode;
        }

        protected CinemaException(string errorCode,string message, Exception innerException) : base(message, innerException)
        {
            ErrorCode = errorCode;
        }

        public string ErrorCode { get; }
    }
}