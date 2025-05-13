const Ahorcado = require('./ahorcado');

test('debería crear el juego con la palabra secreta', () => {
  const juego = new Ahorcado('agil');
  expect(juego.palabra).toBe('agil');
});
