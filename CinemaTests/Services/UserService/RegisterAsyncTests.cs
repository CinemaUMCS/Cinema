using System;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Exceptions;
using FluentAssertions;
using Xunit;

namespace CinemaTests.Services.UserService
{
    public class RegisterAsyncTests: UserServiceTest
    {
        [Fact]
        public async Task GivenUniqueEmailAndValidPasswordUserShouldBeRegistered()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var newValidEmail = "newEmail@o2.pl";
                var newValidPassword = "Password12";

                await UserService.RegisterAsync(newValidEmail, User.FirstName, User.LastName, newValidPassword, User.Role);
            }
        }
        [Fact]
        public void GivenInvalidEmailExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var invalidEmail = "invalido2.pl";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(invalidEmail, User.FirstName, User.LastName, User.Password, User.Role);
                };

                fun.ShouldThrow<InvalidEmail>();
            }
        }
        [Fact]
        public void GivenOccupiedEmailExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                context.Users.Add(User);
                context.SaveChanges(); 

                var occupiedEmail = User.Email;
                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(occupiedEmail, User.FirstName, User.LastName, User.Password, User.Role);
                };

                fun.ShouldThrow<InvalidEmail>();
            }
        }

        [Theory]
        [InlineData("123")] //too short
        [InlineData("abckkkkkkk123")] //no upper case
        [InlineData("ABCKKKKKKK123")] //no lower case
        [InlineData("ABCKdada")] //no number
        public void GivenInvalidPasswordExceptionShouldBeThrown(string password)
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, password, User.Role);
                };

                fun.ShouldThrow<InvalidPassword>();
            }
        }
        [Fact]
        public void GivenInvalidRoleExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var invalidRole = "BACDEFA";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, User.Password, invalidRole);
                };

                fun.ShouldThrow<InvalidRole>();
            }
        }
    }
}