# StartScreen Dokumentation

## Übersicht

Die `StartScreen` Klasse ist verantwortlich für die Anzeige des Start-Bildschirms im Canvas. Sie zeigt einen animierten Pixel-Art Play-Button mit Puls-Animation, einen Titel ("ADVENTURE QUEST") und Steuerungshinweise.

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
- `this.isVisible` - Boolean, ob der Start-Screen sichtbar ist (Standard: `true`)
- `this.isHovered` - Boolean für den Hover-Zustand des Buttons
- `this.imageLoaded` - Boolean, ob das Button-Bild geladen ist
- `this.animationTime` - Zeitwert für die Puls-Animation
- `this.pulseScale` - Aktueller Skalierungsfaktor der Puls-Animation
- `this.playButtonImg` - Das geladene Play-Button Sprite

## Methoden

### `initButtonLayout()`

Setzt Standard-Button-Dimensionen (200×80px) und zentriert den Button.

---

### `initAnimationState()`

Initialisiert die Puls-Animationsvariablen (`animationTime`, `pulseScale`).

---

### `loadPlayButtonImage()`

Lädt das Play-Button-Bild aus den Assets. Nach dem Laden wird die Buttongröße basierend auf dem Bildformat und der Bildschirmgröße (Mobile vs. Desktop) angepasst.

---

### `draw()`

Zeichnet den gesamten Start-Screen:
1. `drawOverlay()` – Semi-transparentes Overlay mit Farbverlauf
2. `drawTitle()` – Titel "ADVENTURE" + Untertitel "QUEST" mit Glow-Effekt
3. `drawButton()` – Play-Button mit Puls- oder Hover-Animation
4. `drawInstructions()` – "CLICK TO START" / "TAP TO START" mit Blink-Effekt

**Rückgabewert:** Keiner

---

### `drawButton()`

Zeichnet den Play-Button. Zeigt "Loading..." solange das Bild nicht geladen ist. Danach:
- **Hover:** Button vergrößert (1.15x) mit Gold-Glow
- **Normal:** Sanfte Sinus-Puls-Animation

---

### `isButtonClicked(x, y)`

Prüft, ob ein Klick innerhalb der Button-Grenzen liegt.

**Parameter:**
- `x` - X-Koordinate des Klicks
- `y` - Y-Koordinate des Klicks

**Rückgabewert:** `{boolean}`

---

### `checkHover(x, y)`

Aktualisiert den Hover-Zustand basierend auf der Mausposition.

**Parameter:**
- `x` - X-Koordinate der Maus
- `y` - Y-Koordinate der Maus

---

### `hide()`

Versteckt den Start-Screen (`this.isVisible = false`).

---

### `show()`

Zeigt den Start-Screen an und setzt die Animation zurück (`this.animationTime = 0`).

## Integration in das Spiel

### In `game.js`

```javascript
let startScreen;
let gameStarted = false;

function init() {
  initLevel1();
  initCanvas();
  initAudio();
  initWorld();
  initUI();          // ← StartScreen wird hier erstellt
  initEventListeners();
  animateUI();
}

function initUI() {
  startScreen = new StartScreen(canvas);
  gameOverScreen = new GameOverScreen(canvas);
  winScreen = new WinScreen(canvas);
  // Sound-Button initialisieren...
}
```

### Event-Handling

Alle Events laufen über zentrale Handler in `game.js`:

**Mouse Move:**

```javascript
function handleMouseMove(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);
  // Sound-Button Hover prüfen...
  updateScreenHover(canvasX, canvasY);
}

function updateScreenHover(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.checkHover(x, y);
    canvas.style.cursor = startScreen.isHovered ? 'pointer' : 'default';
  }
  // End-Screen Hover...
}
```

**Click:**

```javascript
function handleClick(event) {
  const { canvasX, canvasY } = getCanvasCoordinates(event.clientX, event.clientY);
  if (handleSoundButtonClick(canvasX, canvasY)) return;
  handleScreenButtonClick(canvasX, canvasY);
}

function handleScreenButtonClick(x, y) {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    if (startScreen.isButtonClicked(x, y)) startGame();
    return;
  }
  if (gameEnded) handleEndScreenClick(x, y);
}
```

**Spiel starten:**

```javascript
function startGame() {
  gameStarted = true;
  gameEnded = false;
  startScreen.hide();
  gameOverScreen.hide();
  winScreen.hide();
  canvas.style.cursor = 'default';
  soundManager.playSound('fantasy-space-atmosphere');
}
```

### Render-Loop

Der StartScreen wird in der zentralen `animateUI()`-Schleife gerendert:

```javascript
function animateUI() {
  if (world) world.draw();
  if (gameStarted && !gameEnded) checkGameState();
  drawScreens();       // ← Hier wird der StartScreen gezeichnet
  drawSoundButton();
  requestAnimationFrame(animateUI);
}

function drawScreens() {
  if (!gameStarted && startScreen && startScreen.isVisible) {
    startScreen.draw();   // ← StartScreen zeichnen
  } else if (gameEnded) {
    // End-Screens zeichnen...
  }
}
```

## Visuelle Spezifikationen

### Canvas-Größe

- **Breite:** 960px
- **Höhe:** 540px

### Button-Spezifikationen

- **Bild:** `assets/fantasy-platformer-game-ui/PNG/05ogin&pass/play_button.png`
- **Skalierung Desktop:** 1.5x der Bildgröße
- **Skalierung Mobile:** 1.0x der Bildgröße
- **Position:** Zentriert, 80px unterhalb der Canvas-Mitte
- **Hover-Skalierung:** 1.15x mit Gold-Glow (`rgba(255, 215, 0, 0.8)`)
- **Puls-Animation:** Sinus-basiert, ±5% Skalierung

### Farben & Effekte

| Element            | Wert                              |
| ------------------ | --------------------------------- |
| Overlay            | `rgba(0, 0, 0, 0.6)` + Gradient  |
| Titel "ADVENTURE"  | `#FFD700` (Gold) mit Glow         |
| Untertitel "QUEST" | `#FF6400` (Orange) mit Glow       |
| Instruction-Text   | Weiß mit blinkender Transparenz   |

### Typografie

- **Schriftart:** Uncial Antiqua (Fantasy-Stil)
- **Titelgröße:** 72px (Desktop) / 48px (Mobile)
- **Untertitelgröße:** 50% der Titelgröße
- **Instruction-Text:** 24px (Desktop) / 18px (Mobile)

### Mobile-Erkennung

Wird als Mobile erkannt wenn: `window.innerHeight < 480 || window.innerWidth < 750`

## Ablaufdiagramm

```
Seite laden
    ↓
init() → initUI() → new StartScreen(canvas)
    ↓
Play-Button laden (async)
    ↓
animateUI() → drawScreens() → startScreen.draw()
    ↓
Warten auf Benutzer-Interaktion
    ↓
    ├─→ Maus bewegen → handleMouseMove() → checkHover()
    │                    → Cursor ändern
    │                    → Zurück zu Warten
    │
    └─→ Klick auf Play-Button → handleClick() → startGame()
                                       ↓
                                  StartScreen verstecken
                                       ↓
                                  Spiel läuft
```
