import type { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-sm font-bold tracking-[0.18em] text-[#F29111] uppercase">
      {children}
    </p>
  );
}

function TalkFooter() {
  return (
    <p className="pt-2 text-xs font-semibold tracking-[0.22em] text-[#00758F]">
      JCONF 2026 GT
    </p>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Card className="border-2 border-gray-200 shadow-lg h-full">
      <CardContent className="pt-6 space-y-3">
        <div className="text-4xl font-bold text-[#F29111] leading-none">{n}</div>
        <h3 className="text-2xl/snug font-bold text-[#090224]">{title}</h3>
        <div className="text-gray-700 text-lg leading-relaxed">{children}</div>
      </CardContent>
    </Card>
  );
}

export function PortadaSlide() {
  return (
    <div className="overflow-hidden rounded-[2rem] shadow-2xl min-h-[68vh] flex flex-col bg-white">
      <div className="bg-[#00758F] text-white px-8 md:px-14 pt-10 pb-16 flex-1">
        <Eyebrow>JConf 2026 · Guatemala</Eyebrow>
        <h2 className="mt-8 text-4xl/snug md:text-6xl/snug font-bold max-w-4xl">
          Java para desarrolladores
        </h2>
        <p className="text-4xl/snug md:text-6xl/snug font-bold text-[#F29111] max-w-4xl">
          que vienen de .NET
        </p>
      </div>
      <div className="bg-white text-[#090224] px-8 md:px-14 py-8 -mt-8 rounded-t-[2rem] flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-2xl md:text-3xl font-bold">Jorge Alberto Romero Villanueva</p>
          <p className="mt-2 text-lg font-semibold text-[#00758F]">
            Sábado 7 de noviembre de 2026 · Sala 2
          </p>
        </div>
        <div className="flex gap-2" aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i} className="h-3 w-3 rounded-full bg-[#F29111]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function QuienSoySlide() {
  return (
    <div className="space-y-8">
      <div className="grid lg:grid-cols-[320px_1fr] gap-8 items-center">
        <img
          src="/jorge.jpg"
          alt="Jorge Alberto Romero Villanueva"
          className="w-full max-w-sm mx-auto aspect-[4/5] object-cover object-top rounded-[2rem] border-4 border-[#F29111] shadow-2xl"
        />
        <div className="space-y-6">
          <div className="space-y-3">
            <Eyebrow>Sobre mí</Eyebrow>
            <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Quién soy</h2>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
              Ingeniero en sistemas y educador. Vengo del mundo .NET y hoy estoy dando el salto a Java.
            </p>
          </div>
          <Card className="border-2 border-[#00758F]/30 bg-[#00758F]/5 shadow-lg">
            <CardContent className="pt-6 space-y-2">
              <h3 className="text-2xl font-bold text-[#090224]">Por qué esta charla</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Comparto lo que aprendí en el camino, para que tu salto sea más corto.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <TalkFooter />
    </div>
  );
}

export function PreguntaSlide() {
  return (
    <div className="space-y-8">
      <Eyebrow>La pregunta de hoy</Eyebrow>
      <h2 className="text-3xl/snug md:text-5xl/snug font-bold text-[#090224] max-w-5xl">
        ¿Cómo aprovechar lo que ya sabés de .NET para empezar bien en Java?
      </h2>
      <Card className="border-0 bg-[#090224] text-white shadow-2xl">
        <CardContent className="py-8 px-8 md:px-10">
          <p className="text-xl md:text-2xl leading-relaxed">
            La pregunta de hoy no es cuál es mejor. Tu experiencia con C#, ASP.NET Core y EF Core es un mapa: casi todo lo que ya usás tiene un equivalente en Java.
          </p>
          <p className="mt-6 text-[#F29111] font-semibold">
            Jorge Alberto Romero Villanueva · JConf 2026 Guatemala
          </p>
        </CardContent>
      </Card>
      <TalkFooter />
    </div>
  );
}

const MAPA = [
  ["Plataforma", ".NET SDK", "JDK"],
  ["Paquetes", "NuGet", "Maven / Gradle"],
  ["IDE", "Visual Studio / Rider", "IntelliJ IDEA"],
  ["Web", "ASP.NET Core", "Spring Boot"],
  ["ORM", "EF Core", "JPA / Hibernate"],
  ["Consultas", "LINQ", "Streams API"],
];

export function MapaSlide() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Eyebrow>Orientación</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Mapa de equivalencias</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
          Casi todo lo que usás en .NET tiene una pieza equivalente en Java. Este mapa te orienta antes de escribir la primera línea.
        </p>
      </div>
      <div className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-xl">
        <div className="grid grid-cols-3 bg-[#090224] text-white text-sm md:text-base font-bold">
          <div className="px-4 py-3">Concepto</div>
          <div className="px-4 py-3 text-[#F29111]">.NET</div>
          <div className="px-4 py-3 text-[#7fd0df]">Java</div>
        </div>
        {MAPA.map(([concepto, dotnet, java]) => (
          <div key={concepto} className="grid grid-cols-3 border-t border-gray-200 text-base md:text-lg">
            <div className="px-4 py-4 font-semibold text-[#090224] bg-gray-50">{concepto}</div>
            <div className="px-4 py-4 text-gray-800">{dotnet}</div>
            <div className="px-4 py-4 text-gray-800">{java}</div>
          </div>
        ))}
      </div>
      <TalkFooter />
    </div>
  );
}

export function ArranqueSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>Primer paso</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Arrancar un proyecto</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-4 border-[#F29111] shadow-xl h-full">
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm font-bold tracking-widest text-[#F29111]">01 · .NET</p>
            <h3 className="text-2xl font-bold text-[#090224]">Un comando del CLI</h3>
            <pre className="bg-[#090224] text-white rounded-xl p-4 text-sm md:text-base overflow-x-auto font-mono">
              dotnet new webapi -n Tareas
            </pre>
            <p className="text-lg text-gray-700">Crea la API lista para correr con <span className="font-semibold">dotnet run</span>.</p>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#00758F] shadow-xl h-full">
          <CardContent className="pt-6 space-y-4">
            <p className="text-sm font-bold tracking-widest text-[#00758F]">02 · JAVA</p>
            <h3 className="text-2xl font-bold text-[#090224]">Spring Initializr</h3>
            <pre className="bg-[#090224] text-[#7fd0df] rounded-xl p-4 text-sm md:text-base overflow-x-auto font-mono">
              start.spring.io
            </pre>
            <p className="text-lg text-gray-700">
              Elegís Maven o Gradle, versión de Java y dependencias (Spring Web, Spring Data JPA) y descargás el proyecto.
            </p>
          </CardContent>
        </Card>
      </div>
      <TalkFooter />
    </div>
  );
}

export function EjemploSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>El mismo problema, dos veces</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Proyecto de ejemplo</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
          Una API de tareas, construida dos veces: en ASP.NET Core y en Spring Boot. Mismo problema, así comparamos pieza por pieza.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Step n="01" title="Modelo Tarea">
          Id, Titulo y Completada: una clase en C# y una entidad en Java.
        </Step>
        <Step n="02" title="Endpoints CRUD">
          GET, POST, PUT y DELETE sobre /api/tareas.
        </Step>
        <Step n="03" title="Base de datos">
          EF Core en .NET; Spring Data JPA en Java.
        </Step>
      </div>
      <TalkFooter />
    </div>
  );
}

export function ControllerTalkSlide() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Eyebrow>Misma ruta, otra sintaxis</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">El controller lado a lado</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-4 border-[#F29111] shadow-xl overflow-hidden">
          <div className="bg-[#F29111] text-white px-5 py-3 font-bold">C# · ASP.NET Core</div>
          <CardContent className="pt-4">
            <pre className="text-sm md:text-[15px] leading-relaxed font-mono text-[#090224] overflow-x-auto">{`[ApiController]
[Route("api/tareas")]
public class TareasController
    : ControllerBase
{
  [HttpGet]
  public IEnumerable<Tarea> Get()
    => _servicio.Listar();

  [HttpPost]
  public IActionResult Crear(Tarea t)
    => Ok(_servicio.Crear(t));
}`}</pre>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#00758F] shadow-xl overflow-hidden">
          <div className="bg-[#00758F] text-white px-5 py-3 font-bold">Java · Spring Boot</div>
          <CardContent className="pt-4">
            <pre className="text-sm md:text-[15px] leading-relaxed font-mono text-[#090224] overflow-x-auto">{`@RestController
@RequestMapping("/api/tareas")
public class TareasController {

  @GetMapping
  public List<Tarea> listar() {
    return servicio.listar();
  }

  @PostMapping
  public Tarea crear(@RequestBody Tarea t) {
    return servicio.crear(t);
  }
}`}</pre>
          </CardContent>
        </Card>
      </div>
      <TalkFooter />
    </div>
  );
}

export function DiSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>De fábrica en las dos plataformas</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">DI y configuración</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
          Las dos plataformas traen inyección de dependencias de fábrica. Cambia dónde se declara y cómo se configura cada entorno.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-4 border-[#F29111] shadow-xl h-full">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-2xl font-bold text-[#F29111]">.NET · Program.cs</h3>
            <ul className="space-y-3 text-lg text-gray-800">
              <li>AddScoped&lt;I, T&gt;() registra el servicio</li>
              <li>Inyección por constructor</li>
              <li>appsettings.json + appsettings.{"{Entorno}"}.json</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#00758F] shadow-xl h-full">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-2xl font-bold text-[#00758F]">Java · Spring Boot</h3>
            <ul className="space-y-3 text-lg text-gray-800">
              <li>@Service registra el bean</li>
              <li>Inyección por constructor</li>
              <li>application.yml + perfiles (application-dev.yml)</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <TalkFooter />
    </div>
  );
}

export function DatosSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>Persistencia</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Base de datos</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
          Izquierda, .NET con EF Core; derecha, Java con JPA/Hibernate y Spring Data. Arriba, el modelo; abajo, cómo evoluciona el esquema.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-[#F29111] shadow-lg">
          <CardContent className="pt-6 space-y-2">
            <h3 className="text-xl font-bold text-[#090224]">DbContext + DbSet</h3>
            <p className="text-lg text-gray-700">El contexto de EF Core expone cada tabla como un DbSet&lt;Tarea&gt;.</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#00758F] shadow-lg">
          <CardContent className="pt-6 space-y-2">
            <h3 className="text-xl font-bold text-[#090224]">@Entity + JpaRepository</h3>
            <p className="text-lg text-gray-700">Anotás la clase y Spring Data genera el repositorio CRUD.</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#F29111] shadow-lg">
          <CardContent className="pt-6 space-y-2">
            <h3 className="text-xl font-bold text-[#090224]">Migrations</h3>
            <p className="text-lg text-gray-700">dotnet ef migrations add y dotnet ef database update.</p>
          </CardContent>
        </Card>
        <Card className="border-2 border-[#00758F] shadow-lg">
          <CardContent className="pt-6 space-y-2">
            <h3 className="text-xl font-bold text-[#090224]">Flyway / Liquibase</h3>
            <p className="text-lg text-gray-700">Scripts versionados que se aplican al iniciar la app.</p>
          </CardContent>
        </Card>
      </div>
      <TalkFooter />
    </div>
  );
}

export function LinqSlide() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Eyebrow>Consultas</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">LINQ vs Streams</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="border-4 border-[#F29111] overflow-hidden shadow-xl">
          <div className="bg-[#F29111] text-white px-5 py-3 font-bold">C# · LINQ</div>
          <CardContent className="pt-4">
            <pre className="font-mono text-sm md:text-base leading-relaxed text-[#090224]">{`var titulos = tareas
    .Where(t => t.Completada)
    .Select(t => t.Titulo)
    .ToList();`}</pre>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#00758F] overflow-hidden shadow-xl">
          <div className="bg-[#00758F] text-white px-5 py-3 font-bold">Java · Streams API</div>
          <CardContent className="pt-4">
            <pre className="font-mono text-sm md:text-base leading-relaxed text-[#090224]">{`var titulos = tareas.stream()
    .filter(Tarea::isCompletada)
    .map(Tarea::getTitulo)
    .toList();`}</pre>
          </CardContent>
        </Card>
      </div>
      <p className="text-lg md:text-xl text-[#090224] font-semibold">
        Where → filter · Select → map · ToList → toList (Java 16+)
      </p>
      <p className="text-lg text-gray-600">
        La diferencia clave: en Java primero abrís el stream con <span className="font-mono font-semibold text-[#00758F]">.stream()</span>.
      </p>
      <TalkFooter />
    </div>
  );
}

export function CostoSlide() {
  const items = [
    ["Maven y pom.xml", "Dependencias y build en un XML; más verboso que un .csproj."],
    ["Anotaciones por todos lados", "Cada @Service o @Entity cambia el comportamiento."],
    ["null y Optional", "Sin nullable reference types; Optional para retornos opcionales."],
    ["Checked exceptions", "El compilador obliga a capturarlas o declararlas con throws."],
  ];
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>En primera persona</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Lo que me costó</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
          Cuatro cosas que en .NET no me tocaban y en Java me hicieron pensar dos veces. Si las conocés de antemano, el salto es más suave.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map(([title, body], i) => (
          <Card key={title} className="border-2 border-gray-200 shadow-lg h-full">
            <CardContent className="pt-6 space-y-2">
              <p className="text-[#F29111] font-bold">0{i + 1}</p>
              <h3 className="text-2xl font-bold text-[#090224]">{title}</h3>
              <p className="text-lg text-gray-700">{body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <TalkFooter />
    </div>
  );
}

export function ErroresSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>Antes de que te pase</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Errores que evitar</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-4 border-[#F29111] shadow-xl h-full bg-[#F29111]/5">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-2xl font-bold text-[#090224]">Problema N+1 con lazy loading</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Recorrer una lista y tocar una relación lazy dispara una consulta por fila. Revisá el SQL y usá JOIN FETCH o @EntityGraph.
            </p>
          </CardContent>
        </Card>
        <Card className="border-4 border-[#00758F] shadow-xl h-full bg-[#00758F]/5">
          <CardContent className="pt-6 space-y-3">
            <h3 className="text-2xl font-bold text-[#090224]">Escribir C# en Java</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Respetá las convenciones: métodos en camelCase, getters o records, paquetes en minúscula y el estilo de Spring.
            </p>
          </CardContent>
        </Card>
      </div>
      <TalkFooter />
    </div>
  );
}

export function VistazoSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>Día a día</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">De un vistazo</h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-4xl">
          Tres piezas del día a día que también tienen su equivalente: cómo registrás lo que pasa, cómo probás y cómo publicás.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Step n="01" title="Logging">
          ILogger en .NET; SLF4J + Logback en Java.
        </Step>
        <Step n="02" title="Testing">
          xUnit en .NET; JUnit 5 + Mockito en Java.
        </Step>
        <Step n="03" title="Despliegue">
          dotnet publish en .NET; JAR ejecutable o imagen Docker en Java.
        </Step>
      </div>
      <TalkFooter />
    </div>
  );
}

export function ConsejosSlide() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <Eyebrow>Para llevar</Eyebrow>
        <h2 className="text-4xl/snug md:text-5xl/snug font-bold text-[#090224]">Tres consejos</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        <Step n="01" title="Aprendé Spring Boot desde Initializr">
          Usá start.spring.io y leé lo que genera.
        </Step>
        <Step n="02" title="Compará con lo que ya sabés">
          Para cada pieza nueva, buscá su equivalente en .NET.
        </Step>
        <Step n="03" title="Construí un proyecto real pequeño">
          Una API como la de tareas: CRUD, base de datos y tests.
        </Step>
      </div>
      <TalkFooter />
    </div>
  );
}

export function GraciasSlide() {
  return (
    <div className="overflow-hidden rounded-[2rem] bg-[#090224] text-white shadow-2xl min-h-[68vh] flex flex-col justify-between">
      <div className="px-8 md:px-14 pt-12 pb-8 grid lg:grid-cols-[1fr_240px] gap-8 items-center">
        <div>
          <Eyebrow>Cierre</Eyebrow>
          <h2 className="mt-6 text-5xl/snug md:text-7xl/snug font-bold">Gracias</h2>
          <p className="mt-4 text-3xl/snug md:text-4xl/snug font-bold text-[#F29111]">¿Preguntas?</p>
          <p className="mt-8 text-lg text-white/80 max-w-xl">
            Java para desarrolladores que vienen de .NET
          </p>
          <p className="mt-2 text-[#7fd0df] font-semibold">
            Jorge Alberto Romero Villanueva · JConf 2026 Guatemala · Sala 2
          </p>
          <a
            href="https://github.com/JARV2332"
            className="inline-block mt-6 text-lg font-semibold text-white underline decoration-[#F29111] underline-offset-4"
          >
            github.com/JARV2332
          </a>
        </div>
        <img
          src="/jorge.jpg"
          alt="Jorge Alberto Romero Villanueva"
          className="w-52 h-64 object-cover object-top rounded-[1.5rem] border-4 border-[#F29111] shadow-2xl mx-auto"
        />
      </div>
      <div className="px-8 md:px-14 py-6 text-xs font-semibold tracking-[0.22em] text-[#F29111]">
        JCONF 2026 GT
      </div>
    </div>
  );
}
