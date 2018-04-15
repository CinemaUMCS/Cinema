using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Cinema.Entities;
using Cinema.Exceptions;
using Cinema.Repositories;
using Cinema.Services;
using FluentAssertions;
using Moq;
using Xunit;

namespace CinemaTests.Services.UserService
{
    public class LoginAsyncTests: UserServiceTest
    {
        protected new void SetUp()
        {
            base.SetUp();
            UserRepositoryMock.Setup(m => m.GetByEmailAsync(User.Email)).Returns(Task.FromResult<User>(User));
            EncrypterMock.Setup(m => m.Compute(User.Password, It.IsAny<string>()))
                .Returns((string pass, string salt) => pass);
            EncrypterMock.Setup(m => m.Compare(User.Password,User.Password)).Returns(true);
            UserService=new Cinema.Services.UserService(UserRepositoryMock.Object, EncrypterMock.Object, TokenProviderMock.Object);
        }

        [Fact]
        public async Task GivenUniqueEmailAndValidPasswordUserShouldBeRegistered()
        {
            SetUp();
            var email = User.Email;
            var password = User.Password;
            
            await UserService.LoginAsync(email, password);

            TokenProviderMock.Verify(m => m.CreateToken(It.IsAny<int>(), User.Role),Times.Once());


        }
        [Fact]
        public void GivenInvalidEmailExceptionShouldBeThrown()
        {
            SetUp();
            var invalidEmail = "invalid@test.pl";
            var password = User.Password;
            
            Func<Task> fun = async () =>
            {
                await UserService.LoginAsync(invalidEmail, password);
            };

            fun.ShouldThrow<InvalidCredentials>();
        }
        [Fact]
        public void GivenInvalidPasswordExceptionShouldBeThrown()
        {
            SetUp();
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
