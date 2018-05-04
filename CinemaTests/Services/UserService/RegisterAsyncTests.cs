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
        [Fact]
        public void GivenPasswordShorterThanSixExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var shortPassword = "123";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, shortPassword, User.Role);
                };

                fun.ShouldThrow<InvalidPassword>();
            }
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneUpperCaseExceptionShouldBeThrown()
        {

            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var noUpperPassword = "abckkkkkkk123";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noUpperPassword, User.Role);
                };

                fun.ShouldThrow<InvalidPassword>();
            }
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneLowerCaseExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var noLowerPassword = "ABCKKKKKKK123";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noLowerPassword, User.Role);
                };

                fun.ShouldThrow<InvalidPassword>();
            }
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneNumberExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var noNumbersPassword = "ABCKdada";

                Func<Task> fun = async () =>
                {
                    await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noNumbersPassword, User.Role);
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