using System;
using AutoMapper;
using Cinema.DTO;
using Cinema.Entities;
using Cinema.Request;

namespace Cinema.Data
{
  public class AutoMapperConfig
  {
    public static IMapper Initialize()
      => new MapperConfiguration(cfg =>
        {
          cfg.CreateMap<User, UserDto>();
          cfg.CreateMap<Reservation, ReservationDto>();
          cfg.CreateMap<Movie, MovieDto>();
          cfg.CreateMap<Seance, SeanceDto>();
          cfg.CreateMap<Room, RoomDto>();
          cfg.CreateMap<Seat, SeatDto>();
          cfg.CreateMap<ReservedSeat, ReservedSeatDto>();
         

          cfg.CreateMap<AddMovie, Movie>();
          cfg.CreateMap<AddSeance, Seance>()
            .AfterMap(
              (addSeance, seance) => seance.Duration = TimeSpan.FromMinutes(addSeance.DurationInMinutes))
            .AfterMap(((addSeance, seance) =>
              seance.NormalTicketPrice = Math.Round(addSeance.NormalTicketPrice, 2)))
            .AfterMap(((addSeance, seance) =>
              seance.ConcessionaryTicketPrice = Math.Round(addSeance.ConcessionaryTicketPrice, 2)));
        })
        .CreateMapper();
  }
}
