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
          cfg.CreateMap<Movie, MovieDto>()
            .AfterMap((movie, movieDto) => movieDto.Category = Enum.GetName(typeof(Category), movie.Category));
          cfg.CreateMap<Seance, SeanceDto>();
          cfg.CreateMap<Room, RoomDto>();
          cfg.CreateMap<Seat, SeatDto>();
          cfg.CreateMap<ReservedSeat, ReservedSeatDto>();
         

          cfg.CreateMap<MovieRequest, Movie>();
          cfg.CreateMap<AddSeance, Seance>()
            .AfterMap(
              (addSeance, seance) => seance.SetDuration(TimeSpan.FromMinutes(addSeance.DurationInMinutes)))
            .AfterMap(((addSeance, seance) =>
              seance.SetNormalTicketPrice(Math.Round(addSeance.NormalTicketPrice, 2))))
            .AfterMap(((addSeance, seance) =>
              seance.SetConcessionaryTicketPrice(Math.Round(addSeance.ConcessionaryTicketPrice, 2))));
        })
        .CreateMapper();
  }
}
