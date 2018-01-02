using System;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Exceptions;
using Cinema.Repositories;
using Cinema.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CinemaTests.Services.UserService
{
    public class RegisterAsyncTests: UserServiceTest
    {
        [Fact]
        public async Task GivenUniqueEmailAndValidPasswordUserShouldBeRegistered()
        {
            SetUp();
            var newValidEmail = "newEmail@o2.pl";
            var newValidPassword = "Password12";

            await UserService.RegisterAsync(newValidEmail, User.FirstName, User.LastName, newValidPassword, User.Role);

            UserRepositoryMock.Verify(x=>x.AddAsync(It.IsAny<User>()),Times.Once);
        }
        [Fact]
        public void GivenInvalidEmailExceptionShouldBeThrown()
        {
            SetUp();
            var invalidEmail = "invalido2.pl";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(invalidEmail, User.FirstName, User.LastName, User.Password, User.Role);
            };

            fun.ShouldThrow<InvalidEmail>();
        }
        [Fact]
        public void GivenOccupiedEmailExceptionShouldBeThrown()
        {
            SetUp();
            UserRepositoryMock.Setup(x => x.GetByEmailAsync(User.Email)).ReturnsAsync(User);
            UserService = new Cinema.Services.UserService(UserRepositoryMock.Object, EncrypterMock.Object, TokenProviderMock.Object);

            var occupiedEmail = User.Email;
            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(occupiedEmail, User.FirstName, User.LastName, User.Password, User.Role);
            };

            fun.ShouldThrow<InvalidEmail>();
        }
        [Fact]
        public void GivenPasswordShorterThanSixExceptionShouldBeThrown()
        {
            SetUp();
            var shortPassword = "123";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, shortPassword, User.Role);
            };

            fun.ShouldThrow<InvalidPassword>();
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneUpperCaseExceptionShouldBeThrown()
        {
            
            SetUp();
            var noUpperPassword = "abckkkkkkk123";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noUpperPassword, User.Role);
            };

            fun.ShouldThrow<InvalidPassword>();
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneLowerCaseExceptionShouldBeThrown()
        {
            SetUp();
            var noLowerPassword = "ABCKKKKKKK123";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noLowerPassword, User.Role);
            };

            fun.ShouldThrow<InvalidPassword>();
        }
        [Fact]
        public void GivenPasswordWithoutAtLeastOneNumberExceptionShouldBeThrown()
        {
            SetUp();
            var noNumbersPassword = "ABCKdada";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, noNumbersPassword, User.Role);
            };

            fun.ShouldThrow<InvalidPassword>();
        }
        [Fact]
        public void GivenInvalidRoleExceptionShouldBeThrown()
        {
            SetUp();
            var invalidRole = "BACDEFA";

            Func<Task> fun = async () =>
            {
                await UserService.RegisterAsync(User.Email, User.FirstName, User.LastName, User.Password, invalidRole);
            };

            fun.ShouldThrow<InvalidRole>();
        }
    }
}