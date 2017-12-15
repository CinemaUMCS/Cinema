using System;

namespace Cinema.Exceptions
{
    public class InvalidRole: CinemaException
    {
        private static readonly string errorCode = "InvalidRole";

        public InvalidRole() : base(errorCode)
        {
        }

        public InvalidRole(string message) : base(errorCode, message)
        {
        }

        public InvalidRole(string message, Exception innerException) : base(errorCode, message, innerException)
        {
        }
    }
}