using SimpleCrypto;

namespace Cinema.Services
{
  public class EncrypterService : IEncrypter
  {
    private readonly SimpleCrypto.ICryptoService _simpleCrypto;

    public EncrypterService()
    {
      _simpleCrypto = new PBKDF2();
    }

    public string GenerateSalt()
    {
      return _simpleCrypto.GenerateSalt();
    }

    public string Compute(string textToHash, string salt)
    {
      return _simpleCrypto.Compute(textToHash, salt);
    }

    public bool Compare(string passwordHash1, string passwordHash2)
    {
      return _simpleCrypto.Compare(passwordHash1, passwordHash2);
    }
  }
}
