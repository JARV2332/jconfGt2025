using Microsoft.EntityFrameworkCore;
using TareasApi.Models;

namespace TareasApi.Data;

public class TareasDbContext : DbContext
{
    public TareasDbContext(DbContextOptions<TareasDbContext> options) 
        : base(options)
    {
    }

    public DbSet<Tarea> Tareas { get; set; }
}
