using System;
using Cinema.Entities;

namespace Cinema.DTO
{
  public class MovieDto
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public DateTime? ProductionDate { get; set; }
    public string TrailerPath { get; set; }
    public string PosterPath { get; set; }
    public TimeSpan Duration { get; private set; }
    public int MinimalAge { get; private set; }
    public double AverageRating { get; set; }
    public string BackgroundPath { get; set; }
  }
}
