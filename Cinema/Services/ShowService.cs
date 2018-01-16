using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using cinema.Entities;
using Cinema.DTO;
using Cinema.Repositories;

namespace Cinema.Services
{
    class ShowService : IShowService
    {
        private readonly IShowRepository _showRepository;
        private readonly IMapper _mapper;

        public ShowService(IShowRepository showRepository, IMapper mapper)
        {
            _showRepository = showRepository;
            _mapper = mapper;
        }
        public async Task<ICollection<ShowDto>> GetAllAsync()
        {
            var shows= await _showRepository.GetAllAsync();
            return _mapper.Map<ICollection<Show>, ICollection<ShowDto>>(shows);
        }

        public async Task<ShowDto> GetAsync(int id)
        {
            var show= await _showRepository.GetAsync(id);
            return _mapper.Map<Show, ShowDto>(show);
        }

        public async Task AddAsync(Show show)
        {
            await _showRepository.AddAsync(show);
        }

        public async Task UpdateAsync(int id, Show show)
        {
            await _showRepository.UpdateAsync(id,show);
        }

        public async Task DeleteAsync(int id)
        {
            await _showRepository.DeleteAsync(id);
        }
    }
}