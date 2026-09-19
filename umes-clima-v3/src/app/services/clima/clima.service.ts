import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { DatosClima } from '../../models/clima.model';


@Injectable({
    providedIn: 'root'
})
export class ClimaService {
    private http = inject(HttpClient);

    async obtenerClimaPorCoordenadas(latitud: number, longitud: number): Promise<DatosClima> {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m`;

    const respuesta: any = await firstValueFrom(this.http.get(url));

    return {
        temperatura: respuesta.current.temperature_2m,
        sensacionTermica: respuesta.current.apparent_temperature,
        humedad: respuesta.current.relative_humidity_2m,
        velocidadViento: respuesta.current.wind_speed_10m
    };
    }
}