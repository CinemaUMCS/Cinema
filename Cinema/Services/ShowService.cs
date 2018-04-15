using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Repositories;

namespace Cinema.Services
{
    class ShowService : IShowService
    {
        private readonly IShowRepository _showRepository;

        public ShowService(IShowRepository showRepository)
        {
            _showRepository = showRepository;
        }
        public async Task<ICollection<Show>> GetAllAsync()
        {
            return await _showRepository.GetAllAsync();
        }

        public async Task<Show> GetAsync(int id)
        {
            return await _showRepository.GetAsync(id);
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
