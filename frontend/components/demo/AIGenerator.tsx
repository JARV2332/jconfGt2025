"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2, WifiOff } from "lucide-react";
import { TypewriterCode } from "./TypewriterCode";

const EXAMPLE_PROMPTS = [
  "CRUD de notas de estudiante",
  "API de productos con inventario",
  "Sistema de reservas de citas médicas",
  "Gestión de libros en biblioteca",
];

export function AIGenerator() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    dotnet: string;
    java: string;
    explanation: string;
    offline?: boolean;
  } | null>(null);
  const [syncPosition, setSyncPosition] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResult(null);
    setSyncPosition(0);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Error al generar código");
      }

      const data = await response.json();
      setResult(data);
      setAutoPlay(true);
    } catch (error) {
      console.error("Error generating code:", error);
      alert("Error al generar código. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="space-y-6">
      <Card className="border-4 border-gradient-to-r from-[#F29111] to-[#00758F] shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-[#F29111]/10 to-[#00758F]/10">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-[#F29111]" />
            <CardTitle className="text-3xl/snug font-bold text-[#090224] py-0.5">
              Generador de Código en Vivo
            </CardTitle>
          </div>
          <p className="text-gray-600 mt-2">
            Escribe lo que necesitas y genera código equivalente en ASP.NET Core y Spring Boot simultáneamente
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué necesitas programar?
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="Ej: CRUD de notas de estudiante"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#F29111] focus:outline-none text-lg"
                disabled={loading}
              />
              <Button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                size="lg"
                className="bg-gradient-to-r from-[#F29111] to-[#00758F] hover:opacity-90 text-white font-bold px-8"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generar
                  </>
                )}
              </Button>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-2">O prueba uno de estos ejemplos:</p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((example) => (
                <Button
                  key={example}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  className="text-sm"
                  disabled={loading}
                >
                  {example}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          {result.offline && (
            <div className="flex items-center gap-2 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
              <WifiOff className="h-5 w-5 text-yellow-700" />
              <p className="text-sm text-yellow-800">
                <strong>Modo sin conexión:</strong> Mostrando ejemplo pre-generado (no hay API key configurada o error de red)
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TypewriterCode
              code={result.dotnet}
              language="csharp"
              filename="TareaController.cs"
              color="#F29111"
              autoPlay={autoPlay}
              syncWith={syncPosition}
              onComplete={() => {}}
            />
            <TypewriterCode
              code={result.java}
              language="java"
              filename="TareaController.java"
              color="#00758F"
              autoPlay={autoPlay}
              syncWith={syncPosition}
              onComplete={() => {}}
            />
          </div>

          <Card className="border-2 border-gray-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#F29111]" />
                Análisis de Diferencias
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 whitespace-pre-line">{result.explanation}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
