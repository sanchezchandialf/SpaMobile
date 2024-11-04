// Importaciones necesarias
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Interface para tipar la respuesta de la API
export interface ApiResponse<T = any> {
  code: number;      // Código de estado HTTP
  data: T | null;    // Datos de la respuesta, puede ser null
  message: string;   // Mensaje de la respuesta
}

// Interface para tipar la configuración de la petición
export interface FetchApiConfig {
  path: string;                                          // Ruta de la API
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';  // Método HTTP
  payload?: any;                                         // Datos a enviar (opcional)
  requiresAuth?: boolean;                                // Requiere autenticación (opcional)
  contentType?: string;                                  // Tipo de contenido (opcional)
  token?: string;                                        // Token de autenticación (opcional)
}

// URL base de la API
const API_URL = "https://calm-perception-production.up.railway.app/"

// Función factory para crear la instancia de FetchApi
const createFetchApi = () => {
  // Función principal que maneja las peticiones
  // T es un tipo genérico que permite tipar la respuesta según necesidad
  return async function FetchApi<T = any>({
    path,
    method,
    payload,
    requiresAuth = false,
    contentType = 'application/json',
    token: providedToken,
  }: FetchApiConfig): Promise<ApiResponse<T>> {
    // Configuración inicial de headers
    const headers: Record<string, string> = {
      'Content-Type': contentType,
      'Platform': Platform.OS,  // Identifica si la petición viene de iOS o Android
    };

    // Construir URL completa
    let url = `${API_URL}${path}`;

    // Manejo de autenticación
    if (requiresAuth) {
      // Intenta usar el token proporcionado o obtenerlo del storage
      const token = providedToken || await AsyncStorage.getItem('@auth_token');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      } else {
        // Si no hay token, retorna error de autenticación
        return { code: 401, data: null, message: 'Authentication required' };
      }
    }

    // Variable para el body de la petición
    let body: string | FormData | undefined;

    // Procesamiento especial para peticiones GET con payload (query params)
    if (method === 'GET' && payload !== undefined) {
      let queryString;
      if (typeof payload === 'object') {
        // Convierte objeto en string de query params
        queryString = Object.entries(payload)
          .map(([key, value]) => 
            `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`
          )
          .join('&');
      } else {
        queryString = payload;
      }
      url += `?${queryString}`;
    } 
    // Manejo especial para FormData (subida de archivos)
    else if (payload instanceof FormData) {
      body = payload;
      delete headers['Content-Type']; // Permite que el boundary se establezca automáticamente
    } 
    // Otros tipos de payload
    else if (payload !== undefined) {
      body = JSON.stringify(payload);
    }

    try {
      // Realizar la petición
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      // Manejar respuestas no exitosas
      if (!response.ok) {
        const errorData = await response.json();
        return { 
          code: response.status, 
          data: null, 
          message: errorData.message || 'Error en la solicitud' 
        };
      }

      // Manejo especial para DELETE (normalmente no retorna datos)
      if (method === 'DELETE') {
        return { code: response.status, data: null, message: 'Success' };
      }

      // Procesar respuesta exitosa
      const responseData = await response.json();
      // Algunos endpoints envuelven la data en un objeto con propiedad 'data'
      const data = responseData.hasOwnProperty('data') ? responseData.data : responseData;

      return {
        code: response.status,
        data: data as T,
        message: 'Success'
      };

    } catch (error) {
      // Manejo de errores de red u otros errores
      return {
        code: 500,
        data: null,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  };
};

// Exportar instancia única de FetchApi
export const FetchApi = createFetchApi();