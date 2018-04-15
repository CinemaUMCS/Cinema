using System;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CinemaTests.Repositories.MovieRepository
{
    public class GetAllAsyncTest
    {
        public IMovieRepository MovieRepository { get; set; }

        private async Task SetUp(CinemaDbContext context)
        {
            MovieRepository = new Cinema.Repositories.MovieRepository(context);
        }

        [Fact]
        public async Task AllMoviesInDatabaseShouldBeReturned()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);
                var movie1 = new Movie
                {
                    Id = 1,
                    Title = "Raz",
                    Category = Category.Thriller,
                    Description = "BbBB",
                    ProductionDate = DateTime.Now
                };
                var movie2 = new Movie
                {
                    Id = 2,
                    Title = "Dwa",
                    Category = Category.Action,
                    Description = "BdffaB",
                    ProductionDate = DateTime.Now
                };
                var movie3 = new Movie
                {
                    Id = 3,
                    Title = "Trzy",
                    Category = Category.Horror,
                    Description = "BdffaB",
                    ProductionDate = DateTime.Now
                };
                await context.Movies.AddAsync(movie1);
                await context.Movies.AddAsync(movie2);
                await context.Movies.AddAsync(movie3);
                await context.SaveChangesAsync();

                var movies=await MovieRepository.GetAllAsync();

                movies.Count.ShouldBeEquivalentTo(3);
                movies.Contains(movie1).ShouldBeEquivalentTo(true);
                movies.Contains(movie2).ShouldBeEquivalentTo(true);
                movies.Contains(movie3).ShouldBeEquivalentTo(true);
            }
        }
    }
}