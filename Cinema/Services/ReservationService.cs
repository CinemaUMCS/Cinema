using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Repositories;

namespace Cinema.Services
{
    public class ReservationService : IReservationService
    {
        private readonly IReservationRepository _reservationRepository;
        private readonly IMapper _mapper;

        public ReservationService(IReservationRepository reservationRepository, IMapper mapper)
        {
            _reservationRepository = reservationRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<ReservationDto>> GetAllAsync()
        {
            var reservations= await _reservationRepository.GetAllAsync();
            return _mapper.Map<ICollection<Reservation>, ICollection<ReservationDto>>(reservations);
        }

        public async Task<ReservationDto> GetAsync(int id)
        {
            var reservation= await _reservationRepository.GetAsync(id);
            return _mapper.Map<Reservation, ReservationDto>(reservation);
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
