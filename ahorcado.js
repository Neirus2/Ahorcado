class Ahorcado {
  constructor(palabra) {
    this.palabra = palabra;
  }

  adivinar(letra) {
    return this.palabra.includes(letra);
  }
}

module.exports = Ahorcado;
