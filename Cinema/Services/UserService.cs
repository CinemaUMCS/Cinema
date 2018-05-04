using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Exceptions;
using Cinema.Repositories;
using Cinema.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
  public class UserService : IUserService
  {
    private readonly ITokenProvider _tokenProvider;
    private readonly IEncrypter _encrypter;
    private readonly IMapper _mapper;
    private readonly CinemaDbContext _dbContext;

    public UserService(CinemaDbContext dbContext, IEncrypter encrypter, ITokenProvider tokenProvider, 
      IMapper mapper)
    {
      _dbContext = dbContext;
      _tokenProvider = tokenProvider;
      this._encrypter = encrypter;
      _mapper = mapper;
    }

    public async Task RegisterAsync(string email, string firstName, string lastName, string password, string role)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
      if (user!=null)
        throw new InvalidEmail("User with this email already exist.");
      user = new User(email, firstName, lastName, password, role);
      await _dbContext.Users.AddAsync(user);
    }
    public async Task<TokenModel> LoginAsync(string email, string password)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
      if (user == null)
        throw new InvalidCredentials();
      var generatedHash = _encrypter.Compute(password, user.Salt);
      if (!_encrypter.Compare(generatedHash, user.Password))
        throw new InvalidCredentials();
      var token = _tokenProvider.CreateToken(user.Id, user.Role);
      return token;
    }
    public async Task<UserDto> GetByIdAsync(int id)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
      return _mapper.Map<User, UserDto>(user);
    }
  }
}
