using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cinema.Request
{
    public class ChangeUserPassword
    {
    public string OldPassword { get; set; }
    public string NewPassword { get; set; }
  }
}
