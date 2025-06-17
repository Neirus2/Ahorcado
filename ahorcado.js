class Ahorcado {
  constructor(palabra, maxErrores = 3) {
    this.palabra = palabra;
    this.letrasAdivinadas = new Set();
     this.letrasIntentadas = new Set();
    this.errores = 0;
    this.maxErrores = maxErrores; 
  }

  adivinar(letra) {
  letra = letra.trim().toLowerCase(); // Normalizar entrada
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
    return this.palabra
      .split('')
      .map(letra => (this.letrasAdivinadas.has(letra) ? letra : '_'))
      .join('');
  }

  intentosRestantes() {
  return this.maxErrores - this.errores;
}
  
}

module.exports = Ahorcado;

