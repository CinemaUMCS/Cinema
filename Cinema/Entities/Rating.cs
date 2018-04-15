namespace Cinema.Entities
{
    public class Rating
    {
        public int? Mark { get; set; }

        public User User { get; set; }
        public Movie Movie { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}
