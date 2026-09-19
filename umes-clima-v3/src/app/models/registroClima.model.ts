export interface RegistroClima {
    id: string;
    fecha: string;
    latitud: number;
    longitud: number;
    temperatura: number;
    sensacionTermica: number;
    humedad: number;
    velocidadViento: number;
    foto?: string;
}