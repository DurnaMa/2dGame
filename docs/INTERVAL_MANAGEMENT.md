# Intervall- und Timeout-Management-System

Dieses Dokument beschreibt das System zur Verfolgung und Steuerung von `setInterval` und `setTimeout` Aufrufen im Projekt.

## Warum dieses System?

In JavaScript können `setInterval` und `setTimeout` oft "verwaisen", wenn ein Spiel neu gestartet oder beendet wird. Das führt zu Fehlern, Speicherlecks oder unerwartetem Verhalten (z. B. wenn der alte Charakter sich noch bewegt, obwohl ein neues Spiel läuft).

Dieses System speichert alle aktiven Intervalle/Timeouts global, sodass sie mit einem einzigen Befehl gestoppt werden können.

## Kernfunktionen

Die Funktionen sind global in `js/game.js` definiert.

### 1. `setTrackedInterval(fn, time, description)`

Ersetzt das standardmäßige `setInterval`.

- **`fn`**: Die Funktion, die ausgeführt werden soll.
- **`time`**: Zeit in Millisekunden.
- **`description`**: (Optional) Ein Name für das Intervall zu Debugging-Zwecken.

**Beispiel:**

```javascript
this.moveInterval = setTrackedInterval(() => this.moveLeft(), 1000 / 60, 'Pepe Movement');
```

### 2. `setTrackedTimeout(fn, time, description)`

Ersetzt das standardmäßige `setTimeout`.

- Funktioniert identisch zu `setTrackedInterval`.

**Beispiel:**

```javascript
setTrackedTimeout(
  () => {
    console.log('Reset completed');
  },
  1000,
  'Reset Timer'
);
```

### 3. `stopAllIntervals()`

Stoppt **alle** aktuell laufenden Intervalle und Timeouts, die über die oben genannten Funktionen registriert wurden, und leert die Tracking-Listen.

**Anwendung in `World`:**
Wenn das Spiel endet oder zurück zum Hauptmenü gewechselt wird:

```javascript
stopGame() {
    this.drawLoopRunning = false;
    stopAllIntervals(); // Stoppt alles sofort
}
```

## Integration im Projekt

- **`Character` / `Enemies`**: Alle Animationen und Bewegungsabläufe nutzen `setTrackedInterval`.
- **`MovableObject`**: Die Gravitation wird über dieses System gesteuert.
- **`World`**: Der Haupt-Collision-Check Loop wird hierüber getrackt.

## Zusammenfassung der Vorteile

1. **Keine Speicherlecks**: Alle Hintergrundprozesse werden bei Spielende zuverlässig gestoppt.
2. **Sauberer Neustart**: Beim `restartGame()` gibt es keine Konflikte mit alten Intervallen.
3. **Debug-Fähigkeit**: In der Konsole kann man theoretisch `globalIntervals` einsehen, um zu sehen, was gerade aktiv ist.
