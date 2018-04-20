using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cinema.Migrations
{
  public partial class fixed_seances_name : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        name: "FK_Reservations_Seance_SeanceId",
        table: "Reservations");

      migrationBuilder.DropForeignKey(
        name: "FK_Seance_Movies_MovieId",
        table: "Seance");

      migrationBuilder.DropForeignKey(
        name: "FK_Seance_Rooms_RoomId",
        table: "Seance");

      migrationBuilder.DropPrimaryKey(
        name: "PK_Seance",
        table: "Seance");

      migrationBuilder.RenameTable(
        name: "Seance",
        newName: "Seances");

      migrationBuilder.RenameIndex(
        name: "IX_Seance_RoomId",
        table: "Seances",
        newName: "IX_Seances_RoomId");

      migrationBuilder.RenameIndex(
        name: "IX_Seance_MovieId",
        table: "Seances",
        newName: "IX_Seances_MovieId");

      migrationBuilder.AlterColumn<string>(
        name: "PosterPath",
        table: "Movies",
        nullable: false,
        oldClrType: typeof(string),
        oldNullable: true);

      migrationBuilder.AddPrimaryKey(
        name: "PK_Seances",
        table: "Seances",
        column: "Id");

      migrationBuilder.AddForeignKey(
        name: "FK_Reservations_Seances_SeanceId",
        table: "Reservations",
        column: "SeanceId",
        principalTable: "Seances",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);

      migrationBuilder.AddForeignKey(
        name: "FK_Seances_Movies_MovieId",
        table: "Seances",
        column: "MovieId",
        principalTable: "Movies",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);

      migrationBuilder.AddForeignKey(
        name: "FK_Seances_Rooms_RoomId",
        table: "Seances",
        column: "RoomId",
        principalTable: "Rooms",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropForeignKey(
        name: "FK_Reservations_Seances_SeanceId",
        table: "Reservations");

      migrationBuilder.DropForeignKey(
        name: "FK_Seances_Movies_MovieId",
        table: "Seances");

      migrationBuilder.DropForeignKey(
        name: "FK_Seances_Rooms_RoomId",
        table: "Seances");

      migrationBuilder.DropPrimaryKey(
        name: "PK_Seances",
        table: "Seances");

      migrationBuilder.RenameTable(
        name: "Seances",
        newName: "Seance");

      migrationBuilder.RenameIndex(
        name: "IX_Seances_RoomId",
        table: "Seance",
        newName: "IX_Seance_RoomId");

      migrationBuilder.RenameIndex(
        name: "IX_Seances_MovieId",
        table: "Seance",
        newName: "IX_Seance_MovieId");

      migrationBuilder.AlterColumn<string>(
        name: "PosterPath",
        table: "Movies",
        nullable: true,
        oldClrType: typeof(string));

      migrationBuilder.AddPrimaryKey(
        name: "PK_Seance",
        table: "Seance",
        column: "Id");

      migrationBuilder.AddForeignKey(
        name: "FK_Reservations_Seance_SeanceId",
        table: "Reservations",
        column: "SeanceId",
        principalTable: "Seance",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);

      migrationBuilder.AddForeignKey(
        name: "FK_Seance_Movies_MovieId",
        table: "Seance",
        column: "MovieId",
        principalTable: "Movies",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);

      migrationBuilder.AddForeignKey(
        name: "FK_Seance_Rooms_RoomId",
        table: "Seance",
        column: "RoomId",
        principalTable: "Rooms",
        principalColumn: "Id",
        onDelete: ReferentialAction.Cascade);
    }
  }
}
