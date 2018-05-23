using System;
using System.Collections.Generic;
using System.Linq;

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
    public int Id { get; private set; }
    public string Title { get; private set; }
    public string TrailerPath { get; private set; }
    public string PosterPath { get; private set; }
    public string BackgroundPath { get;private set;}
    public Category Category { get; private set; }
    public string Description { get; private set; }
    public DateTime? ProductionDate { get; private set; }
    public TimeSpan Duration { get; private set; }
    public int? MinimalAge { get; private set; }

    private HashSet<Rating> _ratings;
    private HashSet<Seance> _seances;
    public IEnumerable<Rating> Ratings => _ratings.ToList();
    public IEnumerable<Seance> Seances => _seances.ToList();

    private Movie()
    {

    }

    public Movie(string title, string trailerPath, string posterPath, string backgroundPath, Category category, string description, DateTime? productionDate, TimeSpan duration, int minimalAge)
    {
      SetTitle(title);
      SetTrailerPath(trailerPath);
      SetBackgroundPath(backgroundPath);
      SetPosterPath(posterPath);
      SetCategory(category);
      SetDescription(description);
      SetProductionDate(productionDate);
      SetDuration(duration);
      SetMinimalAge(minimalAge);
      _ratings = new HashSet<Rating>();
      _seances = new HashSet<Seance>();
    }
    public void SetTitle(string title)
    {
      Title = title;
    }
    public void SetTrailerPath(string trailerPath)
    {
      TrailerPath = trailerPath;
    }
    public void SetPosterPath(string posterPath)
    {
      PosterPath = posterPath;
    }
    public void SetBackgroundPath(string backgroundPath)
    {
      BackgroundPath=backgroundPath;
    }
    public void SetCategory(Category category)
    {
      Category = category;
    }
    public void SetDescription(string description)
    {
      Description = description;
    }
    public void SetProductionDate(DateTime? productionDate)
    {
      ProductionDate = productionDate;
    }

    internal void SetDuration(TimeSpan duration)
    {
      Duration = duration;
    }

    internal void SetMinimalAge(int minimalAge)
    {
      MinimalAge = minimalAge;
    }
  }
}
