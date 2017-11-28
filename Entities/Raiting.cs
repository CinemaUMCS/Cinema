using System.Collections.Generic;

namespace cinema.Entities
{
    public class Raiting
    {
        public int UserId { get; set; }
        public int MovieId { get; set; }
        public float RaitingVal { get; set; }
        public virtual User User { get; set; }
        public virtual Movie Movies { get; set; }
    }
}