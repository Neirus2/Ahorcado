import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  // Trae una palabra en español directamente
  private apiEsp = 'https://random-word-api.herokuapp.com/word?number=1&lang=es';

  constructor(private http: HttpClient) {}

  obtenerPalabra(): Promise<string> {
    return this.http
      .get<string[]>(this.apiEsp)
      .toPromise()
      .then(words => {
    if (Array.isArray(words) && words.length > 0) {
      return words[0];
    } else {
      console.warn('⚠️ API no devolvió palabras, usando fallback');
      return 'perro'; // fallback
    }
})

      .catch(err => {
        console.error('❌ Error al obtener palabra:', err);
        return 'perro'; // fallback
      });
  }
}
