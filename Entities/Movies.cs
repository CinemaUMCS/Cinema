using System;
using System.Collections.Generic;

namespace cinema.Entities {
    public enum Category {
        Horror, Comedy, Thriller, Action
    }
    public class Movie {
        public Movie()
        {
            Raitings = new HashSet<Raiting>();
            Shows = new HashSet<Show>();
        }
        public int MovieId { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
        public DateTime? ProductionDate { get; set; }
        public virtual ICollection<Raiting> Raitings { get; set; }
        public virtual ICollection<Show> Shows { get; set; }
    }
}