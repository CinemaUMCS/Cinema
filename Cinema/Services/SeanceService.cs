using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Repositories;
using Cinema.Request;

namespace Cinema.Services
{
  class SeanceService : ISeanceService
  {
    private readonly ISeanceRepository _seanceRepository;
    private readonly IMovieRepository _movieRepository;
    private readonly IMapper _mapper;
    private readonly IRoomService _roomService;

    public SeanceService(IRoomService roomService, ISeanceRepository seanceRepository,IMovieRepository movieRepository, IMapper mapper)
    {
      _roomService = roomService;
      _seanceRepository = seanceRepository;
      this._movieRepository = movieRepository;
      _mapper = mapper;
    }

    public async Task<IEnumerable<SeanceDto>> GetAllAsync()
    {
      var shows = await _seanceRepository.GetAllAsync();
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
      var movie = await _movieRepository.GetAsync(id);
      if (movie == null)
        throw new Exception("Movie with this id doesn't exists");
      var seances = await GetAllAsync();
      var filteredSeances = seances.Where(s => s.MovieId == id);
      return filteredSeances;
    }
    public async Task<IEnumerable<SeanceDto>> GetByDateAndMovieId(DateTime seanceDate,int id)
    {
      var movie = await _movieRepository.GetAsync(id);
      if (movie == null)
        throw new Exception("Movie with this id doesn't exists");
      var seances = await GetAllAsync();
      var filteredSeances = seances.Where(s => s.MovieId == id && s.SeanceStart.ToShortDateString()==seanceDate.ToShortDateString());
      return filteredSeances;
    }


    public async Task<SeanceDto> GetAsync(int id)
    {
      var show = await _seanceRepository.GetAsync(id);
      return _mapper.Map<Seance, SeanceDto>(show);
    }

    public async Task AddAsync(AddSeance seance)
    {
      var newSeance = _mapper.Map<AddSeance, Seance>(seance);
      var availableRooms =
        await _roomService.GetAvailableRoomsOnTimeAsync(newSeance.SeanceStart,
          newSeance.SeanceStart.Add(newSeance.Duration));
      if (!availableRooms.Select(r => r.Id).Contains(newSeance.RoomId))
      {
        throw new Exception("Room is not available");
      }

      await _seanceRepository.AddAsync(newSeance);
    }

    public async Task UpdateAsync(int id, Seance seance)
    {
      await _seanceRepository.UpdateAsync(id, seance);
    }

    public async Task DeleteAsync(int id)
    {
      await _seanceRepository.DeleteAsync(id);
    }

    public async Task<SeanceRoomData> GetSeanceRoomData(int id)
    {
      var seance = await _seanceRepository.GetAsync(id);
      var seanceRoomData = new SeanceRoomData();
      seanceRoomData.RoomId = seance.RoomId;
      seanceRoomData.SeanceId = seance.Id;
      seanceRoomData.SeatsInRoom = _mapper.Map<ICollection<Seat>, ICollection<SeatDto>>(seance.Room.Seats);
      foreach (var seat in seanceRoomData.SeatsInRoom)
      {
        if (seance.Reservations.Any(r => r.ReservedSeats.Any(rs => rs.SeatId == seat.Id)))
          seanceRoomData.ReservedSeats.Add(seat);
      }

      return seanceRoomData;
    }


  }
}
