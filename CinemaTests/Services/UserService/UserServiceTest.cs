using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Cinema.Data;
using Cinema.Entities;
using Cinema.Services;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Moq;

namespace CinemaTests.Services.UserService
{
    public abstract class UserServiceTest
    {

        protected Mock<ITokenProvider> TokenProviderMock;
        protected Mock<IEncrypter> EncrypterMock;
        protected IMapper Mapper;
        protected MemoryCache MemoryCache;
        protected Mock<IEmailSender> EmailSenderMock;
        protected IUserService UserService;
        protected User User;

        protected void SetUp(CinemaDbContext cinemaDbContext)
        {
            User = new User("test123@o2.pl", "FirstName", "LastName", "Secret123", "user");
            TokenProviderMock = new Mock<ITokenProvider>();
            EncrypterMock = new Mock<IEncrypter>();
            Mapper = AutoMapperConfig.Initialize();
            MemoryCache=new MemoryCache(new MemoryCacheOptions());
            var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            EmailSenderMock=new Mock<IEmailSender>();
            UserService = new Cinema.Services.UserService(cinemaDbContext, EncrypterMock.Object, TokenProviderMock.Object,Mapper,MemoryCache,EmailSenderMock.Object);
        }
    }
}
