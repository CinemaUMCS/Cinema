using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.DTO;
using Cinema.Entities;
using Cinema.Repositories;

namespace Cinema.Services
{
  public class RoomService : IRoomService
  {
    private readonly IRoomRepository _roomRepository;
    private readonly IMapper _mapper;

    public RoomService(IRoomRepository roomRepository, IMapper mapper)
    {
      _roomRepository = roomRepository;
      this._mapper = mapper;
    }

    public async Task AddRoom(string name, int numberOfRows, int numberOfSeatsInRow)
    {
      var room = await _roomRepository.GetByName(name);
      if (room != null)
        throw new Exception("Room with this name already exist");
      room = new Room(name);
      for (int i = 0; i < numberOfRows; ++i)
      {
        for (int j = 0; j < numberOfSeatsInRow; ++j)
        {
          var seat = new Seat(i, j);
          room.Seats.Add(seat);
        }
      }

      await _roomRepository.Add(room);
    }

    public async Task<IEnumerable<RoomDto>> GetAvailableRoomsOnTimeAsync(DateTime seanceStart, DateTime seanceEnd)
    {
      var rooms = await _roomRepository.GetAllAsync();
      var availableRooms = rooms.Where(r =>
        !r.Seances.Any(s => s.SeanceStart < seanceEnd && s.SeanceStart.Add(s.Duration) > seanceStart));
      return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(availableRooms);
    }

    public async Task<IEnumerable<RoomDto>> GetAllAsync()
    {
      var rooms = await _roomRepository.GetAllAsync();
      return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(rooms);
    }
  }
}
