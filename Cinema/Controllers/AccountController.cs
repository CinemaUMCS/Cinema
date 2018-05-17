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
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
      await _userService.RegisterAsync(createUser.Email, createUser.FirstName, createUser.LastName, createUser.Password, "user");
      return Ok();
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginUser loginUser)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
      var token = await _userService.LoginAsync(loginUser.Email, loginUser.Password);
      return Json(token);
    }

    [HttpPut("changePassword")]
    public async Task<IActionResult> ChangePassword([FromBody]ChangeUserPassword changePassword)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest();
      }
      await _userService.ChangePassword(GetCurrentUserId(), changePassword.OldPassword, changePassword.NewPassword);
      return Ok();
    }

    [HttpGet("details")]
    [Authorize]
    public async Task<IActionResult> GetCurrentUser()
    {
      var id = GetCurrentUserId();
      var user = await _userService.GetByIdAsync(id);
      return Json(user);
    }

    [HttpPost("generate_token/{id}")]
    public async Task<IActionResult> GenerateToken(int id)
    {
      await _userService.SendConfirmTokenAsync(id);
      return Ok();
    }
    [HttpPost("validate_token/{id}/{token}")]
    public async Task<IActionResult> ValidateToken(int id, string token)
    {
      await _userService.ValidateConfirmTokenAsync(id, token);
      return Ok();
    }
  }
}
