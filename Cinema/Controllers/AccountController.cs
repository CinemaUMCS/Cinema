using System.Threading.Tasks;
using Cinema.Request;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IUserService _userService;

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUser createUser)
        {
            await _userService.RegisterAsync(createUser.Email, createUser.FirstName, createUser.LastName, createUser.Password, "user");
            return Ok();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginUser loginUser)
        {
            var token=await _userService.LoginAsync(loginUser.Email, loginUser.Password);
            return Json(token);
        }

        [Authorize]
        [HttpGet("authtest")]
        public IActionResult AuthTest()
        {
            return Content("Brawo!");
        }
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Content("Dupa!");
        }
    }
}