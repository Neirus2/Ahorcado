class Ahorcado {
  constructor(palabra) {
    this.palabra = palabra;
    this.letrasAdivinadas = new Set();
  }

  adivinar(letra) {
    if (this.palabra.includes(letra)) {
      this.letrasAdivinadas.add(letra);
      return true;
    }
    return false;
  }

  estaGanado() {
    for (const letra of new Set(this.palabra)) {
      if (!this.letrasAdivinadas.has(letra)) {
        return false;
      }
    }
    return true;
  }
}

module.exports = Ahorcado;
