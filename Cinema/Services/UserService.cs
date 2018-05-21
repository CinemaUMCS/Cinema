using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Exceptions;
using Cinema.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography;
using Cinema.Request;

namespace Cinema.Services
{
  public class UserService : IUserService
  {
    private readonly ITokenProvider _tokenProvider;
    private readonly IEncrypter _encrypter;
    private readonly IMapper _mapper;
    private readonly CinemaDbContext _dbContext;
    private readonly IMemoryCache _memoryCache;
    private readonly IEmailSender _emailSender;

    public UserService(CinemaDbContext dbContext, IEncrypter encrypter, ITokenProvider tokenProvider,
      IMapper mapper, IMemoryCache memoryCache, IEmailSender emailSender)
    {
      _dbContext = dbContext;
      _tokenProvider = tokenProvider;
      this._encrypter = encrypter;
      _mapper = mapper;
      _memoryCache = memoryCache;
      this._emailSender = emailSender;
    }

    public async Task RegisterAsync(string email, string firstName, string lastName, string password, string role)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
      if (user != null)
        throw new CinemaException(ErrorCodes.EmailOccupied);
      user = new User(email, firstName, lastName, password, role);
      await _dbContext.Users.AddAsync(user);
      await _dbContext.SaveChangesAsync();

      user = await _dbContext.Users.SingleOrDefaultAsync(x => x.Email == email);
      SendConfirmTokenAsync(user.Id);

    }
    public async Task<TokenModel> LoginAsync(string email, string password)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
      if (user == null)
        throw new CinemaException(ErrorCodes.InvalidCredentials);
      var generatedHash = _encrypter.Compute(password, user.Salt);
      if (!_encrypter.Compare(generatedHash, user.Password))
        throw new CinemaException(ErrorCodes.InvalidCredentials);
      if (user.IsConfirmed == false)
        throw new CinemaException(ErrorCodes.NotActivated);
      var token = _tokenProvider.CreateToken(user.Id, user.Role);
      return token;
    }
    public async Task ChangePassword(int userId, string oldPassword, string newPassword)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
      var hash = _encrypter.Compute(oldPassword, user.Salt);
      if (!_encrypter.Compare(hash, user.Password))
        throw new CinemaException(ErrorCodes.InvalidCredentials);
      user.SetPassword(newPassword);
      _dbContext.Users.Update(user);
      await _dbContext.SaveChangesAsync();
    }
    public async Task SendConfirmTokenAsync(int userId)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
      if (user == null)
        throw new CinemaException(ErrorCodes.InvalidUser);
      if (user.IsConfirmed)
        throw new CinemaException(ErrorCodes.InvalidAction, "User already activated.");
      var confirmToken = RandomString(8);
      var expiresTime = DateTime.UtcNow.AddHours(1);
      _memoryCache.Set($"confirm-{userId}", confirmToken, expiresTime);

      var activateLink=$"http://localhost:4200/account/validate_token/{userId}/{confirmToken}";
      await _emailSender.SendEmailAsync(user.Email, "Link potwierdzający [CinemaUMCS]",
          $"Aby aktywować konto, kliknij na link: \"{activateLink}\"." +
          $"\nLink jest wazny do {expiresTime.ToLocalTime():g}");
    }
    public async Task ValidateConfirmTokenAsync(int userId, string token)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
      if (user == null)
        throw new CinemaException(ErrorCodes.InvalidUser);
      var validToken = _memoryCache.Get<string>($"confirm-{userId}");
      if (validToken == null)
        throw new CinemaException(ErrorCodes.InvalidToken);
      if (validToken != token)
        throw new CinemaException(ErrorCodes.TokenExpired);
      user.ConfirmEmail();
      await _dbContext.SaveChangesAsync();
      _memoryCache.Remove($"confirm-{userId}");
    }
    public async Task<UserDto> GetByIdAsync(int id)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
      return _mapper.Map<User, UserDto>(user);
    }
    public async Task<UserDto> GetByEmailAsync(string email)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
      return _mapper.Map<User, UserDto>(user);
    }

    public async Task ResetPasswordAsync(string userEmail)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email==userEmail);
      if(user==null)
        throw new CinemaException(ErrorCodes.InvalidUser);
      string newPassword=RandomString(7);
      user.SetPassword(newPassword);
      _dbContext.Users.Update(user);
      await _dbContext.SaveChangesAsync();

      _emailSender.SendEmailAsync(user.Email, "Nowe hasło [CinemaUMCS]",
          $"Twoje nowe hasło to: \"{newPassword}\".");

    }
    private string RandomString(uint length)
    {
      const string chars = "ABCDEFGHIJKLMNOPRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const string numbers="0123456789";
      const string upper="ABCDEFGHIJKLMNOPRSTUVWXYZ";
      var random = new Random();
      string randomLowers= new string(Enumerable.Repeat(chars, (int)length-2)
          .Select(s => s[random.Next(s.Length)]).ToArray());
      string randomUppers= new string(Enumerable.Repeat(upper, 1)
          .Select(s => s[random.Next(s.Length)]).ToArray());
      string randomNumber = new string(Enumerable.Repeat(numbers, 1)
          .Select(s => s[random.Next(s.Length)]).ToArray());
      return $"{randomLowers}{randomUppers}{randomNumber}";

    }

    public async Task UpdateUser(int userId,UpdateUser updateUser)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id==userId);
      if (user == null)
        throw new CinemaException(ErrorCodes.InvalidUser);
      if(updateUser.Email!=null)
        user.SetEmail(updateUser.Email);
      if (updateUser.FirstName != null)
        user.SetFirstName(updateUser.FirstName);
      if (updateUser.LastName != null)
        user.SetLastName(updateUser.LastName);
      if (updateUser.PhoneNumber != null)
        user.SetPhoneNumber(updateUser.PhoneNumber);
      _dbContext.Users.Update(user);
      await _dbContext.SaveChangesAsync();
    }
  }
}
