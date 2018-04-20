using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cinema.DTO;
using Cinema.Request;

namespace Cinema.Services
{
  public interface IRoomService
  {
    Task AddRoom(string name, int numberOfRows, int numberOfSeatsInRow);
    Task<IEnumerable<RoomDto>> GetAvailableRoomsOnTimeAsync(DateTime seanceStart, DateTime seanceEnd);
    Task<IEnumerable<RoomDto>> GetAllAsync();
  }
}
