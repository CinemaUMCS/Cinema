using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Cinema.Migrations
{
  public partial class added_ticket_prices_in_seance : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.AddColumn<double>(
        name: "ConcessionaryTicketPrice",
        table: "Seance",
        nullable: false,
        defaultValue: 0.0);

      migrationBuilder.AddColumn<double>(
        name: "NormalTicketPrice",
        table: "Seance",
        nullable: false,
        defaultValue: 0.0);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropColumn(
        name: "ConcessionaryTicketPrice",
        table: "Seance");

      migrationBuilder.DropColumn(
        name: "NormalTicketPrice",
        table: "Seance");
    }
  }
}
