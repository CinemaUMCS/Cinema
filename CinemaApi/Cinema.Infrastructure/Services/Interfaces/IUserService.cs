using System.Threading.Tasks;
using Cinema.DTO;
using Cinema.Entities;
using Cinema.Request;

namespace Cinema.Services
{
  public interface IUserService
  {
    Task ChangePassword(int userId, string oldPassword, string newPassword);
    Task<UserDto> GetByIdAsync(int id);
    Task<UserDto> GetByEmailAsync(string email);
    Task<TokenModel> LoginAsync(string email, string password);
    Task RegisterAsync(string email, string firstName, string lastName, string password, string role, string phoneNumber);
    Task SendConfirmTokenAsync(int userId);
    Task ValidateConfirmTokenAsync(int userId, string token);
    Task ResetPasswordAsync(string userEmail);
    Task UpdateUser(int userId, UpdateUser updateUser);
  }
}
