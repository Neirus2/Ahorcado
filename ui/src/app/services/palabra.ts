import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  // 🌐 Trae una palabra en español directamente
  private apiEsp = 'https://random-word-api.herokuapp.com/word?number=1&lang=es';

  // ✅ Usamos inject() en lugar de constructor
  private http = inject(HttpClient);

  async obtenerPalabra(): Promise<string> {
    try {
      const words = await firstValueFrom(this.http.get<string[]>(this.apiEsp));
      if (Array.isArray(words) && words.length > 0) {
        return words[0];
      } else {
        console.warn('⚠️ API no devolvió palabras, usando fallback');
        return 'perro'; // fallback
      }
    } catch (err) {
      console.error('❌ Error al obtener palabra:', err);
      return 'perro'; // fallback en caso de error
    }
  }
}
