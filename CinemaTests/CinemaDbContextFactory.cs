using System;
using System.Data.Common;
using Cinema.Data;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace CinemaTests
{
    public class CinemaDbContextFactory : IDisposable
    {
        private DbConnection _connection;

        private DbContextOptions<CinemaDbContext> CreateOptions()
        {
            return new DbContextOptionsBuilder<CinemaDbContext>()
                .UseSqlite(_connection).Options;
        }

        public CinemaDbContext CreateContext()
        {
            if (_connection == null)
            {
                _connection = new SqliteConnection("DataSource=:memory:");
                _connection.Open();

                var options = CreateOptions();
                using (var context = new CinemaDbContext(options))
                {
                    context.Database.EnsureCreated();
                }
            }

            return new CinemaDbContext(CreateOptions());
        }

        public void Dispose()
        {
            if (_connection != null)
            {
                _connection.Dispose();
                _connection = null;
            }
        }
    }
}