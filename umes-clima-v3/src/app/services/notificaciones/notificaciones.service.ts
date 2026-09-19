import { Injectable, inject } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { DatosClima } from '../../models/clima.model';

@Injectable({ providedIn: 'root' })
export class NotificacionesService {
    private alertController = inject(AlertController);
    private toastController = inject(ToastController);

    async mostrarAlertaClima(lat: number, lng: number, clima: DatosClima, onRegistrar: () => void) {
        const alert = await this.alertController.create({
            header: 'Clima Actual',
            cssClass: 'alerta-multilinea',
            message:
                `Latitud: ${lat?.toFixed(4)                } ` + 
                `Longitud: ${lng?.toFixed(4)}\n                 ` +
                `Temperatura actual: ${clima?.temperatura} °C\n` +
                `Sensación térmica: ${clima?.sensacionTermica} °C\n` +
                `Humedad: ${clima?.humedad}%\n` +
                `Velocidad del viento: ${clima?.velocidadViento} km/h`,
            buttons: [
                { text: 'Cerrar', role: 'cancel' },
                { text: 'Registrar', handler: () => onRegistrar() }
            ]
        });

        await alert.present();
    }

    async mostrarToast(mensaje: string, color: string = 'success') {
        const toast = await this.toastController.create({
            message: mensaje,
            duration: 2000,
            color,
            position: 'bottom'
        });
        await toast.present();
    }

    async mostrarError(mensaje: string) {
        const alert = await this.alertController.create({
            header: 'Atención',
            message: mensaje,
            buttons: ['OK']
        });
        await alert.present();
    }
}