using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using cinema.Models;
using cinema.Entities;

namespace cinema.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
           
            // ******************** RaitingConfiguration *****************//
            #region RaitingConfiguration

            builder.Entity<Raiting>().HasKey(r => new { r.MovieId, r.UserId });
            builder.Entity<Raiting>().HasOne(r => r.Movies).WithMany(m => m.Raitings).HasForeignKey(r => r.MovieId);
            builder.Entity<Raiting>().HasOne(r => r.User).WithMany(u => u.Raitings).HasForeignKey(r => r.UserId);

            #endregion

            // ******************** SeatReserverdConfiguration *****************//
            #region ShowConfiguration

            builder.Entity<SeatReserved>().HasOne(sr => sr.Seat).WithMany(s => s.SeatsReserved).HasForeignKey(sr => sr.SeatId);
            builder.Entity<SeatReserved>().HasOne(sr => sr.Show).WithMany(s => s.SeatsReserved).HasForeignKey(sr => sr.ShowId);
            builder.Entity<SeatReserved>().HasOne(sr => sr.Reservation).WithMany(r => r.SeatsReserved).HasForeignKey(sr => sr.ReservationId);

            #endregion
        }
    }
}
