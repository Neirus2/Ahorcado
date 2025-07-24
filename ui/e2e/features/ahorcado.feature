Feature: Juego del Ahorcado

  Scenario: Mostrar página principal
    Given estoy en la página de inicio
    When la página carga
    Then debería ver el título "🎯 Juego del Ahorcado"

  Scenario: Mostrar elementos de la interfaz
    Given estoy en la página de inicio
    Then debería ver el input para ingresar letras
    And debería ver el botón "Adivinar"
    And debería ver el botón "Reiniciar"

  Scenario: Mostrar intentos al iniciar
    Given estoy en la página de inicio
    Then debería ver los intentos restantes al iniciar el juego
  
  Scenario: No hay letras usadas al iniciar el juego
    Given estoy en la página de inicio
    Then no debería haber letras usadas


