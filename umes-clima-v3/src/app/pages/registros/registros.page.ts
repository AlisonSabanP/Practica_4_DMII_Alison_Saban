import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
  IonLabel, IonButtons, IonBackButton, IonCard, IonCardHeader, 
  IonCardTitle, IonCardContent, IonBadge, IonButton, IonIcon, IonCheckbox 
} from '@ionic/angular';
import { RegistrosService } from '../../services/registros/registros.service';
import { CamaraService } from '../../services/camara/camara.service';
import { NotificacionesService } from '../../services/notificaciones/notificaciones.service';
import { cameraOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons'; 

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, 
    IonLabel, IonButtons, IonBackButton, IonCard, IonCardHeader, 
    IonCardTitle, IonCardContent, IonBadge, IonButton, IonIcon, IonCheckbox
  ]
})
export class RegistrosPage {
  private registrosService = inject(RegistrosService);
  private camaraService = inject(CamaraService);
  private notificaciones = inject(NotificacionesService);

  registros = this.registrosService.registros;
  guardarEnGaleria: boolean = false;

  constructor() {
    addIcons({ cameraOutline });
  }

  async tomarFotografia(registroId: string) {
    try {
      const fotoDataUrl = await this.camaraService.capturarFotografia(this.guardarEnGaleria);
      if (fotoDataUrl) {
        this.registrosService.actualizarFotoRegistro(registroId, fotoDataUrl);
        const msj = this.guardarEnGaleria 
          ? 'Fotografía capturada y guardada en la galería' 
          : 'Fotografía adjuntada al registro';
        await this.notificaciones.mostrarToast(msj, 'success');
      }
    } catch (error) {
      console.error('Proceso de cámara cancelado por el usuario');
    }
  }
}