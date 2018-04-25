using System;
using System.Collections.Generic;

namespace Cinema.Entities
{
  public enum Category
  {
    Undefined,
    Horror,
    Comedy,
    Thriller,
    Action
  }

  public class Movie
  {
    public virtual int Id { get; set; }
    public virtual string Title { get; set; }
    public virtual string TrailerPath { get; set; }
    public virtual string PosterPath { get; set; }
    public virtual Category Category { get; set; }
    public virtual string Description { get; set; }
    public virtual DateTime? ProductionDate { get; set; }

    public virtual ICollection<Rating> Ratings { get; set; }
    public virtual ICollection<Seance> Seances { get; set; }

    public Movie()
    {
      Ratings = new HashSet<Rating>();
      Seances = new HashSet<Seance>();
    }
  }
}
