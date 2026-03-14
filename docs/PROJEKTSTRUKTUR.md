# Projekt-Struktur Erklärung

## 1. Übersicht der Dateistruktur

```
js/
├── game.js                    (Initialisierung, Game-Loop, State-Management)
│
├── core/                      (Kern-Logik)
│   ├── config.class.js        (Konfigurationswerte)
│   ├── world.class.js         (Hauptklasse: Spielwelt & Loop)
│   ├── level.class.js         (Level-Definition)
│   ├── collision-manager.class.js (Kollisionsabfrage)
│   ├── keyboard.class.js      (Steuerung)
│   ├── drawable-object.class.js (Basisklasse für Rendern)
│   ├── enemy.class.js         (Basisklasse für Gegner)
│   ├── start-screen.class.js  (Startbildschirm)
│   ├── end-screen.class.js    (Game-Over & Win Screen)
│   ├── statusbar.class.js     (UI: Lebensanzeige)
│   ├── magicbar.class.js      (UI: Magieanzeige)
│   └── sound-manager.class.js (Sound-Verwaltung & Mute-Button)
│
├── models/                    (Spielobjekte)
│   ├── movable-object.class.js (Basis für bewegliche Objekte)
│   ├── backgroundobject.class.js (Hintergrund-Elemente)
│   ├── item.class.js          (Basis für Items)
│   ├── coin.class.js          (Sammelbar: Münze)
│   ├── bottle.class.js        (Sammelbar: Trank)
│   └── throwable-object.class.js (Projektile/Magie)
│
├── characters/                (Charaktere & Gegner)
│   ├── character.class.js     (Basisklasse für Spieler)
│   ├── endboss.class.js       (Endgegner)
│   ├── player/
│   │   ├── mage.class.js      (Spieler-Klasse: Magier)
│   │   └── rogue.class.js     (Spieler-Klasse: Schurke)
│   └── enemies/
│       ├── bigKnight.class.js (Gegner: Ritter)
│       └── dragon.class.js    (Gegner: Drache)
│
└── levels/
    └── level1.js              (Definition von Level 1)
```

## 2. Wichtige Klassen im Detail

### Core (Kern-Logik)

- **World (`world.class.js`)**:
  Die zentrale Klasse, die alles zusammenhält. Sie besitzt Instanzen vom `Character`, `Level`, `CollisionManager` und rendert alles auf den Canvas (`draw()`). Hier läuft auch der Game-Loop (`run()`).

- **CollisionManager (`collision-manager.class.js`)**:
  Ausgelagerte Logik für alle Kollisionsabfragen (Spieler trifft Gegner, Spieler sammelt Münze, Feuerball trifft Boss etc.).

- **DrawableObject (`drawable-object.class.js`)**:
  Die Mutter aller sichtbaren Klassen. Kümmert sich um das Laden und Zeichnen von Bildern.

- **Enemy (`enemy.class.js`)**:
  Basisklasse für alle Gegner. Enthält KI-Logik wie Verfolgung, Angriff, Patrouille und Todes-Animation.

- **EndScreen (`end-screen.class.js`)**:
  Basisklasse für Spielende-Bildschirme. `GameOverScreen` und `WinScreen` erben davon und zeigen Menü/Restart-Buttons.

- **SoundManagerClass (`sound-manager.class.js`)**:
  Sound-Verwaltung mit globalem Mute-Toggle, localStorage-Persistenz und Canvas-basiertem Mute-Button.

### Models & Characters

- **MovableObject (`movable-object.class.js`)**:
  Erbt von `DrawableObject`. Fügt Physik hinzu: Schwerkraft (`applyGravity()`), Bewegung und Kollisionserkennung (`isColliding()`) mit richtungsabhängigen Offsets.

- **Character (`character.class.js`)**:
  Die Basisklasse für den Spieler. Steuert Animationen (Laufen, Springen, Tod) und verarbeitet Tastatureingaben.

  - Subklassen: `Mage`, `Rogue` (in `js/characters/player/`).

- **Enemies (`js/characters/enemies/`)**:
  Spezifische Gegner-Klassen wie `BigKnight` oder `Dragon`. Sie erben von `Enemy` und definieren ihr eigenes Verhalten und Aussehen.

- **ThrowableObject (`throwable-object.class.js`)**:
  Repräsentiert Geschosse (z.B. Feuerbälle). Sie fliegen in eine Richtung und können Gegner verletzen.

## 3. Datenfluss & Initialisierung

1. **Start**: `index.html` lädt alle Skripte. `onload="init()"` ruft `init()` in `game.js` auf.
2. **Setup**: `init()` ruft `initLevel1()`, `initCanvas()`, `initAudio()`, `initWorld()`, `initUI()` und `initEventListeners()` auf.
3. **World-Start**:
   - `World` erstellt den `Character` (Rogue) und lädt das `Level` (aus `level1.js`).
   - `World` startet den Game-Loop und prüft kontinuierlich auf Eingaben (`Keyboard`) und Kollisionen.
4. **Rendering**: Die zentrale Funktion `animateUI()` in `game.js` steuert den Render-Loop via `requestAnimationFrame`. Sie zeichnet zuerst die Spielwelt und danach die UI-Overlays (Start-/End-Screens, Sound-Button).

## 4. Spielmechaniken

- **Vererbung**: Fast alles erbt von `MovableObject` -> `DrawableObject`.
- **Level-Bau**: Level werden in `level1.js` definiert, indem Arrays von Gegnern, Items und Hintergründen übergeben werden.
- **Start-Screen**: Wird vor dem Spiel gerendert mit Pixel-Art Play-Button und Puls-Animation.
- **End-Screens**: `GameOverScreen` und `WinScreen` werden nach Spielende angezeigt, mit Menü- und Restart-Buttons.
- **Intervall-Management**: Alle `setInterval`/`setTimeout` werden über `setTrackedInterval`/`setTrackedTimeout` global getrackt und bei Spielende sauber bereinigt.
