import { Component, OnInit } from '@angular/core';
import Ahorcado from '../lib/ahorcado';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common'; // 👈 Necesario para *ngFor y más
import { NgClass } from '@angular/common'; // 👈 Necesario para [ngClass]
import { PalabraService } from '../services/palabra';

@Component({
  selector: 'app-ahorcado',
  standalone: true, // 👈 si no lo tenías
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.scss'],
  imports: [
    CommonModule,  // 👈 Para directivas como *ngFor, *ngIf, etc.
    NgClass,       // 👈 Para usar [ngClass]
    FormsModule,
    HttpClientModule
  ]
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
    this.palabraService.obtenerPalabra().then(palabra => {
      this.juego = new Ahorcado(palabra, 6);
      this.actualizarEstado();
    }).catch(err => {
      console.error('Error al obtener palabra:', err);
      this.mensaje = '⚠️ Error al cargar la palabra. Intenta más tarde.';
    });
  }

  reiniciarJuego() {
    this.iniciarJuego();
    this.mensaje = '';
    this.letraInput = '';
  }

  adivinarLetra() {
    const resultado = this.juego.adivinar(this.letraInput);
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
      this.mensaje = '💀 Perdiste. La palabra era ' + this.juego.palabra;
    }
  }
}
