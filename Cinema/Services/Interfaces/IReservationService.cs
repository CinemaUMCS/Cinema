using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Services
{
    public interface IReservationService
    {
        Task<ICollection<Reservation>> GetAllAsync();
        Task<Reservation> GetAsync(int id);
        Task AddAsync(Reservation reservation);
        Task UpdateAsync(int id, Reservation reservation);
        Task DeleteAsync(int id);
    }
}