using Api.Configurations;
using Api.DTO;
using Api.Services;
using Api.Services.Interfaces;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAngularApp", policy => {
        policy.WithOrigins("http://localhost:4200")
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

// Add services to the container.
builder.Services.Configure<RickAndMortyOptions>(
    builder.Configuration.GetSection("RickAndMortyApi")
);

builder.Services.AddScoped<ICharacterService, CharacterService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<IEpisodeService, EpisodeService>();

builder.Services.AddHttpClient<CharacterService>();
builder.Services.AddHttpClient<LocationService>();
builder.Services.AddHttpClient<EpisodeService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors("AllowAngularApp");
app.UseAuthorization();

app.MapControllers();

app.Run();
