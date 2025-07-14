import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AhorcadoComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  
})
export class App {
  protected readonly title = signal('ui');
}
