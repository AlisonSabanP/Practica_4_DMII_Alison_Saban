import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
    providedIn: 'root'
})
export class GeolocalizacionService {

    constructor() { }
        async obtenerUbicacionActual(): Promise<{ latitud: number; longitud: number }> {
            const posicion: Position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000            
            });

        return {
            latitud: posicion.coords.latitude,
            longitud: posicion.coords.longitude
        };
    }
}