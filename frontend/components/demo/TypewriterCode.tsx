"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface TypewriterCodeProps {
  code: string;
  language: "csharp" | "java";
  filename: string;
  color: string;
  autoPlay?: boolean;
  onComplete?: () => void;
  syncWith?: number;
}

export function TypewriterCode({
  code,
  language,
  filename,
  color,
  autoPlay = false,
  onComplete,
  syncWith = 0,
}: TypewriterCodeProps) {
  const [displayedCode, setDisplayedCode] = useState("");
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [speed, setSpeed] = useState(50);
  
  const lines = code.split("\n");
  const totalChars = code.length;
  const currentProgress = displayedCode.length;

  useEffect(() => {
    if (syncWith > 0) {
      setDisplayedCode(code.substring(0, Math.min(syncWith, code.length)));
      setCurrentLine(code.substring(0, syncWith).split("\n").length - 1);
    }
  }, [syncWith, code]);

  useEffect(() => {
    if (!isPlaying || currentProgress >= totalChars) {
      if (currentProgress >= totalChars && onComplete) {
        onComplete();
      }
      return;
    }

    const timer = setTimeout(() => {
      const nextChar = code[currentProgress];
      setDisplayedCode((prev) => prev + nextChar);
      
      if (nextChar === "\n") {
        setCurrentLine((prev) => prev + 1);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [currentProgress, isPlaying, speed, code, totalChars, onComplete]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setDisplayedCode("");
    setCurrentLine(0);
    setIsPlaying(false);
  };

  const handleSpeedChange = () => {
    setSpeed((prev) => {
      if (prev === 50) return 20;
      if (prev === 20) return 5;
      return 50;
    });
  };

  const getLanguageIcon = () => {
    if (language === "csharp") return "C#";
    return "Java";
  };

  return (
    <div className="relative w-full">
      <div 
        className="rounded-lg overflow-hidden border-2 shadow-2xl"
        style={{ borderColor: color }}
      >
        {/* Window Chrome */}
        <div 
          className="flex items-center justify-between px-4 py-2 text-white text-sm"
          style={{ backgroundColor: color }}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-3 font-semibold">{getLanguageIcon()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="h-7 px-2 text-white hover:bg-white/20"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="h-7 px-2 text-white hover:bg-white/20"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSpeedChange}
              className="h-7 px-2 text-white hover:bg-white/20"
            >
              <Gauge className="h-4 w-4" />
              <span className="ml-1 text-xs">
                {speed === 50 ? "1x" : speed === 20 ? "2x" : "5x"}
              </span>
            </Button>
          </div>
        </div>

        {/* File Tab */}
        <div className="bg-[#1e1e1e] border-b border-gray-700">
          <div 
            className="inline-block px-4 py-2 text-sm text-white border-t-2"
            style={{ borderColor: color, backgroundColor: "#2d2d30" }}
          >
            {filename}
          </div>
        </div>

        {/* Code Area */}
        <div className="bg-[#1e1e1e] text-white p-4 font-mono text-sm overflow-x-auto min-h-[400px]">
          <div className="flex">
            <div className="text-gray-500 text-right pr-4 select-none">
              {lines.map((_, idx) => (
                <div 
                  key={idx}
                  className={idx <= currentLine ? "opacity-100" : "opacity-30"}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <pre className="flex-1">
              <code className={language === "csharp" ? "language-csharp" : "language-java"}>
                {displayedCode}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-2 h-5 bg-white ml-0.5"
                  style={{ display: isPlaying ? "inline-block" : "none" }}
                />
              </code>
            </pre>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-[#2d2d30] h-1">
          <motion.div
            className="h-full"
            style={{ 
              backgroundColor: color,
              width: `${(currentProgress / totalChars) * 100}%` 
            }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentProgress / totalChars) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
