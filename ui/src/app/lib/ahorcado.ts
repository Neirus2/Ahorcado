export default class Ahorcado {
  palabra: string;
  letrasAdivinadas: Set<string>;
  letrasIntentadas: Set<string>;
  errores: number;
  maxErrores: number;

  constructor(palabra: string, maxErrores = 3) {
    this.palabra = palabra;
    this.letrasAdivinadas = new Set();
    this.letrasIntentadas = new Set();
    this.errores = 0;
    this.maxErrores = maxErrores;
  }

  adivinar(letra: string): boolean | string {
    letra = letra.trim().toLowerCase();

    if (!/^[a-zA-Z]$/.test(letra)) {
      throw new Error('Entrada inválida');
    }

    if (this.letrasIntentadas.has(letra)) {
      return 'Ya usaste esa letra';
    }

    this.letrasIntentadas.add(letra);

    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
      return true;
    } else {
      this.errores++;
      return false;
    }
  }

  estaGanado(): boolean {
    for (const letra of new Set(this.palabra)) {
      if (!this.letrasAdivinadas.has(letra)) {
        return false;
      }
    }
    return true;
  }

  estaPerdido(): boolean {
    return this.errores >= this.maxErrores;
  }
  
mostrarProgreso(): string {
  return this.palabra
    .split('')
    .map(letra => (this.letrasAdivinadas.has(letra) ? letra : '_'))
    .join(' '); // 👈 separador con espacio
}


  intentosRestantes(): number {
    return this.maxErrores - this.errores;
  }
}
