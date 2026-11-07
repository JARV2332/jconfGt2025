export const codeSamples = {
  model: {
    dotnet: `public class Tarea
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public bool Completada { get; set; }
}`,
    java: `@Entity
public class Tarea {
    @Id
    @GeneratedValue
    private Long id;
    private String titulo;
    private boolean completada;
    
    // getters y setters
}`
  },
  
  controller: {
    dotnet: `[ApiController]
[Route("api/[controller]")]
public class TareasController {
    private readonly TareasDbContext _context;
    private readonly ILogger<TareasController> _logger;
    
    public TareasController(
        TareasDbContext context,
        ILogger<TareasController> logger) {
        _context = context;
        _logger = logger;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Tarea>>>
        GetTareas() {
        _logger.LogInformation("Obteniendo tareas");
        return await _context.Tareas.ToListAsync();
    }
}`,
    java: `@RestController
@RequestMapping("/api/tareas")
public class TareaController {
    private static final Logger logger = 
        LoggerFactory.getLogger(TareaController.class);
    
    @Autowired
    private TareaRepository tareaRepository;
    
    @GetMapping
    public List<Tarea> getAllTareas() {
        logger.info("Obteniendo tareas");
        return tareaRepository.findAll();
    }
}`
  },
  
  di: {
    dotnet: `// Program.cs
builder.Services.AddDbContext<TareasDbContext>(
    options => options.UseInMemoryDatabase("TareasDb")
);

builder.Services.AddControllers();
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
    );
});`,
    java: `// DataInitializer.java
@Configuration
public class DataInitializer {
    @Bean
    CommandLineRunner initDatabase(
        TareaRepository repository) {
        return args -> {
            repository.save(
                new Tarea("Tarea 1", false)
            );
        };
    }
}`
  },
  
  config: {
    dotnet: `// appsettings.json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "TareasApi": "Information"
    }
  },
  "AppSettings": {
    "NombreAplicacion": "API de Tareas .NET"
  }
}`,
    java: `# application.yml
spring:
  application:
    name: API de Tareas Java
  datasource:
    url: jdbc:h2:mem:tareasdb
  jpa:
    hibernate:
      ddl-auto: create-drop

logging:
  level:
    com.jconf.tareasapi: INFO`
  },
  
  database: {
    dotnet: `public class TareasDbContext : DbContext
{
    public TareasDbContext(
        DbContextOptions<TareasDbContext> options)
        : base(options) { }
    
    public DbSet<Tarea> Tareas { get; set; }
}

// Uso con LINQ
var completadas = await _context.Tareas
    .Where(t => t.Completada)
    .ToListAsync();`,
    java: `@Repository
public interface TareaRepository 
    extends JpaRepository<Tarea, Long> {
    List<Tarea> findByCompletada(boolean completada);
}

// Uso con Streams
List<Tarea> completadas = 
    tareaRepository.findByCompletada(true);`
  },
  
  filter: {
    dotnet: `// LINQ Query
var completadas = await _context.Tareas
    .Where(t => t.Completada)
    .OrderBy(t => t.Titulo)
    .Select(t => new {
        t.Id,
        t.Titulo,
        Estado = "Completada"
    })
    .ToListAsync();`,
    java: `// Java Streams
List<TareaDto> completadas = tareas.stream()
    .filter(t -> t.isCompletada())
    .sorted(comparing(Tarea::getTitulo))
    .map(t -> new TareaDto(
        t.getId(),
        t.getTitulo(),
        "Completada"
    ))
    .collect(toList());`
  },
  
  testing: {
    dotnet: `[Fact]
public async Task GetTareas_ReturnsAllTareas() {
    // Arrange
    var context = CreateContext();
    context.Tareas.AddRange(
        new Tarea { Titulo = "T1" },
        new Tarea { Titulo = "T2" }
    );
    await context.SaveChangesAsync();
    var controller = new TareasController(
        context, CreateLogger()
    );
    
    // Act
    var result = await controller.GetTareas();
    
    // Assert
    Assert.Equal(2, result.Value.Count());
}`,
    java: `@Test
void getAllTareas_ReturnsAllTareas() {
    // Arrange
    List<Tarea> tareas = Arrays.asList(
        new Tarea("T1", false),
        new Tarea("T2", true)
    );
    when(tareaRepository.findAll())
        .thenReturn(tareas);
    
    // Act
    List<Tarea> result = 
        tareaController.getAllTareas();
    
    // Assert
    assertEquals(2, result.size());
    verify(tareaRepository, times(1)).findAll();
}`
  }
};
