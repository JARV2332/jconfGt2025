"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeComparisonProps {
  title: string;
  dotnetCode: string;
  javaCode: string;
  dotnetLabel?: string;
  javaLabel?: string;
}

export function CodeComparison({
  title,
  dotnetCode,
  javaCode,
  dotnetLabel = "C# (ASP.NET Core)",
  javaLabel = "Java (Spring Boot)",
}: CodeComparisonProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-[#F29111]">{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-[#F29111] border-2">
          <CardHeader className="bg-[#F29111]/10">
            <CardTitle className="text-lg text-[#F29111]">{dotnetLabel}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <pre className="text-xs overflow-x-auto bg-gray-50 p-4 rounded font-mono">
              <code>{dotnetCode}</code>
            </pre>
          </CardContent>
        </Card>
        
        <Card className="border-[#00758F] border-2">
          <CardHeader className="bg-[#00758F]/10">
            <CardTitle className="text-lg text-[#00758F]">{javaLabel}</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <pre className="text-xs overflow-x-auto bg-gray-50 p-4 rounded font-mono">
              <code>{javaCode}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
