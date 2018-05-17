using System.Text;
using Cinema.Data;
using Cinema.Middleware;
using Cinema.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace Cinema
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      var connectionString = Configuration["Sql:ConnectionString"];
      services.AddDbContext<CinemaDbContext>(options =>
          options.UseSqlServer(connectionString));

      var jwtKey = Configuration["Jwt:Key"];
      services.AddAuthentication(options => { options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
        .AddJwtBearer(o =>
        {
          o.TokenValidationParameters = new TokenValidationParameters()
          {
            ValidateIssuerSigningKey = true,
            ValidateAudience = false,
            ValidateIssuer = false,
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
          };
        });
      services.AddMemoryCache();

      services.AddScoped<IUserService, UserService>();
      services.AddScoped<ISeanceService, SeanceService>();
      services.AddScoped<IReservationService, ReservationService>();
      services.AddScoped<IMovieService, MovieService>();
      services.AddScoped<IRoomService, RoomService>();
      services.AddScoped<IEmailSender, EmailSender>();

      services.AddScoped<IEncrypter, EncrypterService>();
      services.AddScoped<ITokenProvider, TokenProvider>();
      services.AddSingleton(AutoMapperConfig.Initialize());
      services.AddMvc()
        .AddJsonOptions(options =>
          options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());


      //Angular
      //app.Use(async (context, next) =>
      //{
      //  await next();
      //  if (context.Response.StatusCode == 404 && !System.IO.Path.HasExtension(context.Request.Path.Value))
      //  {
      //    context.Request.Path = "/index.html";
      //    await next();
      //  }
      //});
      //app.UseDefaultFiles();
      //app.UseStaticFiles();
      using (var serviceScope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
      {
        var context = serviceScope.ServiceProvider.GetService<CinemaDbContext>();
        context.Database.Migrate();
      }
      app.UseAuthentication()
        .UseMiddleware(typeof(ExceptionMiddleware))
        .UseMvc();
    }
  }
}
