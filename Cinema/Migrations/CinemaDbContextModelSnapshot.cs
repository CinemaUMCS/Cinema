﻿// <auto-generated />
using Cinema.Data;
using Cinema.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using System;

namespace Cinema.Migrations
{
    [DbContext(typeof(CinemaDbContext))]
    partial class CinemaDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.2-rtm-10011")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Cinema.Entities.Movie", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Category");

                    b.Property<string>("Description");

                    b.Property<string>("PosterPath")
                        .IsRequired();

                    b.Property<DateTime?>("ProductionDate");

                    b.Property<string>("Title")
                        .IsRequired();

                    b.Property<string>("TrailerPath");

                    b.HasKey("Id");

                    b.ToTable("Movies");
                });

            modelBuilder.Entity("Cinema.Entities.Rating", b =>
                {
                    b.Property<int>("MovieId");

                    b.Property<int>("UserId");

                    b.Property<int?>("Mark");

                    b.HasKey("MovieId", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("Ratings");
                });

            modelBuilder.Entity("Cinema.Entities.Reservation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("NumberOfConcessionaryTickets");

                    b.Property<int>("NumberOfNormalTickets");

                    b.Property<bool>("Paid");

                    b.Property<int>("SeanceId");

                    b.Property<int>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("SeanceId");

                    b.HasIndex("UserId");

                    b.ToTable("Reservations");
                });

            modelBuilder.Entity("Cinema.Entities.ReservedSeat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ReservationId");

                    b.Property<int>("SeatId");

                    b.HasKey("Id");

                    b.HasIndex("ReservationId");

                    b.HasIndex("SeatId");

                    b.ToTable("ReservedSeats");
                });

            modelBuilder.Entity("Cinema.Entities.Room", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("Cinema.Entities.Seance", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<double>("ConcessionaryTicketPrice");

                    b.Property<TimeSpan>("Duration");

                    b.Property<int>("MovieId");

                    b.Property<double>("NormalTicketPrice");

                    b.Property<int>("RoomId");

                    b.Property<DateTime>("SeanceStart");

                    b.HasKey("Id");

                    b.HasIndex("MovieId");

                    b.HasIndex("RoomId");

                    b.ToTable("Seances");
                });

            modelBuilder.Entity("Cinema.Entities.Seat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("Number");

                    b.Property<int>("RoomId");

                    b.Property<int>("Row");

                    b.HasKey("Id");

                    b.HasIndex("RoomId");

                    b.ToTable("Seats");
                });

            modelBuilder.Entity("Cinema.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstName")
                        .IsRequired();

                    b.Property<string>("LastName")
                        .IsRequired();

                    b.Property<string>("Password")
                        .IsRequired();

                    b.Property<string>("Role")
                        .IsRequired();

                    b.Property<string>("Salt")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Cinema.Entities.Rating", b =>
                {
                    b.HasOne("Cinema.Entities.Movie", "Movie")
                        .WithMany("Ratings")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cinema.Entities.User", "User")
                        .WithMany("Ratings")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cinema.Entities.Reservation", b =>
                {
                    b.HasOne("Cinema.Entities.Seance", "Seance")
                        .WithMany("Reservations")
                        .HasForeignKey("SeanceId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cinema.Entities.User", "User")
                        .WithMany("Reservations")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cinema.Entities.ReservedSeat", b =>
                {
                    b.HasOne("Cinema.Entities.Reservation", "Reservation")
                        .WithMany("ReservedSeats")
                        .HasForeignKey("ReservationId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cinema.Entities.Seat", "Seat")
                        .WithMany()
                        .HasForeignKey("SeatId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("Cinema.Entities.Seance", b =>
                {
                    b.HasOne("Cinema.Entities.Movie", "Movie")
                        .WithMany("Seances")
                        .HasForeignKey("MovieId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("Cinema.Entities.Room", "Room")
                        .WithMany("Seances")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Cinema.Entities.Seat", b =>
                {
                    b.HasOne("Cinema.Entities.Room", "Room")
                        .WithMany("Seats")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
