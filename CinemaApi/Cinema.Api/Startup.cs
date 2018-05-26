using System.Text;
using Cinema.Data;
using Cinema.Middleware;
using Cinema.Services;
using Cinema.Services.Interfaces;
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
      services.AddScoped<IRatingService,RatingService>();

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
      app.UseAuthentication()
        .UseMiddleware(typeof(ExceptionMiddleware))
        .UseMvc();
    }
  }
}
