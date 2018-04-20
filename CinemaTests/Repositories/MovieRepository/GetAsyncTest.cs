using Cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using FluentAssertions;
using System;
using System.Threading.Tasks;
using Xunit;

namespace CinemaTests.Repositories.MovieRepository
{
    public class GetAsyncTest
    {
        public IMovieRepository MovieRepository { get; set; }
        private void SetUp(CinemaDbContext cinemaDbContext)
        {

            MovieRepository = new Cinema.Repositories.MovieRepository(cinemaDbContext);
        }

        [Fact]
        public async Task GivenExistIdFunctionShouldReturnMovie()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var movie = new Movie
                {
                    Id=100,
                    Title = "NewMovie",
                    Category = Category.Action,
                    Description = "Blabla",
                    ProductionDate = DateTime.Today
                };
                await context.Movies.AddAsync(movie);
                await context.SaveChangesAsync();
                SetUp(context);

                var movieFromDb = await MovieRepository.GetAsync(movie.Id);
                movieFromDb.Should().NotBeNull();
            }
        }

        [Fact]
        public async Task GivenNotExistIdFunctionShouldReturnNull()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);

                var movieFromDb = await MovieRepository.GetAsync(-1);
                movieFromDb.Should().BeNull();
            }
        }
    }
}