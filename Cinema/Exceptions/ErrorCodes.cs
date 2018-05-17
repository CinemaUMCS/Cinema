using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Exceptions
{
  public static class ErrorCodes
  {
    public static string InvalidAction => "InvalidAction";
    public static string EmailOccupied => "EmailOccupied";
    public static string InvalidUser => "InvalidUser";
    public static string NotActivated => "NotActivated";
    public static string InvalidEmail => "InvalidEmail";
    public static string InvalidPassword => "InvalidPassword";
    public static string InvalidCredentials => "InvalidCredentials";
    public static string InvalidRole => "InvalidRole";
  }
}
