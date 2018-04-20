using System;
using Cinema.Entities;

namespace Cinema.Services
{
  public interface ITokenProvider
  {
    TokenModel CreateToken(int userId, string role);
  }
}
