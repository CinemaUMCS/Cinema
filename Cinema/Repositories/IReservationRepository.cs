using System.Collections.Generic;
using System.Threading.Tasks;
using cinema.Entities;

namespace Cinema.Repositories
{
    public interface IReservationRepository
    {
        Task<ICollection<Reservation>> GetAllAsync();
        Task<Reservation> GetAsync(int id);
        Task AddAsync(Reservation reservation);
        Task UpdateAsync(int id, Reservation reservation);
        Task DeleteAsync(int id);
    }
}