import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AhorcadoComponent } from './ahorcado';
import { PalabraService } from '../services/palabra';
import Ahorcado from '../lib/ahorcado';

describe('AhorcadoComponent', () => {
  let component: AhorcadoComponent;
  let fixture: ComponentFixture<AhorcadoComponent>;
  let palabraServiceSpy: jasmine.SpyObj<PalabraService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PalabraService', ['obtenerPalabra']);

    await TestBed.configureTestingModule({
      imports: [AhorcadoComponent],
      providers: [
        { provide: PalabraService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AhorcadoComponent);
    component = fixture.componentInstance;
    palabraServiceSpy = TestBed.inject(PalabraService) as jasmine.SpyObj<PalabraService>;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería iniciar el juego con palabra de la API', async () => {
    palabraServiceSpy.obtenerPalabra.and.returnValue(Promise.resolve('prueba'));

    await component.iniciarJuego();

    expect(component.juego.palabra).toBe('prueba');
    expect(component.progreso).toContain('_');
  });

 it('debería usar fallback cuando la API falla', async () => {
  palabraServiceSpy.obtenerPalabra.and.returnValue(Promise.reject('API error'));

  await component.iniciarJuego();
  fixture.detectChanges();
  await fixture.whenStable();

  // ✅ Debe crear un juego con la palabra fallback
  expect(component.juego.palabra).toBe('angular');
  // ✅ Debe mostrar el mensaje completo
  expect(component.mensaje).toContain('⚠️ Error al cargar la palabra. Intenta más tarde.');
});




  it('debería reiniciar el juego correctamente', async () => {
    palabraServiceSpy.obtenerPalabra.and.returnValue(Promise.resolve('angular'));

    await component.reiniciarJuego();

    expect(component.juego.palabra).toBe('angular');
    expect(component.mensaje).toBe('');
    expect(component.letraInput).toBe('');
  });

  it('debería actualizar el estado después de adivinar letra correcta', () => {
    component.juego = new Ahorcado('test', 6);
    component.letraInput = 't';
    component.adivinarLetra();

    expect(component.progreso).toContain('t');
    expect(component.mensaje).toContain('✅');
  });

  it('debería actualizar el estado después de adivinar letra incorrecta', () => {
    component.juego = new Ahorcado('test', 6);
    component.letraInput = 'x';
    component.adivinarLetra();

    expect(component.progreso).toContain('_');
    expect(component.intentosRestantes).toBeLessThan(6);
    expect(component.mensaje).toContain('❌');
  });

  it('debería normalizar la palabra quitando tildes', async () => {
  // Simulamos que la API devuelve una palabra con tilde
  palabraServiceSpy.obtenerPalabra.and.returnValue(Promise.resolve('camión'));

  await component.iniciarJuego();

  // Verificamos que la palabra en el juego no tenga tilde
  expect(component.juego.palabra).toBe('camion');
});
});
