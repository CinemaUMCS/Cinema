using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Cinema.Data;
using Cinema.Entities;
using Cinema.Services;
using Moq;

namespace CinemaTests.Services.UserService
{
    public abstract class UserServiceTest
    {

        protected Mock<ITokenProvider> TokenProviderMock;
        protected Mock<IEncrypter> EncrypterMock;
        protected IMapper Mapper;
        protected IUserService UserService;
        protected User User;

        protected void SetUp(CinemaDbContext cinemaDbContext)
        {
            User = new User("test123@o2.pl", "FirstName", "LastName", "Secret123", "user");
            TokenProviderMock = new Mock<ITokenProvider>();
            EncrypterMock = new Mock<IEncrypter>();
            Mapper = AutoMapperConfig.Initialize();
            UserService = new Cinema.Services.UserService(cinemaDbContext, EncrypterMock.Object, TokenProviderMock.Object,Mapper);
        }
    }
}
