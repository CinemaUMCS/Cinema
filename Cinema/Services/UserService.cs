using System;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Entities;
using Cinema.Repositories;
using SimpleCrypto;

namespace Cinema.Services
{
    public class UserService : IUserService
    {
        private readonly ICryptoService _cryptoService;
        private readonly ITokenProvider _tokenProvider;
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository, ICryptoService cryptoService, ITokenProvider tokenProvider)
        {
            _userRepository = userRepository;
            _cryptoService = cryptoService;
            _tokenProvider = tokenProvider;
        }

        public async Task RegisterAsync(string email, string firstName, string lastName, string password, string role)
        {
            if (await _userRepository.GetByEmailAsync(email) != null)
                throw new Exception("User with this email already exist.");

            var salt = _cryptoService.GenerateSalt();
            var hashPassword = _cryptoService.Compute(password, salt);
            var user = new User(email, firstName, lastName,
                hashPassword, salt, "user");
            await _userRepository.AddAsync(user);
        }

        public async Task<TokenModel> LoginAsync(string email, string password)
        {
            var user = await _userRepository.GetByEmailAsync(email);
            if (user == null)
                throw new Exception("InvalidCredentials");
            var generatedHash = _cryptoService.Compute(password, user.Salt);
            if (!_cryptoService.Compare(generatedHash, user.Password))
                throw new Exception("InvalidCredentials");
            var token = _tokenProvider.CreateToken(user.Id, user.Role);
            return token;
        }
    }
}