using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Services
{
    public interface IUserService
    {
        Task RegisterAsync(string email, string firstName, string lastName, string password, string role);
        Task<TokenModel> LoginAsync(string email, string password);
        Task<User> GetByIdAsync(int id);
    }
}
