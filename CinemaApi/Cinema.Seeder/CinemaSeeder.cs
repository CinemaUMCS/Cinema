using Cinema.Data;
using Cinema.Entities;
using Cinema.Seeder.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Cinema.Seeder
{
    public class CinemaSeeder
    {
        private readonly CinemaDbContext _dbContext;
        private IList<Movie> _movies;
        private IList<Room> _rooms;
        public CinemaSeeder(CinemaDbContext dbContext)
        {
            this._dbContext = dbContext;


        }
        public void Seed(int minNumberOfSeancesPerDay, int maxNumberOfSeancesPerDay)
        {
            ClearAll();
            AddRooms(maxNumberOfSeancesPerDay);
            AddMovies();
            AddSeances(minNumberOfSeancesPerDay, maxNumberOfSeancesPerDay);
        }

        private void ClearAll()
        {
            _dbContext.Database.ExecuteSqlCommand("delete from Seances");
            _dbContext.Database.ExecuteSqlCommand("delete from Movies");
            _dbContext.Database.ExecuteSqlCommand("delete from Rooms");
        }

        private void AddRooms(int numberOfRooms)
        {
            var rooms = new List<Room>();
            for (int i = 0; i < numberOfRooms; ++i)
                rooms.Add(new Room($"pokoj-{i}", 12, 20));
            _dbContext.Rooms.AddRange(rooms);
            _dbContext.SaveChanges();
            _rooms=_dbContext.Rooms.ToList();
        }

        private void AddMovies()
        {
            var movieJson = File.ReadAllText("seed_data.json");
            var movies = JsonConvert.DeserializeObject<List<Movie>>(movieJson);
            _dbContext.Movies.AddRange(movies);
            _dbContext.SaveChanges();
            _movies=_dbContext.Movies.ToList();
        }

        private void AddSeances(int minNumberOfSeancesPerDay,int maxNumberOfSeancesPerDay)
        {
            var randomGenerator=new Random();
            foreach (DateTime day in EachDay(DateTime.Now, DateTime.Now.AddYears(1)))
            {
                int numOfSeancesPerDay = randomGenerator.Next(minNumberOfSeancesPerDay,maxNumberOfSeancesPerDay);
                for(int i=0; i<numOfSeancesPerDay; ++i)
                {
                    var movie=_movies.RandomElement();
                    var room=_rooms.ElementAt(i);
                    double normalTicketPrice=randomGenerator.Next(15,30);
                    double concessionaryTicketPrice=normalTicketPrice-7;
                    var dateTime=day.AddHours(7).AddHours(randomGenerator.Next(0,12));
                    var seance=new Seance(movie.Id,room.Id,dateTime,movie.Duration.Add(TimeSpan.FromMinutes(15)),concessionaryTicketPrice,normalTicketPrice);
                    _dbContext.Add(seance);
                }
            }
            _dbContext.SaveChanges();
        }
        private IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }


    }
}
