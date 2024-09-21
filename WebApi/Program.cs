using wakacyjny_last.Application.Interfaces;
using wakacyjny_last.Infrastructure.Context;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using wakacyjny_last.Domain.Models;
using wakacyjny_last.Application.Interfaces.User;
using wakacyjny_last.Application.Services.User;
using wakacyjny_last.Domain.Email;
using wakacyjny_last.Application.Interfaces.EmailConfirmation;
using wakacyjny_last.Application.Services.EmailConfirmationHandle;
using wakacyjny_last.Application.Services;
using wakacyjny_last.Infrastructure.Repositories;
namespace WebApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddHttpContextAccessor();

            builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DbContext")));

            builder.Services.AddControllers();

            builder.Services.AddEndpointsApiExplorer();

            builder.Services.AddAuthentication(options =>
            {
                options.DefaultScheme = IdentityConstants.ApplicationScheme;
                options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
            })
            .AddCookie(IdentityConstants.ApplicationScheme).AddBearerToken(IdentityConstants.BearerScheme);

            builder.Services.AddIdentityCore<User>().AddRoles<IdentityRole>().AddEntityFrameworkStores<AppDbContext>().AddApiEndpoints();

            builder.Services.AddAuthorization();


            builder.Services.AddScoped<PostsRepository>();

            builder.Services.AddScoped<IUserDataService, UserDataService>();

            builder.Services.AddTransient<IEmailService, EmailService>();

            builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            builder.Services.AddSwaggerGen(o =>
            {
                o.CustomSchemaIds(s =>
                {
                    var name = s.FullName;
                    if (name != null)
                    {
                        name = name.Replace("+", "_");
                    }
                    return name;
                });
            });

            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowSpecificOrigin");
            app.MyMapIdentityApi<User>();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseHttpsRedirection();
            app.MapControllers();
            app.Run();
        }
    }
}