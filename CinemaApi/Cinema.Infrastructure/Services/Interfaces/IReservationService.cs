using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Request;

namespace Cinema.Services
{
  public interface IReservationService
  {
    Task<ICollection<ReservationDto>> GetAllAsync();
    Task<ReservationDto> GetAsync(int id);
    Task AddAsync(int userId,AddReservation addReservation);
   // Task UpdateAsync(int id, Reservation reservation);
    Task DeleteAsync(int id);
    Task<IEnumerable<ReservationDto>> GetReservationsForUserAsync(int userId);
    Task<IEnumerable<ReservationDto>> GetReservationsForSeanceAsync(int seanceId);
    Task MarkReservationAsPaid(int reservationId);
  }
}
