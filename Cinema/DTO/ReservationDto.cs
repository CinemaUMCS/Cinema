using System.Collections.Generic;
using Cinema.Entities;

namespace Cinema.DTO
{
    public class ReservationDto
    {
        public int Id { get; set; }
        public bool Paid { get; set; }
        public ICollection<ReservedSeatDto> ReservedSeats { get; set; }
        public int NumberOfConcessionaryTickets { get; set; }
        public int NumberOfNormalTickets { get; set; }
        public double Value { get; set; }
        public int SeanceId { get; set; }
        public int UserId { get; set; }
    }
}
