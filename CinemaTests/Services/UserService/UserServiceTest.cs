using System;
using System.Collections.Generic;
using System.Text;
using cinema.Entities;
using Cinema.Repositories;
using Cinema.Services;
using Moq;

namespace CinemaTests.Services.UserService
{
    public abstract class UserServiceTest
    {

        protected Mock<IUserRepository> UserRepositoryMock;
        protected Mock<ITokenProvider> TokenProviderMock;
        protected Mock<IEncrypter> EncrypterMock;
        protected IUserService UserService;
        protected User User = new User("test123@o2.pl", "FirstName", "LastName", "Secret123", "salt123", "user");

        protected void SetUp()
        {
            User = new User("test123@o2.pl", "FirstName", "LastName", "Secret123", "salt123", "user");
            UserRepositoryMock = new Mock<IUserRepository>();
            TokenProviderMock = new Mock<ITokenProvider>();
            EncrypterMock = new Mock<IEncrypter>();
            UserService = new Cinema.Services.UserService(UserRepositoryMock.Object, EncrypterMock.Object, TokenProviderMock.Object);
        }
    }
}
