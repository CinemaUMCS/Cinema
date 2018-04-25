using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Data;
using Cinema.Entities;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
  public class RoomRepository : IRoomRepository
  {
    private readonly CinemaDbContext _context;

    public RoomRepository(CinemaDbContext context)
    {
      _context = context;
    }

    public async Task Add(Room room)
    {
      await _context.Rooms.AddAsync(room);
      await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Room>> GetAllAsync()
    {
      return await _context.Rooms
        .ToListAsync();
    }

    public async Task<Room> GetById(int id)
    {
      return await _context.Rooms
        .FirstOrDefaultAsync(r => r.Id == id);
    }

    public async Task<Room> GetByName(string name)
    {
      return await _context.Rooms
        .FirstOrDefaultAsync(r => r.Name == name);
    }
  }
}
