using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Configuration;

namespace Cinema.Services
{
  public class EmailSender : IEmailSender
  {
    private string _email;
    private string _host;
    private bool _enableSsl;
    private int _port;
    private int _timeout;
    private string _password;

    public EmailSender(IConfiguration config)
    {
      _email = config["Email:email"];
      _host = config["Email:host"];
      _enableSsl = bool.Parse(config["Email:enableSsl"]);
      _port = int.Parse(config["Email:port"]);
      _timeout = int.Parse(config["Email:timeout"]);
      _password = config["Email:password"];
    }

    public async Task SendEmailAsync(string receiver, string subject, string body)
    {
      var client = GetSmtpClient();
      var mailMessage = new MailMessage
      {
        From = new MailAddress(_email),
        To = { receiver },
        Subject = subject,
        Body = body
      };
      try
      {
        await client.SendMailAsync(mailMessage);
      }
      catch (Exception ex)
      {
        Console.WriteLine(ex.Message);
      }
      finally
      {
        client.Dispose();
      }
    }

    private SmtpClient GetSmtpClient()
    {
      return new SmtpClient
      {
        Host = _host,
        EnableSsl = _enableSsl,
        Port = _port,
        Timeout = _timeout,
        DeliveryMethod = SmtpDeliveryMethod.Network,
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(_email, _password)
      };
    }

  }
}
