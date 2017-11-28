using System;
using System.Collections.Generic;
using System.Security.AccessControl;

namespace cinema.Entities
{
    public class Rating
    {
        public Guid Id { get; set; }
        public Guid RaitingVal { get; set; }

        public virtual User User { get; set; }
        public virtual Movie Movie { get; set; }
        public Guid UserId { get; set; }
        public Guid MovieId { get; set; }
    }
}