namespace Cinema.Entities
{
  public class Rating
  {
    public int? Mark { get; private set; }

    public User User { get; private set; }
    public Movie Movie { get; private set; }
    public int UserId { get; private set; }
    public int MovieId { get; private set; }

    private Rating()
    {

    }
  }
}
