using Microsoft.EntityFrameworkCore;
using NLog;
using QuotesBE.Extensions;
using Repository;
using Repository.Models.DataLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

LogManager.LoadConfiguration(string.Concat(Directory.GetCurrentDirectory(), "/nlog.config"));



builder.Services.ConfigureLoggerService();

builder.Services.ConfigureCors();
builder.Services.AddControllers().AddApplicationPart(typeof(Presentation.AssemblyReference).Assembly);

builder.Services.AddDbContext<QuotesContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("QuoteContext"),
    sqlServerOptionsAction: sqlOptions => // by neelesh transient failure because of no db.
    {
        sqlOptions.EnableRetryOnFailure();
    }));

builder.Services.ConfigureRepositoryManager();
builder.Services.ConfigureServiceManager();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
