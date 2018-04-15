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
        public Movie()
        {
            Ratings = new HashSet<Rating>();
            Shows = new HashSet<Show>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
        public DateTime? ProductionDate { get; set; }

        public ICollection<Rating> Ratings { get; set; }
        public ICollection<Show> Shows { get; set; }
    }
}
