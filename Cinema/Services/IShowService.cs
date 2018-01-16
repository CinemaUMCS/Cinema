using System.Collections.Generic;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.DTO;

namespace Cinema.Services
{
    public interface IShowService
    {
        Task<ICollection<ShowDto>> GetAllAsync();
        Task<ShowDto> GetAsync(int id);
        Task AddAsync(Show show);
        Task UpdateAsync(int id, Show show);
        Task DeleteAsync(int id);
    }
}