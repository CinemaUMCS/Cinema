using System;
using Cinema.Entities;

namespace Cinema.DTO
{
  public class WatchedMovieDto
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string TrailerPath { get; set; }
    public string PosterPath { get; set; }
    public int UserRating { get; set; }
  }
}
