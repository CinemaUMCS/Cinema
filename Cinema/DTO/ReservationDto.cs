using System.Collections.Generic;
using Cinema.Entities;

namespace Cinema.DTO
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public bool Status { get; set; }
        public bool Paid { get; set; }
        public ICollection<Seat> Seats { get; set; }
        public int ShowId { get; set; }
        public int UserId { get; set; }
    }
}
