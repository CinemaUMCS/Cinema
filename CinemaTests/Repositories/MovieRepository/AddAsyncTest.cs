using System;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using FluentAssertions;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CinemaTests.Repositories.MovieRepository
{
    public class AddAsyncTest
    {
        public Movie Movie { get; set; }
        public IMovieRepository MovieRepository { get; set; }

        private void SetUp(CinemaDbContext cinemaDbContext)
        {
            Movie = new Movie
            {
                Id = 100,
                Title = "NewMovie",
                Category = Category.Action,
                Description = "Blabla",
                ProductionDate = DateTime.Today
            };
            MovieRepository = new Cinema.Repositories.MovieRepository(cinemaDbContext);
        }

        [Fact]
        public void GivenModelWithoutTtileExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                Movie.Title = null;
                Func<Task> fun = async () => { await MovieRepository.AddAsync(Movie); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Movies.Title\'.");
            }
        }
        [Fact]
        public void GivenModelWithoutDescriptionExceptionShouldNotBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                Movie.Description = null;

                Func<Task> fun = async () => { await MovieRepository.AddAsync(Movie); };

                fun.ShouldNotThrow();
            }
        }
        [Fact]
        public void GivenModelWithoutProductionDataExceptionShouldNotBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                Movie.ProductionDate = null;

                Func<Task> fun = async () => { await MovieRepository.AddAsync(Movie); };

                fun.ShouldNotThrow();
            }
        }
        [Fact]
        public async Task GivenValidModelMovieShouldBeAdd()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);

                await MovieRepository.AddAsync(Movie);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == 100);
                movieFromDb.Should().NotBeNull();
                movieFromDb.Title.ShouldBeEquivalentTo(Movie.Title);
                movieFromDb.Category.ShouldBeEquivalentTo(Movie.Category);
                movieFromDb.ProductionDate.ShouldBeEquivalentTo(Movie.ProductionDate);
                movieFromDb.Description.ShouldBeEquivalentTo(Movie.Description);
            }
        }
    }
}