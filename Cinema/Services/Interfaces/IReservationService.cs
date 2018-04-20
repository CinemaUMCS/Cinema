using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.DTO;

namespace Cinema.Services
{
  public interface IReservationService
  {
    Task<ICollection<ReservationDto>> GetAllAsync();
    Task<ReservationDto> GetAsync(int id);
    Task AddAsync(Reservation reservation);
    Task UpdateAsync(int id, Reservation reservation);
    Task DeleteAsync(int id);
  }
}
