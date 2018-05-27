using Cinema.Data;
using Cinema.Seeder;
using Microsoft.Extensions.Configuration;
using System;
using Microsoft.EntityFrameworkCore;

namespace Cinema.AdminTools
{
    class Program
    {
        static void Main(string[] args)
        {
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var connectionString = configuration["Sql:ConnectionString"];
            var dbContextOptions= new DbContextOptionsBuilder<CinemaDbContext>()
                .UseSqlServer(connectionString).Options;
            var cinemaDbContext=new CinemaDbContext(dbContextOptions);

                      
            var seeder=new CinemaSeeder(cinemaDbContext);
            seeder.Seed(5,10);
        }
    }
}
