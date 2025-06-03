class Ahorcado {
  constructor(palabra, maxErrores = 3) {
    this.palabra = palabra;
    this.letrasAdivinadas = new Set();
    this.errores = 0;
    this.maxErrores = maxErrores; 
  }

  adivinar(letra) {
    if (!/^[a-zA-Z]$/.test(letra)) {
      throw new Error('Entrada inválida');
    }
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
      return true;
    } else {
      this.errores++;
      return false;
    }
  }

  estaGanado() {
    for (const letra of new Set(this.palabra)) {
      if (!this.letrasAdivinadas.has(letra)) {
        return false;
      }
    }
    return true;
  }

  estaPerdido() {
    return this.errores >= this.maxErrores;
  }

  mostrarProgreso() {
    return '_'.repeat(this.palabra.length);
  }
}

module.exports = Ahorcado;

