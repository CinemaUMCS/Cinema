using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
    [Route("[controller]")]
    [Produces("application/json")]
    public abstract class BaseController : Controller
    {
    }
}