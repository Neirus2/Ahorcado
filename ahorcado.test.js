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

// Test No. 5: RED: va a fallar porque no existe estaPerdido() y no guardamos errores.
test('el juego se pierde cuando se alcanzan los errores máximos', () => {
  const juego = new Ahorcado('agil');
  juego.adivinar('z'); // Error 1
  juego.adivinar('d'); // Error 2
  juego.adivinar('b'); // Error 3
  expect(juego.estaPerdido()).toBe(true);
});

// Test No. 6: RED: va a fallar porque no existe la validación en la función adivinar
test('solo se permiten letras como entrada válida', () => {
  const juego = new Ahorcado('agil');
  expect(() => juego.adivinar('1')).toThrow('Entrada inválida');
  expect(() => juego.adivinar('@')).toThrow('Entrada inválida');
  expect(() => juego.adivinar('ag')).toThrow('Entrada inválida');
});
//GREEN: crear el método de validación

// Test No. 7: RED: va a fallar porque no existe el método para mostrar guiones
test('mostrar guiones para la palabra a adivinar', () => {
  const juego = new Ahorcado('agil');
  expect(juego.mostrarProgreso()).toBe('____');
});
// GREEN: se crea el método mostrarProgreso}

// Test No. 8: RED: va a fallar porque no existe el método para mostrar las letras correctas
test('letras correctas revelan su posición en la palabra', () => {
  const juego = new Ahorcado('agil');
  juego.adivinar('a');
  juego.adivinar('i');
  expect(juego.mostrarProgreso()).toBe('a_i_');
});

// GREEN: se modifica el método mostrarProgreso para que muestre las letras

// Test No. 8: RED: va a fallar porque no existe la validación de letras repetidas
test('ignorar letras repetidas, mostrar mensaje de aviso', () => {
  const juego = new Ahorcado('agil');
  juego.adivinar('a'); // Correcta
  expect(juego.adivinar('a')).toBe('Ya usaste esa letra');
  juego.adivinar('z'); // Incorrecta
  expect(juego.adivinar('z')).toBe('Ya usaste esa letra');
});

// GREEN: se modifica el método adivinar para validar si una letra ya ha sido usada

// Test No 9: no va a pasar porque no existe una funcion para devolever los errores restantes
test('mostrar el número de intentos restantes', () => {
  const juego = new Ahorcado('agil');
  expect(juego.intentosRestantes()).toBe(3); // Valor inicial
  juego.adivinar('z'); // Incorrecta
  expect(juego.intentosRestantes()).toBe(2);
  juego.adivinar('x'); // Incorrecta
  expect(juego.intentosRestantes()).toBe(1);
});

// GREEN: creamos la funcion IntentosRestantes()


