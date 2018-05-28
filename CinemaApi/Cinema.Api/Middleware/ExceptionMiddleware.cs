using System;
using System.Net;
using System.Threading.Tasks;
using Cinema.Exceptions;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Cinema.Middleware
{
  public class ExceptionMiddleware
  {
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
      try
      {
        await _next(context);
      }
      catch (Exception ex)
      {
        await HandleExceptionAsync(context, ex);
      }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
      int status;
      if (typeof(Exception) == typeof(UnauthorizedAccessException))
        status = (int) HttpStatusCode.Unauthorized;
      else
        status = (int) HttpStatusCode.InternalServerError;

      var errorCode = "error";
      if (exception is CinemaException cinemaException)
        errorCode = cinemaException.ErrorCode;
      var result = JsonConvert.SerializeObject(new
      {
        errorCode=errorCode,
        message = exception.Message
      });

      context.Response.ContentType = "application/json";
      context.Response.StatusCode = status;
      return context.Response.WriteAsync(result);
    }
  }
}
