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
      let palabra = words[0];

      // Normalizamos: elimina tildes y pasa a minúscula
      const normalizada = palabra.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

      const esValida =
        /^[a-z]+$/.test(normalizada) && // Solo letras sin símbolos
        !normalizada.includes('ck') &&
        !normalizada.includes(' ') &&
        normalizada.length >= 3 &&
        normalizada.length <= 12 &&
        palabra[0] === palabra[0].toLowerCase(); // No mayúscula inicial

      if (esValida) {
        return normalizada;
      } else {
        console.warn(`⚠️ Palabra descartada por filtros: "${palabra}", usando fallback`);
        return 'perro'; // fallback si no pasa filtros
      }
    } else {
      console.warn('⚠️ API no devolvió palabras, usando fallback');
      return 'perro';
    }
  } catch (err) {
    console.error('❌ Error al obtener palabra:', err);
    return 'perro'; // fallback en caso de error
  }
}

}
