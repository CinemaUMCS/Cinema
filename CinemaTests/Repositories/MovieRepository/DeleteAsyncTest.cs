using System;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using FluentAssertions;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CinemaTests.Repositories.MovieRepository
{
    public class DeleteAsyncTest
    {
        public IMovieRepository MovieRepository { get; set; }
        public Movie Movie { get; private set; }

        private async Task SetUp(CinemaDbContext context)
        {
            MovieRepository = new Cinema.Repositories.MovieRepository(context);
            Movie = new Movie
            {
                Id = 100,
                Title = "NewMovie",
                Category = Category.Action,
                Description = "Blabla",
                ProductionDate = DateTime.Today
            };
            await context.Movies.AddAsync(Movie);
            await context.SaveChangesAsync();
        }
        [Fact]
        public async Task GivenExistIdUserShouldBeRemoved()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);

                await MovieRepository.DeleteAsync(Movie.Id);

                var movieFromDb = await context.Movies.SingleOrDefaultAsync(m => m.Id == Movie.Id);
                movieFromDb.ShouldBeEquivalentTo(null);
            }
        }
        [Fact]
        public async Task GivenUnexistIdFunctionShouldThrowException()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                await SetUp(context);

                Func<Task> fun = async () => { await MovieRepository.AddAsync(Movie); };

                fun.ShouldThrow<Exception>();
            }
        }
    }
}