using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Repositories
{
    public interface IUserRepository
    {
        Task AddAsync(User user);
        Task<User> GetByEmailAsync(string email);
        Task<User> GetByIdAsync(int id);
    }
}