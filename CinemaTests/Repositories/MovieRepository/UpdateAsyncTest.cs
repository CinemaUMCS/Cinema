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
    public class UpdateAsyncTest
    {
        public Movie Movie { get; set; }
        public IMovieRepository MovieRepository { get; set; }

        private async Task SetUp(CinemaDbContext cinemaDbContext)
        {
            Movie = new Movie
            {
                Id = 100,
                Title = "NewMovie",
                Category = Category.Action,
                Description = "Blabla",
                ProductionDate = DateTime.Today
            };
            await cinemaDbContext.Movies.AddAsync(Movie);
            await cinemaDbContext.SaveChangesAsync();
            MovieRepository = new Cinema.Repositories.MovieRepository(cinemaDbContext);
        }
        [Fact]
        public async Task GivenNewValidTitleMovieShouldBeUpdated()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);
                Movie.Title = "New Title";
                await MovieRepository.UpdateAsync(Movie.Id,Movie);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == Movie.Id);
                movieFromDb.Should().NotBeNull();
                movieFromDb.Title.ShouldBeEquivalentTo(Movie.Title);
            }
        }
        [Fact]
        public async Task GivenNewValidDescriptionMovieShouldBeUpdated()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);
                Movie.Description = "New Description";

                await MovieRepository.UpdateAsync(Movie.Id, Movie);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == Movie.Id);
                movieFromDb.Should().NotBeNull();
                movieFromDb.Description.ShouldBeEquivalentTo(Movie.Description);
            }
        }
        [Fact]
        public async Task GivenNewCategoryMovieShouldBeUpdated()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);
                Movie.Category = Category.Thriller;

                await MovieRepository.UpdateAsync(Movie.Id, Movie);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == Movie.Id);
                movieFromDb.Category.ShouldBeEquivalentTo(Movie.Category);
            }
        }
        [Fact]
        public async Task GivenNewProductionDateMovieShouldBeUpdated()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);
                Movie.Category = Category.Thriller;

                await MovieRepository.UpdateAsync(Movie.Id, Movie);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == Movie.Id);
                movieFromDb.ProductionDate.ShouldBeEquivalentTo(Movie.ProductionDate);
            }
        }
    }
}