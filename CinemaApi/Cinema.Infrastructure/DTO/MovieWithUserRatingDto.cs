using System;
using Cinema.Entities;

namespace Cinema.DTO
{
  public class MovieWithUserRatingDto
  {
    public MovieDto Movie { get; set; }
    public int UserRating { get; set; }
  }
}
