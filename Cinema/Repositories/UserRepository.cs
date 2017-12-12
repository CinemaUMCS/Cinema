using System;
using System.Linq;
using System.Threading.Tasks;
using cinema.Entities;
using Cinema.Data;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly CinemaDbContext _context;

        public UserRepository(CinemaDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(User user)
        {
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<User> GetByEmailAsync(string email)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
            return user;
        }
    }
}