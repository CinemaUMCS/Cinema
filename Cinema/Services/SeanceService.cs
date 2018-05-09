using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Request;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  class SeanceService : ISeanceService
  {
    private readonly IMapper _mapper;
    private readonly IRoomService _roomService;
    private readonly CinemaDbContext _dbContext;

    public SeanceService(CinemaDbContext dbContext,IRoomService roomService, IMapper mapper)
    {
      _dbContext = dbContext;
      _roomService = roomService;
      _mapper = mapper;
    }

    public async Task<IEnumerable<SeanceDto>> GetAllAsync()
    {
      var shows = await _dbContext.Seances.ToListAsync();
      return _mapper.Map<ICollection<Seance>, ICollection<SeanceDto>>(shows);
    }

    public async Task<IEnumerable<SeanceDto>> GetByDate(DateTime seanceDate)
    {
      var seances = await GetAllAsync();
      var filteredSeances = seances.Where(s => s.SeanceStart.ToShortDateString() == seanceDate.ToShortDateString());
      return filteredSeances;
    }

    public async Task<IEnumerable<SeanceDto>> GetByMovieId(int id)
    {
      var movie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
      if (movie == null)
        throw new Exception("Movie with this id doesn't exists");
      var seances = await GetAllAsync();
      var filteredSeances = seances.Where(s => s.MovieId == id);
      return filteredSeances;
    }
    public async Task<IEnumerable<SeanceDto>> GetByDateAndMovieId(DateTime seanceDate,int id)
    {
      var movie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == id);
      if (movie == null)
        throw new Exception("Movie with this id doesn't exists");
      var seances = await GetAllAsync();
      var filteredSeances = seances.Where(s => s.MovieId == id && s.SeanceStart.ToShortDateString()==seanceDate.ToShortDateString());
      return filteredSeances;
    }


    public async Task<SeanceDto> GetAsync(int id)
    {
      var show = await _dbContext.Seances.FirstOrDefaultAsync(x => x.Id == id);
      return _mapper.Map<Seance, SeanceDto>(show);
    }

    public async Task AddAsync(AddSeance seance)
    {
      var newSeance = _mapper.Map<AddSeance, Seance>(seance);
      var movie = await _dbContext.Movies.FirstOrDefaultAsync(x => x.Id == newSeance.MovieId);
      if (movie == null)
        throw new Exception("Movie with this id doesn't exists.");
      if(movie.Duration>newSeance.Duration)
      {
        throw new Exception("Seance duration cannot be shorter than movie duration.");
      }
      var availableRooms = await _roomService.GetAvailableRoomsOnTimeAsync(newSeance.SeanceStart,
          newSeance.SeanceStart.Add(newSeance.Duration));
      if (!availableRooms.Select(r => r.Id).Contains(newSeance.RoomId))
      {
        throw new Exception("Room is not available");
      }

      await _dbContext.Seances.AddAsync(newSeance);
      await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
      var show = _dbContext.Seances.SingleOrDefault(s => s.Id == id);
      if (show == null)
        throw new Exception($"Seances with id: {id} not found.");
      _dbContext.Seances.Remove(show);
      await _dbContext.SaveChangesAsync();
    }

    public async Task<SeanceRoomData> GetSeanceRoomData(int id)
    {
      var seance = await _dbContext.Seances
        .Include(x=>x.Reservations).ThenInclude(x=>x.ReservedSeats)
        .Include(x=>x.Room).ThenInclude(x=>x.Seats)
        .FirstOrDefaultAsync(x => x.Id == id);
      var seanceRoomData = new SeanceRoomData();
      seanceRoomData.RoomId = seance.RoomId;
      seanceRoomData.SeanceId = seance.Id;
      seanceRoomData.SeatsInRoom = _mapper.Map<ICollection<Seat>, ICollection<SeatDto>>(seance.Room.Seats.ToList());
      foreach (var seat in seanceRoomData.SeatsInRoom)
      {
        if (seance.Reservations.Any(r => r.ReservedSeats.Any(rs => rs.SeatId == seat.Id)))
          seanceRoomData.ReservedSeats.Add(seat);
      }
      return seanceRoomData;
    }
  }
}
