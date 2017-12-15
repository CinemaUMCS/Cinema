using System;
using Microsoft.WindowsAzure.Storage.Blob.Protocol;

namespace Cinema.Exceptions
{
    public class InvalidPassword: CinemaException
    {
        private static readonly string errorCode = "InvalidPassword";

        public InvalidPassword() : base(errorCode)
        {
        }

        public InvalidPassword(string message) : base(errorCode, message)
        {
        }

        public InvalidPassword(string message, Exception innerException) : base(errorCode, message, innerException)
        {
        }
    }
}