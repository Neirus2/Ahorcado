const Ahorcado = require('./ahorcado');

// Test No. 1: RED: No existe aún el constructor 
test('debería crear el juego con la palabra secreta', () => {
  const juego = new Ahorcado('agil');
  expect(juego.palabra).toBe('agil');
});
//GREEN: crear una instancia de la clase Ahorcado 

// Test No. 2: RED: No existe aún el método adivinar
test('adivinar una letra correcta devuelve true', () => {
  const juego = new Ahorcado('agil');
  const resultado = juego.adivinar('a');
  expect(resultado).toBe(true);
});
//GREEN: crear el método adivinar en la clase Ahorcado

// Test No. 3: RED: no tiene red porque adivinar usa includes que devuelve false cuando no encuentra la letra
test('letra incorrecta devuelve false', () => {
  const juego = new Ahorcado('agil');
  const resultado = juego.adivinar('z');
  expect(resultado).toBe(false);
});
//GREEN: SIN CAMBIOS

// Test No. 4: RED: va a fallar porque no existe estaGanado() y no guardamos letras adivinadas. 
test('gana cuando se adivinan todas las letras', () => {
  const juego = new Ahorcado('agil');
  juego.adivinar('a');
  juego.adivinar('g');
  juego.adivinar('i');
  juego.adivinar('l');
  expect(juego.estaGanado()).toBe(true);
});
//GREEN: crear el método estaGanado



