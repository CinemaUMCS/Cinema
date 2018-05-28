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
      await _userService.RegisterAsync(createUser.Email, createUser.FirstName, createUser.LastName, createUser.Password, "user",createUser.PhoneNumber);
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
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
      var user = await _userService.GetByIdAsync(id);
      return Json(user);
    }
    [HttpGet("email/{email}")]
    public async Task<IActionResult> GetByEmail(string email)
    {
      var user = await _userService.GetByEmailAsync(email);
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
    [HttpPut("reset_password")]
    public async Task<IActionResult> ResetPassword(string userEmail)
    {
      await _userService.ResetPasswordAsync(userEmail);
      return Ok();
    }
    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Update([FromBody] UpdateUser updateUser)
    {
      await _userService.UpdateUser(GetCurrentUserId(),updateUser);
      return Ok();
    }

  }
}
