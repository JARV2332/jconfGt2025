import { Tarea, ApiResponse } from "./types";

const DOTNET_BASE_URL = process.env.NEXT_PUBLIC_DOTNET_API_URL || "http://localhost:5000";
const JAVA_BASE_URL = process.env.NEXT_PUBLIC_JAVA_API_URL || "http://localhost:8081";

async function apiCall<T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const startTime = performance.now();
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });
    
    const timing = performance.now() - startTime;
    
    if (!response.ok) {
      return {
        data: null,
        error: `HTTP ${response.status}: ${response.statusText}`,
        status: response.status,
        timing,
      };
    }
    
    const data = response.status === 204 ? null : await response.json();
    
    return {
      data,
      error: null,
      status: response.status,
      timing,
    };
  } catch (error) {
    const timing = performance.now() - startTime;
    return {
      data: null,
      error: error instanceof Error ? error.message : "Error desconocido",
      status: 0,
      timing,
    };
  }
}

export const dotnetApi = {
  getTareas: () => apiCall<Tarea[]>(`${DOTNET_BASE_URL}/api/tareas`),
  getTarea: (id: number) => apiCall<Tarea>(`${DOTNET_BASE_URL}/api/tareas/${id}`),
  getTareasCompletadas: () => apiCall<Tarea[]>(`${DOTNET_BASE_URL}/api/tareas/completadas`),
  createTarea: (tarea: Omit<Tarea, "id">) => 
    apiCall<Tarea>(`${DOTNET_BASE_URL}/api/tareas`, {
      method: "POST",
      body: JSON.stringify(tarea),
    }),
  updateTarea: (id: number, tarea: Tarea) => 
    apiCall<void>(`${DOTNET_BASE_URL}/api/tareas/${id}`, {
      method: "PUT",
      body: JSON.stringify(tarea),
    }),
  deleteTarea: (id: number) => 
    apiCall<void>(`${DOTNET_BASE_URL}/api/tareas/${id}`, {
      method: "DELETE",
    }),
};

export const javaApi = {
  getTareas: () => apiCall<Tarea[]>(`${JAVA_BASE_URL}/api/tareas`),
  getTarea: (id: number) => apiCall<Tarea>(`${JAVA_BASE_URL}/api/tareas/${id}`),
  getTareasCompletadas: () => apiCall<Tarea[]>(`${JAVA_BASE_URL}/api/tareas/completadas`),
  createTarea: (tarea: Omit<Tarea, "id">) => 
    apiCall<Tarea>(`${JAVA_BASE_URL}/api/tareas`, {
      method: "POST",
      body: JSON.stringify(tarea),
    }),
  updateTarea: (id: number, tarea: Tarea) => 
    apiCall<void>(`${JAVA_BASE_URL}/api/tareas/${id}`, {
      method: "PUT",
      body: JSON.stringify(tarea),
    }),
  deleteTarea: (id: number) => 
    apiCall<void>(`${JAVA_BASE_URL}/api/tareas/${id}`, {
      method: "DELETE",
    }),
};

export const mockData: Tarea[] = [
  { id: 1, titulo: "Tarea de ejemplo 1", completada: false },
  { id: 2, titulo: "Tarea de ejemplo 2", completada: true },
];
