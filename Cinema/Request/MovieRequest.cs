using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cinema.Entities;

namespace Cinema.Request
{
  public class MovieRequest
  {
    public string Title { get; set; }
    public string TrailerPath { get; set; }
    public string PosterPath { get; set; }
    public Category Category { get; set; }
    public string Description { get; set; }
    public DateTime? ProductionDate { get; set; }
    public TimeSpan Duration { get; private set; }
    public int MinimalAge { get; private set; }
  }
}
