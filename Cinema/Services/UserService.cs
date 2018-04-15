using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AutoMapper;
using Cinema.Entities;
using Cinema.DTO;
using Cinema.Exceptions;
using Cinema.Repositories;

namespace Cinema.Services
{
  public class UserService : IUserService
    {
        private readonly IEncrypter _encrypter;
        private readonly ITokenProvider _tokenProvider;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, IEncrypter encrypter, ITokenProvider tokenProvider, IMapper mapper)
        {
            _userRepository = userRepository;
            _encrypter = encrypter;
            _tokenProvider = tokenProvider;
            _mapper = mapper;
        }

        public async Task RegisterAsync(string email, string firstName, string lastName, string password, string role)
        {
            bool emailIsValid = new EmailAddressAttribute().IsValid(email);
            if(!emailIsValid)
                throw new InvalidEmail("Given email is not valid.");
            if (await _userRepository.GetByEmailAsync(email) != null)
                throw new InvalidEmail("User with this email already exist.");
            if(!RoleIsValid(role))
                throw new InvalidRole();
            if(!PasswordIsValid(password))
                throw new InvalidPassword("You're password should contain at least six characters within number, upper case letter and lower case letter.");

            var salt = _encrypter.GenerateSalt();
            var hashPassword = _encrypter.Compute(password, salt);
            var user = new User(email, firstName, lastName,
                hashPassword, salt, "user");
            await _userRepository.AddAsync(user);

        }

        private bool RoleIsValid(string role)
        {
            if (role == "user")
                return true;
            if (role == "admin")
                return true;
            return false;
        }

        private bool PasswordIsValid(string password)
        {
            if (password.Length < 6)
                return false;
            var lower = new Regex("(.*[a-z].*)");
            if (!lower.Match(password).Success)
                return false;
            var upper= new Regex("(.*[A-Z].*)");
            if (!upper.Match(password).Success)
                return false;
            var number= new Regex("(.*[0-9].*)");
            if (!number.Match(password).Success)
                return false;
            return true;


        }

        public async Task<TokenModel> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
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
            var user= await _userRepository.GetByIdAsync(id);
            return _mapper.Map<User, UserDto>(user);
        }
    }
}
