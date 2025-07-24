import { Component, OnInit, inject } from '@angular/core';
import Ahorcado from '../lib/ahorcado';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgClass } from '@angular/common'; 
import { PalabraService } from '../services/palabra';

@Component({
  selector: 'app-ahorcado',
  standalone: true, 
  templateUrl: './ahorcado.html',
  styleUrls: ['./ahorcado.scss'],
  imports: [
    CommonModule,  
    NgClass,       
    FormsModule,
    HttpClientModule,
  ]
})
export class AhorcadoComponent implements OnInit {
  juego: Ahorcado = new Ahorcado('_____', 6); // ✅ Dummy inicial
  progreso = '';
  intentosRestantes = 0;
  letrasIntentadas: string[] = [];
  mensaje = '';
  letraInput = '';

  private palabraService = inject(PalabraService);

  ngOnInit() {
    this.iniciarJuego();
  }

  iniciarJuego() {
  this.palabraService.obtenerPalabra()
    .then(palabra => {
      const palabraSinTildes = this.quitarTildes(palabra);
      this.juego = new Ahorcado(palabraSinTildes, 6);
      this.actualizarEstado();
    })
    .catch(err => {
      console.error('❌ Error al obtener palabra:', err);
      this.juego = new Ahorcado('angular', 6); // ✅ fallback para tests
      this.mensaje = '⚠️ Error al cargar la palabra. Intenta más tarde.';
      this.actualizarEstado();
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

  quitarTildes(palabra: string): string {
  return palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

}
