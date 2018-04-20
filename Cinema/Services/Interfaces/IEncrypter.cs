namespace Cinema.Services
{
  public interface IEncrypter
  {
    string GenerateSalt();
    string Compute(string textToHash, string salt);
    bool Compare(string passwordHash1, string passwordHash2);
  }
}
