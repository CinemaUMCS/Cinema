using System.Text;
using Cinema.Data;
using Cinema.Repositories;
using Cinema.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
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
      services.AddAuthentication(options =>
      {
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
      }).AddJwtBearer(o =>
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


      services.AddScoped<IUserService, UserService>();
      services.AddScoped<IShowService, ShowService>();
      services.AddScoped<IReservationService, ReservationService>();
      services.AddScoped<IMovieService, MovieService>();

      services.AddScoped<IUserRepository, UserRepository>();
      services.AddScoped<IShowRepository, ShowRepository>();
      services.AddScoped<IReservationRepository, ReservationRepository>();
      services.AddScoped<IMovieRepository, MovieRepository>();

      services.AddScoped<IEncrypter, EncrypterService>();
      services.AddScoped<ITokenProvider, TokenProvider>();

      //services.AddCors(options =>
      //{
      //  options.AddPolicy("AllowAng", p =>
      //  {
      //    p.WithOrigins("http://localhost:4200")
      //    .AllowAnyHeader()
      //    .AllowAnyMethod()
      //    .AllowCredentials();
      //  });
      //});

      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      //app.UseCors(options => options.WithOrigins("http://localhost:4200").AllowAnyHeader().AllowAnyMethod().AllowCredentials());
      //app.UseCors("AllowAng");
      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404 && !System.IO.Path.HasExtension(context.Request.Path.Value))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });
      app.UseDefaultFiles();
      app.UseStaticFiles();
      
      app.UseAuthentication()
          .UseMvc();

    }
  }
}
