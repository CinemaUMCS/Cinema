using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cinema.Migrations
{
    public partial class reservation_changes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfConcessionaryTickets",
                table: "Reservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfNormalTickets",
                table: "Reservations",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Value",
                table: "Reservations",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfConcessionaryTickets",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "NumberOfNormalTickets",
                table: "Reservations");

            migrationBuilder.DropColumn(
                name: "Value",
                table: "Reservations");
        }
    }
}
