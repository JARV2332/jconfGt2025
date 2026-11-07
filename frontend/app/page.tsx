"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, 
  Sparkles, 
  Database, 
  TestTube, 
  Play, 
  ArrowRight, 
  ArrowLeft,
  Maximize,
  Minimize,
  ChevronRight,
  User,
  HelpCircle,
  Map,
  Rocket,
  FolderKanban,
  Columns2,
  Settings,
  GitCompare,
  AlertTriangle,
  ShieldAlert,
  LayoutGrid,
  Lightbulb,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypewriterCode } from "@/components/demo/TypewriterCode";
import { AnimatedApiDemo } from "@/components/demo/AnimatedApiDemo";
import { AIGenerator } from "@/components/demo/AIGenerator";
import {
  PortadaSlide,
  QuienSoySlide,
  PreguntaSlide,
  MapaSlide,
  ArranqueSlide,
  EjemploSlide,
  ControllerTalkSlide,
  DiSlide,
  DatosSlide,
  LinqSlide,
  CostoSlide,
  ErroresSlide,
  VistazoSlide,
  ConsejosSlide,
  GraciasSlide,
} from "@/components/talk/Slides";
import { codeSamples } from "@/lib/code-samples";
import { dotnetApi, javaApi } from "@/lib/api/client";

const sections = [
  { id: "portada", title: "Portada", icon: Heart },
  { id: "quien", title: "Quién soy", icon: User },
  { id: "pregunta", title: "La pregunta", icon: HelpCircle },
  { id: "mapa", title: "Mapa", icon: Map },
  { id: "equivalencias", title: "Equivalencias", icon: Code2 },
  { id: "arranque", title: "Arranque", icon: Rocket },
  { id: "ejemplo", title: "Ejemplo", icon: FolderKanban },
  { id: "home", title: "Los dos mundos", icon: Columns2 },
  { id: "controller-talk", title: "Controller", icon: Columns2 },
  { id: "controller", title: "Código", icon: Code2 },
  { id: "di", title: "DI", icon: Settings },
  { id: "datos", title: "Datos", icon: Database },
  { id: "database", title: "Persistencia", icon: Database },
  { id: "linq", title: "LINQ", icon: GitCompare },
  { id: "costo", title: "Lo que costó", icon: AlertTriangle },
  { id: "errores", title: "Errores", icon: ShieldAlert },
  { id: "vistazo", title: "Vistazo", icon: LayoutGrid },
  { id: "testing", title: "Testing", icon: TestTube },
  { id: "demo", title: "Demo en Vivo", icon: Play },
  { id: "ai", title: "Generador IA", icon: Sparkles },
  { id: "consejos", title: "Consejos", icon: Lightbulb },
  { id: "gracias", title: "Gracias", icon: Heart },
];

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [newTareaTitle, setNewTareaTitle] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSection < sections.length - 1) {
        setCurrentSection(curr => curr + 1);
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        setCurrentSection(curr => curr - 1);
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header + nav stay together so section titles are not trapped underneath */}
      <div className="sticky top-0 z-50">
        <header className="bg-[#090224] text-white shadow-lg">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl/snug font-bold font-heading">
                  Java para desarrolladores .NET
                </h1>
                <p className="text-sm text-[#F29111] mt-1">JConf 2026 Guatemala • 7 de noviembre</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </header>

        <div className="bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-6 py-2.5 flex items-center gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1">
              {sections.map((section, idx) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(idx)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                      currentSection === idx
                        ? "bg-gradient-to-r from-[#F29111] to-[#00758F] text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {section.title}
                  </button>
                );
              })}
            </div>
            <p className="hidden lg:block shrink-0 text-xs text-gray-500 whitespace-nowrap">
              {currentSection + 1}/{sections.length} · ← → · F
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <Button
                onClick={() => setCurrentSection((curr) => Math.max(0, curr - 1))}
                disabled={currentSection === 0}
                size="sm"
                className="bg-white text-[#090224] border border-gray-200 hover:bg-gray-100 shadow-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Anterior
              </Button>
              <Button
                onClick={() => setCurrentSection((curr) => Math.min(sections.length - 1, curr + 1))}
                disabled={currentSection === sections.length - 1}
                size="sm"
                className="bg-gradient-to-r from-[#F29111] to-[#00758F] hover:opacity-90 text-white shadow-sm"
              >
                Siguiente
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="pt-8 pb-10">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {sections[currentSection].id === "portada" && <PortadaSlide />}
              {sections[currentSection].id === "quien" && <QuienSoySlide />}
              {sections[currentSection].id === "pregunta" && <PreguntaSlide />}
              {sections[currentSection].id === "mapa" && <MapaSlide />}
              {sections[currentSection].id === "equivalencias" && <EquivalenciasSection />}
              {sections[currentSection].id === "arranque" && <ArranqueSlide />}
              {sections[currentSection].id === "ejemplo" && <EjemploSlide />}
              {sections[currentSection].id === "home" && <HomeSection />}
              {sections[currentSection].id === "controller-talk" && <ControllerTalkSlide />}
              {sections[currentSection].id === "controller" && <ControllerSection />}
              {sections[currentSection].id === "di" && <DiSlide />}
              {sections[currentSection].id === "datos" && <DatosSlide />}
              {sections[currentSection].id === "database" && <DatabaseSection />}
              {sections[currentSection].id === "linq" && <LinqSlide />}
              {sections[currentSection].id === "costo" && <CostoSlide />}
              {sections[currentSection].id === "errores" && <ErroresSlide />}
              {sections[currentSection].id === "vistazo" && <VistazoSlide />}
              {sections[currentSection].id === "testing" && <TestingSection />}
              {sections[currentSection].id === "demo" && <DemoSection newTareaTitle={newTareaTitle} setNewTareaTitle={setNewTareaTitle} />}
              {sections[currentSection].id === "ai" && <AISection />}
              {sections[currentSection].id === "consejos" && <ConsejosSlide />}
              {sections[currentSection].id === "gracias" && <GraciasSlide />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

    </div>
  );
}

function HomeSection() {
  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <h2 className="text-5xl/snug font-bold font-heading text-[#090224] px-4">
          Dos Mundos, Un Objetivo
        </h2>
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
          Explora las similitudes y diferencias entre <span className="text-[#F29111] font-bold">ASP.NET Core</span> y{" "}
          <span className="text-[#00758F] font-bold">Spring Boot</span> construyendo la misma API
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-4 border-[#F29111] shadow-2xl h-full bg-gradient-to-br from-[#F29111]/5 to-white">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="text-7xl font-bold text-[#F29111]">C#</div>
              <h3 className="text-2xl font-bold text-[#090224]">ASP.NET Core 8</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#F29111] mt-0.5" />
                  <span>Entity Framework Core</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#F29111] mt-0.5" />
                  <span>LINQ para consultas</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#F29111] mt-0.5" />
                  <span>DI integrado en framework</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#F29111] mt-0.5" />
                  <span>xUnit para testing</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-4 border-[#00758F] shadow-2xl h-full bg-gradient-to-br from-[#00758F]/5 to-white">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="text-7xl font-bold text-[#00758F]">Java</div>
              <h3 className="text-2xl font-bold text-[#090224]">Spring Boot 3.2</h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00758F] mt-0.5" />
                  <span>Spring Data JPA</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00758F] mt-0.5" />
                  <span>Streams API para filtros</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00758F] mt-0.5" />
                  <span>@Autowired para DI</span>
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="h-5 w-5 text-[#00758F] mt-0.5" />
                  <span>JUnit 5 + Mockito</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <Card className="border-2 border-gray-200 bg-gray-50">
          <CardContent className="pt-6">
            <h3 className="text-xl font-bold text-[#090224] mb-4">Proyecto Demo: API de Tareas</h3>
            <p className="text-gray-600">
              Una API REST completa con CRUD, filtros, logging y testing implementada en ambos stacks
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

function EquivalenciasSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">Tabla de Equivalencias</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <EquivalenceCard
          title="Framework"
          dotnet="ASP.NET Core 8"
          java="Spring Boot 3.2"
        />
        <EquivalenceCard
          title="Lenguaje"
          dotnet="C# 12"
          java="Java 21"
        />
        <EquivalenceCard
          title="ORM"
          dotnet="Entity Framework Core"
          java="Spring Data JPA"
        />
        <EquivalenceCard
          title="Inyección de Dependencias"
          dotnet="Integrado (IServiceCollection)"
          java="@Autowired / Constructor"
        />
        <EquivalenceCard
          title="Testing"
          dotnet="xUnit / NUnit"
          java="JUnit 5 + Mockito"
        />
        <EquivalenceCard
          title="Queries"
          dotnet="LINQ"
          java="Streams API"
        />
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#090224] mb-4">Modelo de Datos</h3>
        <div className="grid lg:grid-cols-2 gap-6">
          <TypewriterCode
            code={codeSamples.model.dotnet}
            language="csharp"
            filename="Tarea.cs"
            color="#F29111"
            autoPlay={false}
          />
          <TypewriterCode
            code={codeSamples.model.java}
            language="java"
            filename="Tarea.java"
            color="#00758F"
            autoPlay={false}
          />
        </div>
      </div>
    </div>
  );
}

function ControllerSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">REST Controllers</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <TypewriterCode
          code={codeSamples.controller.dotnet}
          language="csharp"
          filename="TareasController.cs"
          color="#F29111"
          autoPlay={false}
        />
        <TypewriterCode
          code={codeSamples.controller.java}
          language="java"
          filename="TareaController.java"
          color="#00758F"
          autoPlay={false}
        />
      </div>
    </div>
  );
}

function DatabaseSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">Persistencia de Datos</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <TypewriterCode
          code={codeSamples.database.dotnet}
          language="csharp"
          filename="TareasDbContext.cs"
          color="#F29111"
          autoPlay={false}
        />
        <TypewriterCode
          code={codeSamples.database.java}
          language="java"
          filename="TareaRepository.java"
          color="#00758F"
          autoPlay={false}
        />
      </div>
    </div>
  );
}

function TestingSection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">Unit Testing</h2>
      <div className="grid lg:grid-cols-2 gap-6">
        <TypewriterCode
          code={codeSamples.testing.dotnet}
          language="csharp"
          filename="TareasControllerTests.cs"
          color="#F29111"
          autoPlay={false}
        />
        <TypewriterCode
          code={codeSamples.testing.java}
          language="java"
          filename="TareaControllerTest.java"
          color="#00758F"
          autoPlay={false}
        />
      </div>
    </div>
  );
}

function DemoSection({ newTareaTitle, setNewTareaTitle }: any) {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">Demo en Vivo</h2>
      
      <AnimatedApiDemo
        title="Listar Todas las Tareas"
        operation="GET /api/tareas"
        onExecute={async () => {
          const [dotnetRes, javaRes] = await Promise.all([
            dotnetApi.getTareas(),
            javaApi.getTareas(),
          ]);
          return { dotnet: dotnetRes, java: javaRes };
        }}
      />

      <AnimatedApiDemo
        title="Filtrar Tareas Completadas"
        operation="GET /api/tareas/completadas"
        onExecute={async () => {
          const [dotnetRes, javaRes] = await Promise.all([
            dotnetApi.getTareasCompletadas(),
            javaApi.getTareasCompletadas(),
          ]);
          return { dotnet: dotnetRes, java: javaRes };
        }}
      />

      <AnimatedApiDemo
        title="Crear Nueva Tarea"
        operation="POST /api/tareas"
        inputComponent={
          <input
            type="text"
            value={newTareaTitle}
            onChange={(e) => setNewTareaTitle(e.target.value)}
            placeholder="Título de la nueva tarea"
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F29111] focus:outline-none text-lg"
          />
        }
        onExecute={async () => {
          const tarea = { titulo: newTareaTitle || "Nueva tarea demo", completada: false };
          const [dotnetRes, javaRes] = await Promise.all([
            dotnetApi.createTarea(tarea),
            javaApi.createTarea(tarea),
          ]);
          return { dotnet: dotnetRes, java: javaRes };
        }}
      />
    </div>
  );
}

function AISection() {
  return (
    <div className="space-y-8">
      <h2 className="text-4xl/snug font-bold text-[#090224] mb-8 pt-1">Generador de Código con IA</h2>
      <AIGenerator />
    </div>
  );
}

function EquivalenceCard({ title, dotnet, java }: { title: string; dotnet: string; java: string }) {
  return (
    <Card className="border-2 border-gray-200 hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <h4 className="font-bold text-lg text-[#090224] mb-4">{title}</h4>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Badge className="bg-[#F29111] hover:bg-[#F29111]">.NET</Badge>
            <span className="text-sm text-gray-700 flex-1">{dotnet}</span>
          </div>
          <div className="flex items-start gap-3">
            <Badge className="bg-[#00758F] hover:bg-[#00758F]">Java</Badge>
            <span className="text-sm text-gray-700 flex-1">{java}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
