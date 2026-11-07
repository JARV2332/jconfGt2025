using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using TareasApi.Controllers;
using TareasApi.Data;
using TareasApi.Models;
using Xunit;

namespace TareasApi.Tests;

public class TareasControllerTests
{
    private TareasDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<TareasDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;
        return new TareasDbContext(options);
    }

    private ILogger<TareasController> CreateLogger()
    {
        return LoggerFactory.Create(builder => builder.AddConsole())
            .CreateLogger<TareasController>();
    }

    [Fact]
    public async Task GetTareas_ReturnsAllTareas()
    {
        // Arrange
        using var context = CreateContext();
        context.Tareas.AddRange(
            new Tarea { Id = 1, Titulo = "Tarea 1", Completada = false },
            new Tarea { Id = 2, Titulo = "Tarea 2", Completada = true }
        );
        await context.SaveChangesAsync();

        var controller = new TareasController(context, CreateLogger());

        // Act
        var result = await controller.GetTareas();

        // Assert
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count());
    }

    [Fact]
    public async Task GetTarea_ReturnsCorrectTarea()
    {
        // Arrange
        using var context = CreateContext();
        var tarea = new Tarea { Id = 1, Titulo = "Test Tarea", Completada = false };
        context.Tareas.Add(tarea);
        await context.SaveChangesAsync();

        var controller = new TareasController(context, CreateLogger());

        // Act
        var result = await controller.GetTarea(1);

        // Assert
        Assert.NotNull(result.Value);
        Assert.Equal("Test Tarea", result.Value.Titulo);
    }

    [Fact]
    public async Task PostTarea_CreatesTarea()
    {
        // Arrange
        using var context = CreateContext();
        var controller = new TareasController(context, CreateLogger());
        var newTarea = new Tarea { Titulo = "Nueva Tarea", Completada = false };

        // Act
        var result = await controller.PostTarea(newTarea);

        // Assert
        Assert.NotNull(result);
        Assert.True(newTarea.Id > 0);
        Assert.Equal("Nueva Tarea", newTarea.Titulo);
        Assert.Single(context.Tareas);
    }

    [Fact]
    public async Task GetTareasCompletadas_ReturnsOnlyCompletedTareas()
    {
        // Arrange
        using var context = CreateContext();
        context.Tareas.AddRange(
            new Tarea { Id = 1, Titulo = "Completada 1", Completada = true },
            new Tarea { Id = 2, Titulo = "Pendiente", Completada = false },
            new Tarea { Id = 3, Titulo = "Completada 2", Completada = true }
        );
        await context.SaveChangesAsync();

        var controller = new TareasController(context, CreateLogger());

        // Act
        var result = await controller.GetTareasCompletadas();

        // Assert
        Assert.NotNull(result.Value);
        Assert.Equal(2, result.Value.Count());
        Assert.All(result.Value, t => Assert.True(t.Completada));
    }
}
