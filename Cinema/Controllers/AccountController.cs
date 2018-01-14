using System.Threading.Tasks;
using Cinema.Request;
using Cinema.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
    public class AccountController : BaseController
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

        [HttpGet("details")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var id = GetCurrentUserId();
            var user = await _userService.GetByIdAsync(id);
            return Json(user);
        }
    }
}