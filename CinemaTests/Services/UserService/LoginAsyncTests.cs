using System;
using System.Threading.Tasks;
using Cinema.Data;
using Cinema.Entities;
using Cinema.Exceptions;
using FluentAssertions;
using Moq;
using Xunit;

namespace CinemaTests.Services.UserService
{
    public class LoginAsyncTests : UserServiceTest
    {
        protected new void SetUp(CinemaDbContext cinemaDbContext)
        {
            base.SetUp(cinemaDbContext);
            EncrypterMock.Setup(m => m.Compute(User.Password, It.IsAny<string>()))
                .Returns((string pass, string salt) => pass);
            EncrypterMock.Setup(m => m.Compare(User.Password, User.Password)).Returns(true);
            cinemaDbContext.Add(User);
            cinemaDbContext.SaveChanges();
            UserService = new Cinema.Services.UserService(cinemaDbContext, EncrypterMock.Object, TokenProviderMock.Object, Mapper);
        }

        [Fact]
        public async Task GivenUniqueEmailAndValidPasswordUserShouldBeRegistered()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var email = User.Email;
                var password = User.Password;

                await UserService.LoginAsync(email, password);

                TokenProviderMock.Verify(m => m.CreateToken(It.IsAny<int>(), User.Role), Times.Once());
            }


        }
        [Fact]
        public void GivenInvalidEmailExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var invalidEmail = "invalid@test.pl";
                var password = User.Password;

                Func<Task> fun = async () =>
                {
                    await UserService.LoginAsync(invalidEmail, password);
                };

                fun.ShouldThrow<InvalidCredentials>();
            }
        }
        [Fact]
        public void GivenInvalidPasswordExceptionShouldBeThrown()
        {
            using (var context = new CinemaDbContextFactory().CreateContext())
            {
                SetUp(context);
                var email = User.Email;
                var invalidPassword = "InvalidPassword";
                
                Func<Task> fun = async () =>
                {
                    await UserService.LoginAsync(email, invalidPassword);
                };

                fun.ShouldThrow<InvalidCredentials>();
            }
        }
    }
}
