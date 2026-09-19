import { Component, inject } from '@angular/core';
import {
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge
} from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { GeolocalizacionService } from '../services/geolocalizacion/geolocalizacion.service';
import { ClimaService } from '../services/clima/clima.service';
import { RegistrosService } from '../services/registros/registros.service';
import { NotificacionesService } from '../services/notificaciones/notificaciones.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    imports: [
        CommonModule,
        IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
        IonSpinner, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge
    ],
})
export class HomePage {
    private geoService = inject(GeolocalizacionService);
    private climaService = inject(ClimaService);
    private registrosService = inject(RegistrosService);
    private notificaciones = inject(NotificacionesService);
    private router = inject(Router);

    
    totalRegistros = this.registrosService.totalRegistros;
    cargando: boolean = false;

    async consultarClima() {
        this.cargando = true;
        try {
            
            const coords = await this.geoService.obtenerUbicacionActual();

            
            const clima = await this.climaService.obtenerClimaPorCoordenadas(coords.latitud, coords.longitud);

            
            await this.notificaciones.mostrarAlertaClima(
                coords.latitud,
                coords.longitud,
                clima,
                async () => {
                    this.registrosService.guardarRegistro({
                        latitud: coords.latitud,
                        longitud: coords.longitud,
                        ...clima
                    });
                    await this.notificaciones.mostrarToast('Registro guardado exitosamente');
                }
            );
        } catch (error) {
            await this.notificaciones.mostrarError('No se pudo obtener la ubicación o el clima. Verifica los permisos GPS.');
        } finally {
            this.cargando = false;
        }
    }

    irARegistros() {
        this.router.navigate(['/registros']);
    }
}