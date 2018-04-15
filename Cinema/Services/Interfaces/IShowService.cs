using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Services
{
    public interface IShowService
    {
        Task<ICollection<Show>> GetAllAsync();
        Task<Show> GetAsync(int id);
        Task AddAsync(Show show);
        Task UpdateAsync(int id, Show show);
        Task DeleteAsync(int id);
    }
}
