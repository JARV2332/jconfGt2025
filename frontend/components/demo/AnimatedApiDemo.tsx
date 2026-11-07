"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { ApiResponse } from "@/lib/api/types";

interface AnimatedApiDemoProps {
  title: string;
  operation: string;
  onExecute: () => Promise<{ dotnet: ApiResponse<any>; java: ApiResponse<any> }>;
  inputComponent?: React.ReactNode;
}

export function AnimatedApiDemo({ 
  title, 
  operation, 
  onExecute,
  inputComponent 
}: AnimatedApiDemoProps) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{ dotnet: ApiResponse<any>; java: ApiResponse<any> } | null>(null);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "requesting" | "responding">("idle");

  const handleExecute = async () => {
    setLoading(true);
    setAnimationPhase("requesting");
    
    setTimeout(() => setAnimationPhase("responding"), 500);
    
    try {
      const response = await onExecute();
      setResults(response);
    } catch (error) {
      console.error("Error executing API call:", error);
    } finally {
      setLoading(false);
      setTimeout(() => setAnimationPhase("idle"), 1000);
    }
  };

  return (
    <div className="space-y-6">
      {inputComponent && (
        <div className="mb-4">{inputComponent}</div>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-[#090224]">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{operation}</p>
        </div>
        <Button 
          onClick={handleExecute} 
          disabled={loading}
          size="lg"
          className="bg-gradient-to-r from-[#F29111] to-[#00758F] hover:opacity-90 text-white font-bold px-8"
        >
          {loading ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Zap className="h-5 w-5" />
              </motion.div>
              Ejecutando...
            </>
          ) : (
            <>
              Ejecutar Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {/* Animation Area */}
      <div className="relative min-h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-gray-200">
        <div className="grid grid-cols-3 gap-8 items-center">
          {/* Frontend/Client */}
          <div className="text-center">
            <motion.div
              animate={animationPhase === "requesting" ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block p-6 bg-white rounded-lg shadow-lg"
            >
              <div className="text-4xl mb-2">💻</div>
              <div className="font-semibold text-sm">Cliente</div>
            </motion.div>
          </div>

          {/* Request Arrows */}
          <div className="relative">
            <AnimatePresence>
              {animationPhase === "requesting" && (
                <>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 right-0"
                  >
                    <div className="flex items-center justify-center space-x-2 text-[#F29111]">
                      <ArrowRight className="h-6 w-6" />
                      <span className="text-xs font-mono bg-[#F29111] text-white px-2 py-1 rounded">
                        .NET
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute bottom-0 left-0 right-0"
                  >
                    <div className="flex items-center justify-center space-x-2 text-[#00758F]">
                      <ArrowRight className="h-6 w-6" />
                      <span className="text-xs font-mono bg-[#00758F] text-white px-2 py-1 rounded">
                        Java
                      </span>
                    </div>
                  </motion.div>
                </>
              )}
              {animationPhase === "responding" && (
                <>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 left-0 right-0"
                  >
                    <div className="flex items-center justify-center space-x-2 text-[#F29111]">
                      <span className="text-xs font-mono bg-[#F29111] text-white px-2 py-1 rounded">
                        200 OK
                      </span>
                      <ArrowRight className="h-6 w-6 rotate-180" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="absolute bottom-0 left-0 right-0"
                  >
                    <div className="flex items-center justify-center space-x-2 text-[#00758F]">
                      <span className="text-xs font-mono bg-[#00758F] text-white px-2 py-1 rounded">
                        200 OK
                      </span>
                      <ArrowRight className="h-6 w-6 rotate-180" />
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* APIs */}
          <div className="space-y-4">
            <motion.div
              animate={animationPhase === "requesting" ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="p-4 bg-gradient-to-r from-[#F29111] to-orange-600 rounded-lg shadow-lg text-white"
            >
              <div className="font-bold">ASP.NET Core</div>
              <div className="text-xs opacity-90">:5000</div>
            </motion.div>
            <motion.div
              animate={animationPhase === "requesting" ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-4 bg-gradient-to-r from-[#00758F] to-teal-700 rounded-lg shadow-lg text-white"
            >
              <div className="font-bold">Spring Boot</div>
              <div className="text-xs opacity-90">:8081</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Results */}
      <AnimatePresence>
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <ApiResultCard 
              title=".NET API"
              color="#F29111"
              result={results.dotnet}
            />
            <ApiResultCard 
              title="Java API"
              color="#00758F"
              result={results.java}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ApiResultCardProps {
  title: string;
  color: string;
  result: ApiResponse<any>;
}

function ApiResultCard({ title, color, result }: ApiResultCardProps) {
  const maxTiming = 100;
  const timingPercentage = Math.min((result.timing / maxTiming) * 100, 100);

  return (
    <Card className="border-2 shadow-lg" style={{ borderColor: color }}>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xl font-bold" style={{ color }}>{title}</h4>
          <Badge 
            variant={result.error ? "destructive" : "default"}
            className="text-base px-3 py-1"
          >
            {result.status || "ERROR"}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 font-medium">
              <Clock className="h-4 w-4" />
              Tiempo de respuesta
            </span>
            <span className="font-mono font-bold text-lg">
              {result.timing.toFixed(2)}ms
            </span>
          </div>
          
          {/* Latency Bar */}
          <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${timingPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: color }}
            />
          </div>
        </div>
        
        {result.error ? (
          <div className="mt-4">
            <span className="text-sm font-medium text-red-600">Error:</span>
            <pre className="mt-2 text-xs bg-red-50 p-3 rounded overflow-x-auto font-mono border border-red-200">
              {result.error}
            </pre>
          </div>
        ) : (
          <div className="mt-4">
            <span className="text-sm font-medium text-gray-700">Respuesta JSON:</span>
            <pre className="mt-2 text-xs bg-gray-50 p-3 rounded overflow-x-auto max-h-64 font-mono border border-gray-300">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
