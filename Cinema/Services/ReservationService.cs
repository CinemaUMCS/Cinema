using System.Collections.Generic;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Repositories;

namespace Cinema.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;

        public ReservationService(IReservationRepository reservationRepository)
        {
            _reservationRepository = reservationRepository;
        }

        public async Task<ICollection<Reservation>> GetAllAsync()
        {
            return await _reservationRepository.GetAllAsync();
        }

        public async Task<Reservation> GetAsync(int id)
        {
            return await _reservationRepository.GetAsync(id);
        }

        public async Task AddAsync(Reservation reservation)
        {
            await _reservationRepository.AddAsync(reservation);
        }

        public async Task UpdateAsync(int id, Reservation reservation)
        {
            await _reservationRepository.UpdateAsync(id, reservation);
        }

        public async Task DeleteAsync(int id)
        {
            await _reservationRepository.DeleteAsync(id);
        }
    }
}