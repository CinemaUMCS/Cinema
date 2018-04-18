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
    public int Id { get; set; }
    public string Title { get; set; }
    public string TrailerPath { get; set; }
    public string PosterPath { get; set; }
    public Category Category { get; set; }
    public string Description { get; set; }
    public DateTime? ProductionDate { get; set; }

    public ICollection<Rating> Ratings { get; set; }
    public ICollection<Seance> Seances { get; set; }

    public Movie()
    {
      Ratings = new HashSet<Rating>();
      Seances = new HashSet<Seance>();
    }
  }
}
