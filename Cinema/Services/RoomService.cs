using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Data;
using Cinema.DTO;
using Cinema.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  public class RoomService : IRoomService
  {
    private readonly CinemaDbContext _dbContext;
    private readonly IMapper _mapper;

    public RoomService(CinemaDbContext dbContext, IMapper mapper)
    {
      _dbContext = dbContext;
      this._mapper = mapper;
    }

    public async Task AddRoom(string name, int numberOfRows, int numberOfSeatsInRow)
    {
      var room = await _dbContext.Rooms.FirstOrDefaultAsync(x => x.Name == name);
      if (room != null)
        throw new Exception("Room with this name already exist");
      room = new Room(name);
      for (int i = 0; i < numberOfRows; ++i)
      {
        for (int j = 0; j < numberOfSeatsInRow; ++j)
        {
          var seat = new Seat(i, j);
          room.AddSeat(seat);
        }
      }

      await _dbContext.Rooms.AddAsync(room);
      await _dbContext.SaveChangesAsync();
    }

    public async Task<IEnumerable<RoomDto>> GetAvailableRoomsOnTimeAsync(DateTime seanceStart, DateTime seanceEnd)
    {
      var rooms = await _dbContext.Rooms
        .Where(r =>!r.Seances.Any(s => s.SeanceStart < seanceEnd && s.SeanceStart.Add(s.Duration) > seanceStart)).ToListAsync();
      return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(rooms);
    }

    public async Task<IEnumerable<RoomDto>> GetAllAsync()
    {
      var rooms = await _dbContext.Rooms.ToListAsync();
      return _mapper.Map<IEnumerable<Room>, IEnumerable<RoomDto>>(rooms);
    }
  }
}
