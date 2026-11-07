using Microsoft.EntityFrameworkCore;
using TareasApi.Data;
using TareasApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure Entity Framework with In-Memory database
builder.Services.AddDbContext<TareasDbContext>(options =>
    options.UseInMemoryDatabase("TareasDb"));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// Seed initial data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TareasDbContext>();
    if (!context.Tareas.Any())
    {
        context.Tareas.AddRange(
            new Tarea { Id = 1, Titulo = "Aprender ASP.NET Core", Completada = true },
            new Tarea { Id = 2, Titulo = "Configurar Entity Framework", Completada = true },
            new Tarea { Id = 3, Titulo = "Crear API REST", Completada = false }
        );
        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
