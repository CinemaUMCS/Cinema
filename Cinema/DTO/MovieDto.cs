using System;
using cinema.Entities;

namespace Cinema.DTO
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public Category Category { get; set; }
        public string Description { get; set; }
        public DateTime? ProductionDate { get; set; }

    }
}