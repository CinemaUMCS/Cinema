using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Repositories
{
  public interface ISeanceRepository
  {
    Task<ICollection<Seance>> GetAllAsync();
    Task<Seance> GetAsync(int id);
    Task AddAsync(Seance seance);
    Task UpdateAsync(int id, Seance seance);
    Task DeleteAsync(int id);
  }
}
