import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({ providedIn: 'root' })
export class CamaraService {
    async capturarFotografia(guardarEnGaleria: boolean = false): Promise<string | undefined> {
        const imagen = await Camera.getPhoto({
            quality: 85,
            allowEditing: false,
            resultType: CameraResultType.DataUrl,
            source: CameraSource.Camera,
            saveToGallery: guardarEnGaleria
        });

        return imagen.dataUrl;
    }
}