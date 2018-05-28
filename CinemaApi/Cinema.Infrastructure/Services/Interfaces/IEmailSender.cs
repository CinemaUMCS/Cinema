using System.Threading.Tasks;

namespace Cinema.Services
{
  public interface IEmailSender
  {
    Task SendEmailAsync(string receiver, string subject, string body);
  }
}
