declare module '../lib/ahorcado.js' {
  export default class Ahorcado {
    constructor(palabra: string, maxErrores?: number);

    palabra: string;
    letrasAdivinadas: Set<string>;
    letrasIntentadas: Set<string>;
    errores: number;
    maxErrores: number;

    adivinar(letra: string): boolean | string;
    estaGanado(): boolean;
    estaPerdido(): boolean;
    mostrarProgreso(): string;
    intentosRestantes(): number;
  }
}
