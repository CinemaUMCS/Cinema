using System;

namespace Cinema.Entities
{
  public class Rating
  {
    public int Mark { get; private set; }

    public User User { get; private set; }
    public Movie Movie { get; private set; }
    public int UserId { get; private set; }
    public int MovieId { get; private set; }

    private Rating()
    {

    }

    public Rating(int userId, int movieId, int mark)
    {
      UserId = userId;
      MovieId = movieId;
      SetMark(mark);
    }

    public void SetMark(int mark)
    {
      if(mark<1 || mark>5)
        throw new Exception("Mark must be in range from 1 to 10");
      Mark=mark;
    }
  }
}
