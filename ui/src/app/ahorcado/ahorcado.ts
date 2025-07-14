import { Component, OnInit } from '@angular/core';
// Importamos la clase Ahorcado desde la librería core
import Ahorcado from '../lib/ahorcado';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.scss'],
  imports: [FormsModule] // 👈 añade FormsModule aquí

})
export class AhorcadoComponent implements OnInit {
  juego!: Ahorcado;
  progreso: string = '';
  intentosRestantes: number = 0;
  letrasIntentadas: string[] = [];
  mensaje: string = '';
  letraInput: string = '';

  ngOnInit() {
    this.juego = new Ahorcado('angular', 6); // palabra de prueba
    this.actualizarEstado();
  }

  adivinarLetra() {
    const resultado = this.juego.adivinar(this.letraInput);
    if (resultado === true) {
      this.mensaje = '✅ Letra correcta!';
    } else if (resultado === false) {
      this.mensaje = '❌ Letra incorrecta!';
    } else {
      this.mensaje = resultado; // Mensaje de "Ya usaste esa letra"
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
