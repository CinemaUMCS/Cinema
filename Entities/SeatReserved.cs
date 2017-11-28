namespace cinema.Entities {
    public class SeatReserved {
        public int SeatReservedId { get; set; }
        public int SeatId { get; set; }
        public int ShowId { get; set; }
        public int ReservationId { get; set; }
        public virtual Seat Seat { get; set; }
        public virtual Reservation Reservation { get; set; }
        public virtual Show Show { get; set; }
    }
}