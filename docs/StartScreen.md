# StartScreen Dokumentation

## Übersicht

Die `StartScreen` Klasse ist verantwortlich für die Anzeige des Start-Bildschirms im Canvas. Sie zeigt einen "Play"-Button an, der das Spiel startet, wenn darauf geklickt wird.

## Dateipfad

```
js/core/start-screen.class.js
```

## Klassen-Struktur

### Constructor

```javascript
constructor(canvas);
```

**Parameter:**

- `canvas` - Das HTML Canvas-Element, auf dem der Start-Screen gezeichnet wird

**Initialisierte Eigenschaften:**

- `this.canvas` - Referenz zum Canvas-Element
- `this.ctx` - 2D-Rendering-Kontext des Canvas
- `this.isVisible` - Boolean, der angibt, ob der Start-Screen sichtbar ist (Standard: `true`)
- `this.buttonWidth` - Breite des Play-Buttons (200px)
- `this.buttonHeight` - Höhe des Play-Buttons (60px)
- `this.buttonX` - X-Position des Buttons (zentriert)
- `this.buttonY` - Y-Position des Buttons (zentriert)
- `this.isHovered` - Boolean für den Hover-Zustand des Buttons

## Methoden

### `draw()`

Zeichnet den Start-Screen im Canvas.

**Funktionsweise:**

1. Prüft, ob der Start-Screen sichtbar ist
2. Füllt den Canvas mit schwarzem Hintergrund
3. Ruft `drawButton()` auf, um den Play-Button zu zeichnen

**Rückgabewert:** Keiner

---

### `drawButton()`

Zeichnet den Play-Button mit Hover-Effekt.

**Visuelle Elemente:**

- **Hintergrund:** Dunkelgrau (`#333`) normal, heller (`#4a4a4a`) beim Hovern
- **Rahmen:** Grau (`#666`) normal, weiß (`#fff`) beim Hovern, 3px Linienstärke
- **Text:** "Play" in weißer Farbe, 32px Arial, zentriert

**Rückgabewert:** Keiner

---

### `isButtonClicked(x, y)`

Prüft, ob ein Klick innerhalb der Button-Grenzen liegt.

**Parameter:**

- `x` - X-Koordinate des Klicks
- `y` - Y-Koordinate des Klicks

**Rückgabewert:**

- `true` - wenn der Klick innerhalb des Buttons liegt
- `false` - wenn der Klick außerhalb des Buttons liegt

---

### `checkHover(x, y)`

Aktualisiert den Hover-Zustand basierend auf der Mausposition.

**Parameter:**

- `x` - X-Koordinate der Maus
- `y` - Y-Koordinate der Maus

**Rückgabewert:** Keiner

**Seiteneffekt:** Setzt `this.isHovered` auf `true` oder `false`

---

### `hide()`

Versteckt den Start-Screen.

**Rückgabewert:** Keiner

**Seiteneffekt:** Setzt `this.isVisible` auf `false`

---

### `show()`

Zeigt den Start-Screen an.

**Rückgabewert:** Keiner

**Seiteneffekt:** Setzt `this.isVisible` auf `true`

## Integration in das Spiel

### In `game.js`

```javascript
let startScreen;
let gameStarted = false;

function init() {
  canvas = document.getElementById('canvas');

  // Start-Screen initialisieren
  startScreen = new StartScreen(canvas);
  startScreen.draw();

  // Event-Listener hinzufügen
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('click', handleClick);
}
```

### Event-Handling

**Mouse Move:**

```javascript
function handleMouseMove(event) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    startScreen.checkHover(mouseX, mouseY);
    startScreen.draw();

    // Cursor-Style ändern
    if (startScreen.isHovered) {
      canvas.style.cursor = 'pointer';
    } else {
      canvas.style.cursor = 'default';
    }
  }
}
```

**Click:**

```javascript
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(clickX, clickY)) {
      startGame();
    }
  }
}
```

**Spiel starten:**

```javascript
function startGame() {
  gameStarted = true;
  startScreen.hide();
  canvas.style.cursor = 'default';

  // World initialisieren
  window.world = new World(canvas, keyboard);
  world = window.world;
}
```

## Visuelle Spezifikationen

### Canvas-Größe

- **Breite:** 960px
- **Höhe:** 540px

### Button-Spezifikationen

- **Breite:** 200px
- **Höhe:** 60px
- **Position:** Zentriert im Canvas
- **Berechnung X:** `(960 - 200) / 2 = 380px`
- **Berechnung Y:** `(540 - 60) / 2 = 240px`

### Farben

| Element            | Normal | Hover     |
| ------------------ | ------ | --------- |
| Button-Hintergrund | `#333` | `#4a4a4a` |
| Button-Rahmen      | `#666` | `#fff`    |
| Button-Text        | `#fff` | `#fff`    |
| Canvas-Hintergrund | `#000` | `#000`    |

### Typografie

- **Schriftart:** Arial
- **Schriftgröße:** 32px
- **Textausrichtung:** Zentriert
- **Textfarbe:** Weiß (`#fff`)

## Ablaufdiagramm

```
Seite laden
    ↓
init() wird aufgerufen
    ↓
StartScreen erstellen
    ↓
StartScreen.draw() - Zeigt Play-Button
    ↓
Warten auf Benutzer-Interaktion
    ↓
    ├─→ Maus bewegen → checkHover() → Button neu zeichnen
    │                                      ↓
    │                                  Cursor ändern
    │                                      ↓
    │                                  Zurück zu Warten
    │
    └─→ Klick auf Play-Button → startGame()
                                      ↓
                                 StartScreen verstecken
                                      ↓
                                 World initialisieren
                                      ↓
                                 Spiel läuft
```

## Vorteile dieser Implementierung

1. **Canvas-basiert:** Der Start-Screen wird direkt im Canvas gezeichnet, nicht als HTML-Overlay
2. **Einfach:** Nur ein Button, keine unnötigen Elemente
3. **Interaktiv:** Hover-Effekt für bessere Benutzererfahrung
4. **Wiederverwendbar:** Die Klasse kann leicht erweitert werden
5. **Performant:** Minimale DOM-Manipulation

## Mögliche Erweiterungen

- Titel/Logo hinzufügen
- Animationen für den Button
- Hintergrundbilder statt schwarzem Hintergrund
- Mehrere Buttons (z.B. Settings, Credits)
- Fade-In/Fade-Out Effekte beim Übergang
- Tastatur-Support (Enter-Taste zum Starten)
