using System;
using System.Threading.Tasks;
using Cinema.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Extensions;

namespace Cinema.Data
{
  public class CinemaDbContext : DbContext
  {
    public DbSet<User> Users { get; set; }
    public DbSet<Rating> Ratings { get; set; }
    public DbSet<Seance> Seances { get; set; }
    public DbSet<Reservation> Reservations { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Seat> Seats { get; set; }
    public DbSet<ReservedSeat> ReservedSeats { get; set; }
    public DbSet<Movie> Movies { get; set; }
    public CinemaDbContext(DbContextOptions<CinemaDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      // ******************** RaitngConfiguration *****************//

      #region RatingConfiguration

      builder.Entity<Rating>().HasKey(r => new { r.MovieId, r.UserId });
      builder.Entity<Rating>().HasOne(r => r.Movie).WithMany(m => m.Ratings).HasForeignKey(r => r.MovieId);
      builder.Entity<Rating>().HasOne(r => r.User).WithMany(u => u.Ratings).HasForeignKey(r => r.UserId);
      builder.Entity<Rating>().Property(r => r.Mark).IsRequired(false);

      #endregion

      // ******************** SeanceConfiguration *****************//

      #region SeanceConfiguration

      builder.Entity<Seance>().HasKey(s => s.Id);
      builder.Entity<Seance>().Property(s => s.SeanceStart).IsRequired();
      builder.Entity<Seance>().HasOne(s => s.Room).WithMany(r => r.Seances).HasForeignKey(s => s.RoomId);
      builder.Entity<Seance>().HasOne(s => s.Movie).WithMany(m => m.Seances).HasForeignKey(m => m.MovieId);
      builder.Entity<Seance>().Property(s => s.ConcessionaryTicketPrice).IsRequired();
      builder.Entity<Seance>().Property(s => s.NormalTicketPrice).IsRequired();
      builder.Entity<Seance>().Metadata.FindNavigation(nameof(Seance.Reservations)).SetPropertyAccessMode(PropertyAccessMode.Field);

      #endregion

      // ******************** UserConfiguration *****************//

      #region UserConfiguration

      builder.Entity<User>().HasKey(u => u.Id);
      builder.Entity<User>().Property(u => u.FirstName).IsRequired();
      builder.Entity<User>().Property(u => u.LastName).IsRequired();
      builder.Entity<User>().Property(u => u.Email).IsRequired();
      builder.Entity<User>().Property(u => u.Password).IsRequired();
      builder.Entity<User>().Property(u => u.Salt).IsRequired();
      builder.Entity<User>().Property(u => u.Role).IsRequired();
      builder.Entity<User>().Metadata.FindNavigation(nameof(User.Reservations)).SetPropertyAccessMode(PropertyAccessMode.Field);
      builder.Entity<User>().Metadata.FindNavigation(nameof(User.Ratings)).SetPropertyAccessMode(PropertyAccessMode.Field);
      #endregion

      //********************ReservationConfiguration * ****************

      #region ReservationConfiguration

      builder.Entity<Reservation>().HasKey(u => u.Id);
      builder.Entity<Reservation>().Property(r => r.Paid).IsRequired();
      builder.Entity<Reservation>().HasOne(r => r.Seance).WithMany(s => s.Reservations)
          .HasForeignKey(r => r.SeanceId);
      builder.Entity<Reservation>().HasOne(r => r.User).WithMany(u => u.Reservations)
          .HasForeignKey(r => r.UserId);
      builder.Entity<Reservation>().Metadata.FindNavigation(nameof(Reservation.ReservedSeats)).SetPropertyAccessMode(PropertyAccessMode.Field);

      #endregion

      // ******************** RoomConfiguration *****************//

      #region RoomConfiguration

      builder.Entity<Room>().HasKey(r => r.Id);
      builder.Entity<Room>().Property(r => r.Name).IsRequired();
      builder.Entity<Room>().Metadata.FindNavigation(nameof(Room.Seances)).SetPropertyAccessMode(PropertyAccessMode.Field);
      builder.Entity<Room>().Metadata.FindNavigation(nameof(Room.Seats)).SetPropertyAccessMode(PropertyAccessMode.Field);

      #endregion

      // ******************** SeatConfiguration *****************//

      #region SeatConfiguration

      builder.Entity<Seat>().HasKey(u => u.Id);
      builder.Entity<Seat>().Property(s => s.Row).IsRequired();
      builder.Entity<Seat>().Property(s => s.Number).IsRequired();
      builder.Entity<Seat>().HasOne(s => s.Room).WithMany(r => r.Seats);

      #endregion

      // ******************** ReservedSeatConfiguration *****************//

      #region ReservedSeatConfiguration

      builder.Entity<ReservedSeat>().HasKey(s => s.Id);
      builder.Entity<ReservedSeat>().HasOne(s => s.Reservation).WithMany(r => r.ReservedSeats).HasForeignKey(s => s.ReservationId);
      builder.Entity<ReservedSeat>().HasOne(s => s.Seat).WithMany().HasForeignKey(s => s.SeatId).OnDelete(DeleteBehavior.Restrict);
      #endregion

      // ******************** MovieConfiguration *****************//

      #region MovieConfiguration

      builder.Entity<Movie>().HasKey(m => m.Id);
      builder.Entity<Movie>().Property(m => m.Title).IsRequired();
      builder.Entity<Movie>().Property(m => m.Category).IsRequired();
      builder.Entity<Movie>().Property(m => m.Description).IsRequired(false);
      builder.Entity<Movie>().Property(m => m.ProductionDate).IsRequired(false);
      builder.Entity<Movie>().Property(m => m.TrailerPath).IsRequired(false);
      builder.Entity<Movie>().Property(m => m.PosterPath).IsRequired(true);
      builder.Entity<Movie>().Property(m => m.Duration).IsRequired(true);
      builder.Entity<Movie>().Property(m => m.MinimalAge).IsRequired(false);
      builder.Entity<Movie>().Metadata.FindNavigation(nameof(Movie.Seances)).SetPropertyAccessMode(PropertyAccessMode.Field);
      builder.Entity<Movie>().Metadata.FindNavigation(nameof(Movie.Ratings)).SetPropertyAccessMode(PropertyAccessMode.Field);

      #endregion
    }
  }
}
