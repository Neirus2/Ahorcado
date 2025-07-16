import { Component, OnInit } from '@angular/core';
import Ahorcado from '../lib/ahorcado';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PalabraService } from '../services/palabra';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.scss'],
  imports: [FormsModule, HttpClientModule]
})
export class AhorcadoComponent implements OnInit {
  juego!: Ahorcado;
  progreso = '';
  intentosRestantes = 0;
  letrasIntentadas: string[] = [];
  mensaje = '';
  letraInput = '';

  constructor(private palabraService: PalabraService) {}

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
    this.palabraService.obtenerPalabra()
      .then((palabra: string) => {
        console.log('✅ Palabra obtenida de la API:', palabra);
        this.juego = new Ahorcado(palabra, 6);
        this.actualizarEstado();
      })
      .catch((err: any) => {
        console.error('⚠️ Error al obtener palabra de la API:', err);
        this.mensaje = '⚠️ Error al cargar palabra. Usando fallback.';
        this.juego = new Ahorcado('angular', 6); // Fallback a palabra local
        this.actualizarEstado();
      });
  }

  reiniciarJuego() {
    this.mensaje = '';
    this.letraInput = '';
    this.iniciarJuego();
  }

  adivinarLetra() {
    const resultado = this.juego.adivinar(this.letraInput.trim());
    if (resultado === true) {
      this.mensaje = '✅ Letra correcta!';
    } else if (resultado === false) {
      this.mensaje = '❌ Letra incorrecta!';
    } else {
      this.mensaje = resultado;
    }
    this.letraInput = '';
    this.actualizarEstado();
  }

  actualizarEstado() {
    this.progreso = this.juego.mostrarProgreso();
    this.intentosRestantes = this.juego.intentosRestantes();
    this.letrasIntentadas = Array.from(this.juego.letrasIntentadas);
    if (this.juego.estaGanado()) {
      this.mensaje = '🎉 ¡Ganaste!';
    } else if (this.juego.estaPerdido()) {
      this.mensaje = `💀 Perdiste. La palabra era "${this.juego.palabra}".`;
    }
  }
}
