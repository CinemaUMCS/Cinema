using AutoMapper;
using Cinema.DTO;
using Cinema.Entities;

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
                    cfg.CreateMap<Show, ShowDto>();
                })
                .CreateMapper();

    }
}
