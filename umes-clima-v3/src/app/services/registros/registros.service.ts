import { Injectable, signal, computed } from '@angular/core';
import { RegistroClima } from '../../models/registroClima.model';

@Injectable({ providedIn: 'root' })
export class RegistrosService {
    private readonly STORAGE_KEY = 'umes_clima_registros';

    
    private registrosSignal = signal<RegistroClima[]>(this.cargarDelStorage());

    
    readonly registros = this.registrosSignal.asReadonly();
    readonly totalRegistros = computed(() => this.registrosSignal().length);

    private cargarDelStorage(): RegistroClima[] {
        const datos = localStorage.getItem(this.STORAGE_KEY);
        return datos ? JSON.parse(datos) : [];
    }

    guardarRegistro(datos: Omit<RegistroClima, 'id' | 'fecha'>): RegistroClima {
        const nuevoRegistro: RegistroClima = {
            ...datos,
            id: Date.now().toString(),
            fecha: new Date().toLocaleString()
        };

        const nuevaLista = [nuevoRegistro, ...this.registrosSignal()];
        this.actualizarEstado(nuevaLista);
        return nuevoRegistro;
    }

    actualizarFotoRegistro(id: string, fotoDataUrl: string) {
        const listaActualizada = this.registrosSignal().map(r =>
            r.id === id ? { ...r, foto: fotoDataUrl } : r
        );
        this.actualizarEstado(listaActualizada);
    }

    private actualizarEstado(lista: RegistroClima[]) {
        this.registrosSignal.set(lista);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    }
}