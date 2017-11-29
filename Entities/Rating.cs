using System;
using System.Collections.Generic;
using System.Security.AccessControl;

namespace cinema.Entities
{
    public class Rating
    {
        public int RaitingVal { get; set; }

        public virtual User User { get; set; }
        public virtual Movie Movie { get; set; }
        public int UserId { get; set; }
        public int MovieId { get; set; }
    }
}