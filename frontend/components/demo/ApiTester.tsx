"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { dotnetApi, javaApi, mockData } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/types";

interface ApiTesterProps {
  title: string;
  operation: string;
  onExecute: () => Promise<{ dotnet: ApiResponse<any>; java: ApiResponse<any> }>;
}

export function ApiTester({ title, operation, onExecute }: ApiTesterProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ dotnet: ApiResponse<any>; java: ApiResponse<any> } | null>(null);
  const [simulatedMode, setSimulatedMode] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    setSimulatedMode(false);
    try {
      const response = await onExecute();
      
      const dotnetFailed = response.dotnet.status === 0;
      const javaFailed = response.java.status === 0;
      
      if (dotnetFailed || javaFailed) {
        setSimulatedMode(true);
        setResults({
          dotnet: dotnetFailed ? {
            data: mockData,
            error: null,
            status: 200,
            timing: 0,
          } : response.dotnet,
          java: javaFailed ? {
            data: mockData,
            error: null,
            status: 200,
            timing: 0,
          } : response.java,
        });
      } else {
        setResults(response);
      }
    } catch (error) {
      console.error("Error executing API call:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#090224]">{title}</h3>
        <Button 
          onClick={handleExecute} 
          disabled={loading}
          className="bg-[#F29111] hover:bg-[#F29111]/90"
        >
          {loading ? "Ejecutando..." : "Ejecutar en Ambos APIs"}
        </Button>
      </div>
      
      {simulatedMode && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            ⚠️ Modo simulado activado - Uno o más backends no están disponibles
          </p>
        </div>
      )}
      
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ApiResult 
            title=".NET API"
            color="#F29111"
            result={results.dotnet}
            simulated={simulatedMode && results.dotnet.timing === 0}
          />
          <ApiResult 
            title="Java API"
            color="#00758F"
            result={results.java}
            simulated={simulatedMode && results.java.timing === 0}
          />
        </div>
      )}
    </div>
  );
}

interface ApiResultProps {
  title: string;
  color: string;
  result: ApiResponse<any>;
  simulated: boolean;
}

function ApiResult({ title, color, result, simulated }: ApiResultProps) {
  return (
    <Card className="border-2" style={{ borderColor: color }}>
      <CardHeader style={{ backgroundColor: `${color}15` }}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg" style={{ color }}>{title}</CardTitle>
          {simulated && (
            <Badge variant="outline" className="text-yellow-700 border-yellow-700">
              Simulado
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Estado:</span>
          <Badge variant={result.error ? "destructive" : "default"}>
            {result.status || "ERROR"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Tiempo:</span>
          <span className="text-sm font-mono">
            {simulated ? "N/A" : `${result.timing.toFixed(2)}ms`}
          </span>
        </div>
        
        {result.error ? (
          <div className="mt-3">
            <span className="text-sm font-medium text-red-600">Error:</span>
            <pre className="mt-2 text-xs bg-red-50 p-3 rounded overflow-x-auto font-mono">
              {result.error}
            </pre>
          </div>
        ) : (
          <div className="mt-3">
            <span className="text-sm font-medium">Respuesta:</span>
            <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-x-auto max-h-64 font-mono">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
