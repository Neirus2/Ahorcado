Feature: Juego del Ahorcado

  Scenario: Mostrar página principal
    Given estoy en la página de inicio
    When la página carga
    Then debería ver el título "🎯 Juego del Ahorcado"
