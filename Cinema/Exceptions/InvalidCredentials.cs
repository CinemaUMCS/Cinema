using System;

namespace Cinema.Exceptions
{
    public class InvalidCredentials: CinemaException
    {
        private static readonly string errorCode = "InvalidCredentials";

        public InvalidCredentials() : base(errorCode)
        {
        }

        public InvalidCredentials(string message) : base(errorCode, message)
        {
        }

        public InvalidCredentials(string message, Exception innerException) : base(errorCode, message, innerException)
        {
        }
    }
}