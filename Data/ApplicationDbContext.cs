﻿using System;
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
            #region RatingConfiguration

            builder.Entity<Rating>().HasKey(r => new { r.MovieId, r.UserId });
            builder.Entity<Rating>().HasOne(r => r.Movie).WithMany(m => m.Ratings).HasForeignKey(r => r.MovieId);
            builder.Entity<Rating>().HasOne(r => r.User).WithMany(u => u.Ratings).HasForeignKey(r => r.UserId);

            #endregion

            // ******************** ShowConfiguration *****************//
            #region ShowConfiguration

            builder.Entity<Show>().HasKey(s => s.Id);
            builder.Entity<Show>().Property(s => s.ShowDate).IsRequired();
            builder.Entity<Show>().HasOne(s => s.Room).WithMany(r => r.Shows).HasForeignKey(s => s.RoomId);
            builder.Entity<Show>().HasOne(s => s.Movie).WithMany(m => m.Shows).HasForeignKey(m => m.MovieId);

            #endregion

            // ******************** UserConfiguration *****************//
            #region UserConfiguration

            builder.Entity<User>().HasKey(u => u.Id);
            builder.Entity<User>().Property(u => u.FirstName).IsRequired();
            builder.Entity<User>().Property(u => u.LastName).IsRequired();
            #endregion

            // ******************** ReservationConfiguration *****************//
            #region ReservationConfiguration

            builder.Entity<Reservation>().HasKey(u => u.Id);
            builder.Entity<Reservation>().Property(r => r.Status).IsRequired();
            builder.Entity<Reservation>().Property(r => r.Paid).IsRequired();
            builder.Entity<Reservation>().HasOne(r => r.Show).WithMany(s => s.Reservations)
                .HasForeignKey(r => r.ShowId);
            builder.Entity<Reservation>().HasOne(r => r.User).WithMany(u=>u.Reservations)
                .HasForeignKey(r => r.UserId);
            builder.Entity<Reservation>().HasMany(r => r.Seats);
            #endregion

            // ******************** RoomConfiguration *****************//
            #region RoomConfiguration

            builder.Entity<Room>().HasKey(r => r.Id);
            builder.Entity<Room>().Property(r => r.Number).IsRequired();

            #endregion

            // ******************** SeatConfiguration *****************//
            #region SeatConfiguration

            builder.Entity<Seat>().HasKey(u => u.Id);
            builder.Entity<Seat>().Property(s => s.Row).IsRequired();
            builder.Entity<Seat>().Property(s => s.Number).IsRequired();
            builder.Entity<Seat>().HasOne(s => s.Room).WithMany(r => r.Seats);

            #endregion

            // ******************** MovieConfiguration *****************//
            #region MovieConfiguration

            builder.Entity<Movie>().HasKey(m => m.Id);
            builder.Entity<Movie>().Property(m => m.Title).IsRequired();
            builder.Entity<Movie>().Property(m => m.Category).IsRequired();
            builder.Entity<Movie>().Property(m => m.Description).IsRequired(false);
            builder.Entity<Movie>().Property(m => m.ProductionDate).IsRequired(false);

            #endregion


        }
    }
}
