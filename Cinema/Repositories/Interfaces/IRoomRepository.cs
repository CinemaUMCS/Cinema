using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Repositories
{
  public interface IRoomRepository
  {
    Task Add(Room room);
    Task<Room> GetById(int id);
    Task<Room> GetByName(string name);
    Task<IEnumerable<Room>> GetAllAsync();
  }
}
