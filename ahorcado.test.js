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



