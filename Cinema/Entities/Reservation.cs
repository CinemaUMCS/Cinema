using System.Collections.Generic;

namespace Cinema.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public bool Status { get; set; }
        public bool Paid { get; set; }

        public Show Show { get; set; }
        public User User { get; set; }
        public ICollection<ReservedSeat> ReservedSeats { get; set; }
        public int ShowId { get; set; }
        public int UserId { get; set; }
    }
}
