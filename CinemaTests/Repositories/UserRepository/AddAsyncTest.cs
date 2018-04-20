using System;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Data;
using Cinema.Repositories;
using FluentAssertions;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace CinemaTests.Repositories.UserRepository
{
    public class AddAsyncTest
    {
        public User User { get; set; }
        public IUserRepository UserRepository { get; set; }

        private void SetUp(CinemaDbContext cinemaDbContext)
        {
            User = new User
            {
                FirstName = "John",
                LastName = "Foe",
                Email = "johnfoe@test.com",
                Password = "Secret",
                Salt = "Salt",
                Role = "User"
            };
            UserRepository = new Cinema.Repositories.UserRepository(cinemaDbContext);
        }

        [Fact]
        public void GivenModelWithoutEmailExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.Email = null;
                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.Email\'.");
            }
        }

        [Fact]
        public void GivenModelWithoutFirstNameExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.FirstName = null;

                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.FirstName\'.");
            }
        }

        [Fact]
        public void GivenModelWithoutLastNameExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.LastName = null;

                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.LastName\'.");
            }
        }

        [Fact]
        public void GivenModelWithoutPasswordExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.Password = null;

                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.Password\'.");
            }
        }

        [Fact]
        public void GivenModelWithoutRoleExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.Role = null;

                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.Role\'.");
            }
        }

        [Fact]
        public void GivenModelWithoutSaltExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                User.Salt = null;

                Func<Task> fun = async () => { await UserRepository.AddAsync(User); };

                fun.ShouldThrow<DbUpdateException>()
                    .WithInnerException<SqliteException>()
                    .WithInnerMessage("SQLite Error 19: \'NOT NULL constraint failed: Users.Salt\'.");
            }
        }

        [Fact]
        public async Task GivenValidModelUserShouldBeAdd()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);

                await UserRepository.AddAsync(User);

                var userFromDb = await context.Users.SingleOrDefaultAsync(u => u.Email == "johnfoe@test.com");
                userFromDb.Should().NotBeNull();
                userFromDb.FirstName.ShouldBeEquivalentTo(User.FirstName);
                userFromDb.LastName.ShouldBeEquivalentTo(User.LastName);
                userFromDb.Email.ShouldBeEquivalentTo(User.Email);
                userFromDb.Password.ShouldBeEquivalentTo(User.Password);
                userFromDb.Salt.ShouldBeEquivalentTo(User.Salt);
                userFromDb.Role.ShouldBeEquivalentTo(User.Role);
            }
        }
    }
}