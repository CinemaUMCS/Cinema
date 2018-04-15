using System;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using CinemaTests.Repositories;
using FluentAssertions;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CinemaTests.Repositories.UserRepository
{
    public class GetAsyncTest
    {
        public IUserRepository UserRepository { get; set; }
        private void SetUp(CinemaDbContext cinemaDbContext)
        {

            UserRepository = new Cinema.Repositories.UserRepository(cinemaDbContext);
        }

        [Fact]
        public async Task GivenExistEmailFunctionShouldReturnUser()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                var user = new User
                {
                    FirstName = "John",
                    LastName = "Foe",
                    Email = "johnfoe@test.com",
                    Password = "Secret",
                    Salt = "Salt",
                    Role = "User"
                };
                await context.Users.AddAsync(user);
                await context.SaveChangesAsync();
                SetUp(context);

                var userFromDb = await UserRepository.GetByEmailAsync(user.Email);
                userFromDb.Should().NotBeNull();
            }
        }

        [Fact]
        public async Task GivenNotExistEmailFunctionShouldReturnNull()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);

                var userFromDb = await UserRepository.GetByEmailAsync("invalid_mail@test.com");
                userFromDb.Should().BeNull();
            }
        }
    }
}