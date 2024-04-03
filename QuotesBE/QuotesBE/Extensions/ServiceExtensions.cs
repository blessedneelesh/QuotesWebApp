
using Contracts;
using LoggerService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Repository;
using Repository.Models.DataLayer;
using Service;
using Service.Contracts;

namespace QuotesBE.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services) =>
    services.AddCors(options =>
    {
        options.AddPolicy("CorsPolicy", builder =>
                builder.AllowAnyOrigin().
                WithExposedHeaders("X-Pagination").
                AllowAnyMethod().
                AllowAnyHeader());
    });



        public static void ConfigureLoggerService(this IServiceCollection services) => 
            services.AddSingleton<ILoggerManager, LoggerManager>();


        public static void ConfigureRepositoryManager(this IServiceCollection services) =>
        services.AddScoped<IRepositoryManager, RepositoryManager>();

        public static void ConfigureServiceManager(this IServiceCollection services) =>
            services.AddScoped<IServiceManager, ServiceManager>();

        // Identity

/*        public static void ConfigureIdentity(this IServiceCollection services)=>
            services.AddIdentity<IdentityUser, IdentityRole>(options => {
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            }).AddEntityFrameworkStores<QuotesContext>() //added addRoles by neelesh
 .AddDefaultTokenProviders();*/




    }
}
