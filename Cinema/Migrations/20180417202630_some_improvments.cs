using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cinema.Migrations
{
  public partial class some_improvments : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        name: "FK_Reservations_Shows_ShowId",
        table: "Reservations");

      migrationBuilder.DropTable(
        name: "Shows");

      migrationBuilder.DropColumn(
        name: "Number",
        table: "Rooms");

      migrationBuilder.RenameColumn(
        name: "ShowId",
        table: "Reservations",
        newName: "SeanceId");

      migrationBuilder.RenameIndex(
        name: "IX_Reservations_ShowId",
        table: "Reservations",
        newName: "IX_Reservations_SeanceId");

      migrationBuilder.AddColumn<string>(
        name: "Name",
        table: "Rooms",
        nullable: false,
        defaultValue: "");

      migrationBuilder.AddColumn<string>(
        name: "PosterPath",
        table: "Movies",
        nullable: true);

      migrationBuilder.AddColumn<string>(
        name: "TrailerPath",
        table: "Movies",
        nullable: true);

      migrationBuilder.CreateTable(
        name: "Seance",
        columns: table => new
        {
          Id = table.Column<int>(nullable: false)
            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
          Duration = table.Column<TimeSpan>(nullable: false),
          MovieId = table.Column<int>(nullable: false),
          RoomId = table.Column<int>(nullable: false),
          SeanceStart = table.Column<DateTime>(nullable: false)
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_Seance", x => x.Id);
          table.ForeignKey(
            name: "FK_Seance_Movies_MovieId",
            column: x => x.MovieId,
            principalTable: "Movies",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
            name: "FK_Seance_Rooms_RoomId",
            column: x => x.RoomId,
            principalTable: "Rooms",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
        });

      migrationBuilder.CreateIndex(
        name: "IX_Seance_MovieId",
        table: "Seance",
        column: "MovieId");

      migrationBuilder.CreateIndex(
        name: "IX_Seance_RoomId",
        table: "Seance",
        column: "RoomId");

      migrationBuilder.AddForeignKey(
        name: "FK_Reservations_Seance_SeanceId",
        table: "Reservations",
        column: "SeanceId",
        principalTable: "Seance",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        name: "FK_Reservations_Seance_SeanceId",
        table: "Reservations");

      migrationBuilder.DropTable(
        name: "Seance");

      migrationBuilder.DropColumn(
        name: "Name",
        table: "Rooms");

      migrationBuilder.DropColumn(
        name: "PosterPath",
        table: "Movies");

      migrationBuilder.DropColumn(
        name: "TrailerPath",
        table: "Movies");

      migrationBuilder.RenameColumn(
        name: "SeanceId",
        table: "Reservations",
        newName: "ShowId");

      migrationBuilder.RenameIndex(
        name: "IX_Reservations_SeanceId",
        table: "Reservations",
        newName: "IX_Reservations_ShowId");

      migrationBuilder.AddColumn<int>(
        name: "Number",
        table: "Rooms",
        nullable: false,
        defaultValue: 0);

      migrationBuilder.CreateTable(
        name: "Shows",
        columns: table => new
        {
          Id = table.Column<int>(nullable: false)
            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
          MovieId = table.Column<int>(nullable: false),
          RoomId = table.Column<int>(nullable: false),
          ShowDate = table.Column<DateTime>(nullable: false)
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_Shows", x => x.Id);
          table.ForeignKey(
            name: "FK_Shows_Movies_MovieId",
            column: x => x.MovieId,
            principalTable: "Movies",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
            name: "FK_Shows_Rooms_RoomId",
            column: x => x.RoomId,
            principalTable: "Rooms",
            principalColumn: "Id",
            onDelete: ReferentialAction.Cascade);
        });

      migrationBuilder.CreateIndex(
        name: "IX_Shows_MovieId",
        table: "Shows",
        column: "MovieId");

      migrationBuilder.CreateIndex(
        name: "IX_Shows_RoomId",
        table: "Shows",
        column: "RoomId");

      migrationBuilder.AddForeignKey(
        name: "FK_Reservations_Shows_ShowId",
        table: "Reservations",
        column: "ShowId",
        principalTable: "Shows",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
    }
  }
}
