using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.DTO;

namespace Cinema.Services
{
  public interface IUserService
  {
    Task RegisterAsync(string email, string firstName, string lastName, string password, string role);
    Task<TokenModel> LoginAsync(string email, string password);
    Task<UserDto> GetByIdAsync(int id);
    Task ChangePassword(int userId, string oldPassword, string newPassword);
  }
}
