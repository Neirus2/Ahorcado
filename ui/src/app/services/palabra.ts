import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PalabraService {
  private apiIngles = 'https://random-word-api.herokuapp.com/word?number=1'; // 🌐 palabra aleatoria en inglés
  private apiTraduccion = 'https://libretranslate.de/translate'; // 🌍 LibreTranslate (API gratuita)

  constructor(private http: HttpClient) {}

  async obtenerPalabra(): Promise<string> {
    try {
      // 📥 Obtener palabra en inglés
      const palabras: string[] = await firstValueFrom(this.http.get<string[]>(this.apiIngles));
      const palabraIngles = palabras[0];

      console.log('🔤 Palabra en inglés:', palabraIngles);

      // 🌐 Traducir al español
      const traduccion: any = await firstValueFrom(
        this.http.post(this.apiTraduccion, {
          q: palabraIngles,
          source: 'en',
          target: 'es',
          format: 'text'
        }, {
          headers: { 'Content-Type': 'application/json' }
        })
      );

      const palabraEsp = traduccion.translatedText;
      console.log('🇪🇸 Palabra traducida:', palabraEsp);

      return palabraEsp;
    } catch (error) {
      console.error('❌ Error obteniendo/traduciendo palabra:', error);
      return 'angular'; // fallback en caso de error
    }
  }
}

