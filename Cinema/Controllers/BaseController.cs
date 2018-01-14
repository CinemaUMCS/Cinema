using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    public abstract class BaseController : Controller
    {
        public int GetCurrentUserId()
        {
            var idClaim = User.Claims.SingleOrDefault(x => x.Type.EndsWith("nameidentifier"));
            if (idClaim == null)
                throw new UnauthorizedAccessException();
            var id = Int32.Parse(idClaim.Value);
            return id;
        }
    }
}