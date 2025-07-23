Feature: Juego del Ahorcado

  Scenario: Mostrar página principal
    Given estoy en la página de inicio
    When la página carga
    Then debería ver el título "🎯 Juego del Ahorcado"

  Scenario: Adivinar letra correcta
    Given estoy en la página de inicio
    When ingreso la letra "a" y hago clic en Adivinar
    Then debería ver la letra "a" en la lista de letras usadas

  Scenario: Mostrar intentos restantes
    Given estoy en la página de inicio
    When ingreso la letra "z" y hago clic en Adivinar
    Then debería ver que los intentos restantes son menores a 6
