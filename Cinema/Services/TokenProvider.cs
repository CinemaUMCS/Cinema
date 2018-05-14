using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Cinema.Entities;
using Cinema.Extensions;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Cinema.Services
{
  public class TokenProvider : ITokenProvider
  {
    private readonly IConfiguration _configuration;

    public TokenProvider(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public TokenModel CreateToken(int userId, string role)
    {
      var key = _configuration["Jwt:Key"];
      var symetricKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
      var creds = new SigningCredentials(symetricKey, SecurityAlgorithms.HmacSha256);
      var claims = new[]
      {
        new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
        new Claim(ClaimTypes.Role, role)
      };
      DateTime expires = DateTime.UtcNow.AddDays(1);
      var token = new JwtSecurityToken(
        claims: claims,
        expires: expires,
        signingCredentials: creds,
        notBefore: DateTime.UtcNow
      );
      return new TokenModel()
      {
        Token = new JwtSecurityTokenHandler().WriteToken(token),
        Role = role,
        Expires = expires.ToTimestamp()
      };
    }
  }
}
