import Ahorcado from './ahorcado';

describe('Ahorcado (lógica)', () => {
  let juego: Ahorcado;

  beforeEach(() => {
    juego = new Ahorcado('angular', 3);
  });

  it('debería inicializar correctamente', () => {
    expect(juego.palabra).toBe('angular');
    expect(juego.intentosRestantes()).toBe(3);
    expect(juego.mostrarProgreso()).toBe('_ _ _ _ _ _ _');
  });

  it('adivinar letra correcta devuelve true', () => {
    expect(juego.adivinar('a')).toBe(true);
    expect(juego.mostrarProgreso()).toContain('a');
  });

  it('adivinar letra incorrecta devuelve false', () => {
    expect(juego.adivinar('z')).toBe(false);
    expect(juego.intentosRestantes()).toBe(2);
  });

  it('debería detectar juego ganado', () => {
    for (const letra of new Set('angular')) {
      juego.adivinar(letra);
    }
    expect(juego.estaGanado()).toBeTrue();
  });

  it('debería detectar juego perdido', () => {
    juego.adivinar('x');
    juego.adivinar('y');
    juego.adivinar('z');
    expect(juego.estaPerdido()).toBeTrue();
  });

  it('debería lanzar error en entradas inválidas', () => {
    expect(() => juego.adivinar('1')).toThrowError('Entrada inválida');
    expect(() => juego.adivinar('@')).toThrowError('Entrada inválida');
  });

  it('debería avisar si se repite letra', () => {
    juego.adivinar('a');
    expect(juego.adivinar('a')).toBe('Ya usaste esa letra');
  });
});
