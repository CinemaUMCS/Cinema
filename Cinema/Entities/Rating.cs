namespace Cinema.Entities
{
  public class Rating
  {
    public int? Mark { get; set; }

    public virtual User User { get; set; }
    public virtual Movie Movie { get; set; }
    public virtual int UserId { get; set; }
    public virtual int MovieId { get; set; }
  }
}
