using System;
using System.Linq;
using AutoMapper;
using Cinema.DTO;
using Cinema.Entities;
using Cinema.Mappers;
using Cinema.Request;

namespace Cinema.Data
{
  public class AutoMapperConfig
  {
    public static IMapper Initialize()
      => new MapperConfiguration(cfg =>
        {
          cfg.ShouldMapField = fieldInfo => true;
          cfg.ShouldMapProperty = propertyInfo => true;

          cfg.CreateMap<User, UserDto>();
          cfg.CreateMap<Reservation, ReservationDto>()
          .AfterMap((r, rDto) => rDto.Value = ReservationMapperHelpers.CalculateReservationValue(r));
          cfg.CreateMap<Movie, MovieDto>()
            .AfterMap((movie, movieDto)=>movieDto.AverageRating= movie.Ratings.Count()!=0 ? movie.Ratings.Average(x => x.Mark):0)
            .AfterMap((movie, movieDto) => movieDto.Category = Enum.GetName(typeof(Category), movie.Category));
          cfg.CreateMap<Movie, MovieWithUserRatingDto>();
          cfg.CreateMap<Seance, SeanceDto>();
          cfg.CreateMap<Room, RoomDto>();
          cfg.CreateMap<Seat, SeatDto>();
          cfg.CreateMap<ReservedSeat, ReservedSeatDto>();


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
