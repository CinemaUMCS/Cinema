using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Request;

namespace Cinema.Services
{
    public interface ISeanceService
    {
        Task<IEnumerable<SeanceDto>> GetAllAsync();
        Task<IEnumerable<SeanceDto>> GetByDate(DateTime seanceDate);
        Task<SeanceDto> GetAsync(int id);
        Task AddAsync(AddSeance seance);
        Task UpdateAsync(int id, Seance seance);
        Task DeleteAsync(int id);
        Task<SeanceRoomData> GetSeanceRoomData(int id);
  }
}
