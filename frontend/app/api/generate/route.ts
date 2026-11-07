import { NextRequest } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const FALLBACK_EXAMPLES: Record<string, { dotnet: string; java: string; explanation: string }> = {
  "notas de estudiante": {
    dotnet: `// Modelo
public class NotaEstudiante
{
    public int Id { get; set; }
    public string NombreEstudiante { get; set; } = string.Empty;
    public string Materia { get; set; } = string.Empty;
    public decimal Calificacion { get; set; }
    public DateTime Fecha { get; set; }
}

// DbContext
public class NotasDbContext : DbContext
{
    public NotasDbContext(DbContextOptions<NotasDbContext> options) 
        : base(options) { }
    
    public DbSet<NotaEstudiante> Notas { get; set; }
}

// Controller
[ApiController]
[Route("api/[controller]")]
public class NotasController : ControllerBase
{
    private readonly NotasDbContext _context;
    
    public NotasController(NotasDbContext context)
    {
        _context = context;
    }
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<NotaEstudiante>>> GetNotas()
    {
        return await _context.Notas.ToListAsync();
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult<NotaEstudiante>> GetNota(int id)
    {
        var nota = await _context.Notas.FindAsync(id);
        return nota == null ? NotFound() : nota;
    }
    
    [HttpPost]
    public async Task<ActionResult<NotaEstudiante>> PostNota(NotaEstudiante nota)
    {
        _context.Notas.Add(nota);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetNota), new { id = nota.Id }, nota);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> PutNota(int id, NotaEstudiante nota)
    {
        if (id != nota.Id) return BadRequest();
        
        _context.Entry(nota).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteNota(int id)
    {
        var nota = await _context.Notas.FindAsync(id);
        if (nota == null) return NotFound();
        
        _context.Notas.Remove(nota);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}`,
    java: `// Entidad
@Entity
@Table(name = "notas")
public class NotaEstudiante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombreEstudiante;
    private String materia;
    private BigDecimal calificacion;
    private LocalDateTime fecha;
    
    // Constructors, getters y setters
    public NotaEstudiante() {}
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getNombreEstudiante() { return nombreEstudiante; }
    public void setNombreEstudiante(String nombre) { this.nombreEstudiante = nombre; }
    
    public String getMateria() { return materia; }
    public void setMateria(String materia) { this.materia = materia; }
    
    public BigDecimal getCalificacion() { return calificacion; }
    public void setCalificacion(BigDecimal cal) { this.calificacion = cal; }
    
    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }
}

// Repository
@Repository
public interface NotaEstudianteRepository 
    extends JpaRepository<NotaEstudiante, Long> {
    List<NotaEstudiante> findByNombreEstudiante(String nombre);
}

// Controller
@RestController
@RequestMapping("/api/notas")
@CrossOrigin(origins = "*")
public class NotaController {
    @Autowired
    private NotaEstudianteRepository repository;
    
    @GetMapping
    public List<NotaEstudiante> getAllNotas() {
        return repository.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<NotaEstudiante> getNotaById(@PathVariable Long id) {
        return repository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<NotaEstudiante> createNota(@RequestBody NotaEstudiante nota) {
        NotaEstudiante saved = repository.save(nota);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<NotaEstudiante> updateNota(
        @PathVariable Long id, 
        @RequestBody NotaEstudiante nota) {
        return repository.findById(id)
            .map(existing -> {
                existing.setNombreEstudiante(nota.getNombreEstudiante());
                existing.setMateria(nota.getMateria());
                existing.setCalificacion(nota.getCalificacion());
                existing.setFecha(nota.getFecha());
                return ResponseEntity.ok(repository.save(existing));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNota(@PathVariable Long id) {
        return repository.findById(id)
            .map(nota -> {
                repository.delete(nota);
                return ResponseEntity.noContent().<Void>build();
            })
            .orElse(ResponseEntity.notFound().build());
    }
}`,
    explanation: `**Diferencias principales:**

• **Modelo vs Entidad**: C# usa propiedades automáticas simples, Java usa anotaciones JPA (@Entity, @Id) y getters/setters explícitos.

• **Persistencia**: .NET usa DbContext con DbSet<T>, Java usa JpaRepository con métodos de consulta por convención.

• **Controller**: Ambos usan atributos/anotaciones similares para rutas. .NET prefiere async/await, Java comúnmente usa ResponseEntity para control de respuestas HTTP.

• **Tipos de datos**: decimal en C# vs BigDecimal en Java, DateTime vs LocalDateTime.`
  },
  "productos": {
    dotnet: `public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
}

[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;
    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
    {
        return await _context.Productos.ToListAsync();
    }
    
    [HttpPost]
    public async Task<ActionResult<Producto>> PostProducto(Producto producto)
    {
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProductos), new { id = producto.Id }, producto);
    }
}`,
    java: `@Entity
public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private BigDecimal precio;
    private Integer stock;
    
    // getters y setters
}

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {}

@RestController
@RequestMapping("/api/productos")
public class ProductoController {
    @Autowired
    private ProductoRepository repository;
    
    @GetMapping
    public List<Producto> getAll() {
        return repository.findAll();
    }
    
    @PostMapping
    public ResponseEntity<Producto> create(@RequestBody Producto producto) {
        return ResponseEntity.ok(repository.save(producto));
    }
}`,
    explanation: "Los conceptos son idénticos: modelo/entidad, repositorio/DbContext, controller REST. Java requiere más boilerplate (getters/setters) mientras C# es más conciso con propiedades."
  },
  "libros": {
    dotnet: `public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Autor { get; set; } = string.Empty;
    public string ISBN { get; set; } = string.Empty;
    public int Paginas { get; set; }
}`,
    java: `@Entity
public class Libro {
    @Id
    @GeneratedValue
    private Long id;
    private String titulo;
    private String autor;
    private String isbn;
    private Integer paginas;
}`,
    explanation: "Mismo patrón CRUD. La principal diferencia está en el ORM: EF Core usa convenciones implícitas, JPA usa anotaciones explícitas."
  },
  "citas médicas": {
    dotnet: `public class CitaMedica
{
    public int Id { get; set; }
    public string NombrePaciente { get; set; } = string.Empty;
    public string Doctor { get; set; } = string.Empty;
    public DateTime FechaHora { get; set; }
    public string Motivo { get; set; } = string.Empty;
}`,
    java: `@Entity
public class CitaMedica {
    @Id
    @GeneratedValue
    private Long id;
    private String nombrePaciente;
    private String doctor;
    private LocalDateTime fechaHora;
    private String motivo;
}`,
    explanation: "Ambos frameworks siguen el patrón MVC/API REST. Las diferencias son principalmente sintácticas y de convenciones de cada ecosistema."
  }
};

async function generateWithGroq(prompt: string): Promise<string> {
  if (!GROQ_API_KEY) throw new Error("No GROQ API key");

  const systemPrompt = `Eres un experto en ASP.NET Core y Spring Boot. Genera código equivalente para ambos frameworks basado en el prompt del usuario.

Formato de respuesta (IMPORTANTE - sigue este formato exactamente):

---DOTNET---
[código C# completo: modelo, DbContext si aplica, controller]
---JAVA---
[código Java completo: entidad, repository, controller]
---EXPLANATION---
[Explicación breve en español de las diferencias principales entre ambas implementaciones]

El código debe ser completo, funcional y seguir las mejores prácticas de cada framework.`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`Groq API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

async function generateWithOpenAI(prompt: string): Promise<string> {
  if (!OPENAI_API_KEY) throw new Error("No OpenAI API key");

  const systemPrompt = `Genera código equivalente en ASP.NET Core y Spring Boot. Formato:
---DOTNET---
[código C#]
---JAVA---
[código Java]
---EXPLANATION---
[explicación en español]`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}

function parseGeneratedCode(content: string): { dotnet: string; java: string; explanation: string } {
  const dotnetMatch = content.match(/---DOTNET---\s*([\s\S]*?)---JAVA---/);
  const javaMatch = content.match(/---JAVA---\s*([\s\S]*?)---EXPLANATION---/);
  const explanationMatch = content.match(/---EXPLANATION---\s*([\s\S]*?)$/);

  return {
    dotnet: dotnetMatch?.[1]?.trim() || "// Error al generar código .NET",
    java: javaMatch?.[1]?.trim() || "// Error al generar código Java",
    explanation: explanationMatch?.[1]?.trim() || "No se pudo generar la explicación.",
  };
}

function getFallbackExample(prompt: string): { dotnet: string; java: string; explanation: string; offline: boolean } {
  const normalizedPrompt = prompt.toLowerCase().trim();
  
  for (const [key, value] of Object.entries(FALLBACK_EXAMPLES)) {
    if (normalizedPrompt.includes(key) || key.includes(normalizedPrompt)) {
      return { ...value, offline: true };
    }
  }
  
  return { ...FALLBACK_EXAMPLES["notas de estudiante"], offline: true };
}

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return Response.json({ error: "Prompt inválido" }, { status: 400 });
    }

    let generatedContent: string;
    let offline = false;

    try {
      if (GROQ_API_KEY) {
        generatedContent = await generateWithGroq(prompt);
      } else if (OPENAI_API_KEY) {
        generatedContent = await generateWithOpenAI(prompt);
      } else {
        throw new Error("No API key configured");
      }

      const parsed = parseGeneratedCode(generatedContent);
      return Response.json({ ...parsed, offline: false });
    } catch (error) {
      console.error("AI generation failed, using fallback:", error);
      const fallback = getFallbackExample(prompt);
      return Response.json(fallback);
    }
  } catch (error) {
    console.error("Error in generate route:", error);
    return Response.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
