export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  timing: number;
}

export type Backend = "dotnet" | "java";

export interface DualApiResponse<T> {
  dotnet: ApiResponse<T>;
  java: ApiResponse<T>;
}
