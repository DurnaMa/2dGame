# Projekt-Struktur Erklärung

## 0. Grundlegendes Verständnis

### Was ist eine Klasse?
- Eine Klasse ist wie ein Bauplan
- Sie beschreibt, was ein Objekt kann und welche Eigenschaften es hat
- Beispiel: Die Klasse `Character` beschreibt, was ein Spieler alles kann (laufen, springen, etc.)

### Was ist ein Objekt?
- Ein Objekt ist eine konkrete "Instanz" einer Klasse
- Beispiel: Dein Spielcharakter ist ein Objekt der Klasse `Character`

### Vererbung
- Klassen können Eigenschaften von anderen Klassen erben
- Beispiel: `Character` erbt von `MovableObject` die Fähigkeit sich zu bewegen

## 1. Hauptkomponenten und ihre Beziehungen

```
World (Hauptklasse)
├── Character (Spielfigur)
│   ├── Bewegung (links, rechts, springen)
│   ├── Leben (energy)
│   └── Animationen
│
├── Level
│   ├── Hintergrund
│   ├── Gegner
│   ├── Münzen
│   └── Tränke
│
├── CollisionManager
│   ├── Prüft Kollisionen mit Gegnern
│   ├── Prüft Sammeln von Münzen
│   └── Prüft Sammeln von Tränken
│
└── Statusanzeigen
    ├── Lebensleiste (StatusBar)
    └── Magieleiste (MagicBar)
```

## 2. Vererbungshierarchie

```
DrawableObject (Basis für alles was gezeichnet wird)
└── MovableObject (Alles was sich bewegen kann)
    ├── Character (Spielfigur)
    │   ├── Mage (Magier)
    │   └── Rogue (Schurke)
    │
    ├── EnemiesAnt (Gegner)
    └── Item (Sammelbare Gegenstände)
        ├── Coin (Münzen)
        └── Bottle (Tränke)
```

## 3. Spielablauf und Logik

### Der Spiel-Loop
1. Welt wird initialisiert (`World` erstellt)
2. Spielfigur wird erstellt (`Character`)
3. Level wird geladen (`Level1`)
4. Endlosschleife startet:
   - Eingaben prüfen
   - Positionen aktualisieren
   - Kollisionen prüfen
   - Alles neu zeichnen
   - Auf nächsten Frame warten

### Tastatureingaben
```javascript
// Keyboard-Klasse speichert Tastenzustände
class Keyboard {
    RIGHT = false;  // Pfeiltaste rechts
    LEFT = false;   // Pfeiltaste links
    SPACE = false;  // Leertaste (Springen)
    X = false;      // X-Taste (Magie)
}
```

## 4. Datenfluss bei Aktionen

### A) Spieler bewegt sich:
```
Tastendruck (keyboard.LEFT/RIGHT)
  → World erkennt Tastendruck
    → Character.moveLeft()/moveRight()
      → Position ändert sich
        → World zeichnet alles neu
```

### B) Trank aufsammeln:
```
Character berührt Trank
  → CollisionManager erkennt Berührung
    → handleBottleCollection() wird ausgeführt
      → Trank verschwindet (bottle.collect())
      → MagicBar wird aufgefüllt (magicBar.addMagic())
```

### C) Magie benutzen:
```
Tastendruck (keyboard.X)
  → World erkennt X-Taste
    → Prüft ob genug Magie vorhanden
      → Erstellt Feuerball (ThrowableObject)
      → Reduziert Magie (magicBar.useMagic())
```

## 5. Wichtige Klassen im Detail

### DrawableObject (Basis-Klasse)
- Grundlegende Eigenschaften:
  ```javascript
  x = 0;          // Position X
  y = 0;          // Position Y
  img;            // Bild
  height = 150;   // Höhe
  width = 100;    // Breite
  ```
- Methoden zum Laden und Zeichnen von Bildern
- Alle sichtbaren Objekte erben von dieser Klasse

### MovableObject (Bewegliche Objekte)
- Erbt von DrawableObject
- Zusätzliche Eigenschaften:
  ```javascript
  speed = 0.15;      // Bewegungsgeschwindigkeit
  speedY = 0;        // Vertikale Geschwindigkeit
  acceleration = 1;  // Beschleunigung (für Sprünge)
  energy = 100;      // Lebenspunkte
  ```
- Behandelt Schwerkraft und Kollisionen

### World (Spielwelt)
- Ist der "Container" für alles
- Koordiniert alle Aktionen
- Zeichnet alle Elemente
- Verwaltet Kamera-Position

### Character (Spielfigur)
- Hat Position (x, y)
- Hat Energie (energy)
- Kann sich bewegen
- Hat verschiedene Animationen

### CollisionManager (Kollisionsprüfung)
- Prüft alle Berührungen
- Löst Aktionen bei Kollisionen aus
- Verwaltet Sammel-Aktionen

### MagicBar (Magieleiste)
- Speichert Magie-Energie (percentage)
- Wird durch Tränke aufgefüllt
- Wird durch Zauber verbraucht

## 4. Code-Beispiele mit Erklärung

### Bewegung des Charakters:
```javascript
// In World-Klasse
if (this.keyboard.RIGHT) {
    this.character.moveRight(); // Bewegt Charakter
    this.camera_x = -this.x + 150; // Bewegt Kamera mit
}
```

### Trank aufsammeln:
```javascript
// In CollisionManager
handleBottleCollection(bottle) {
    bottle.collect(); // Trank verschwindet
    this.world.magicBar.addMagic(16.67); // Magie +16.67%
}
```

### Magie benutzen:
```javascript
// In World-Klasse
if (this.keyboard.X && this.magicBar.percentage > 0) {
    // Erstellt Feuerball
    let fire = new ThrowableObject(this.character.x, this.character.y);
    // Reduziert Magie
    this.magicBar.useMagic(1);
}
```

## 6. Animation und Grafik

### Wie funktionieren Animationen?
```javascript
// Beispiel für Geh-Animation
IMAGES_WALKING = [
    'walk1.png',  // Bild 1
    'walk2.png',  // Bild 2
    'walk3.png',  // Bild 3
    // ...
];

// Animation abspielen
playAnimation(images) {
    let index = this.currentImage % images.length;
    let path = images[index];
    this.img = this.imageCache[path];
    this.currentImage++;
}
```

### Kamera-System
- Die Kamera folgt dem Spieler
- Implementiert in der World-Klasse:
  ```javascript
  camera_x = -this.character.x + 150;
  ```
- Verschiebt alle Objekte relativ zur Kamera

## 7. Kollisionssystem

### Wie werden Kollisionen erkannt?
```javascript
isColliding(object) {
    return (
        this.x + this.width > object.x &&
        this.y + this.height > object.y &&
        this.x < object.x + object.width &&
        this.y < object.y + object.height
    );
}
```

### Arten von Kollisionen
1. Charakter ↔ Gegner (Schaden)
2. Charakter ↔ Münze (Sammeln)
3. Charakter ↔ Trank (Magie auffüllen)
4. Zauber ↔ Gegner (Schaden)

## 8. Magie-System im Detail

### MagicBar
- Speichert aktuellen Magie-Stand (0-100%)
- Wird durch Tränke aufgefüllt
- Wird durch Zauber verbraucht

### Zauber (ThrowableObject)
- Wird erstellt wenn X gedrückt wird
- Bewegt sich horizontal
- Verbraucht Magie
- Kann Gegner schädigen

## 9. Level-System

### Level-Aufbau
```javascript
const level1 = new Level(
    [gegner],           // Array mit Gegnern
    [wolken],           // Hintergrundobjekte
    [hintergrund],      // Hintergrundbilder
    [münzen],           // Sammelbare Münzen
    [tränke]            // Sammelbare Tränke
);
```

### Parallax-Scrolling
- Verschiedene Ebenen bewegen sich unterschiedlich schnell
- Erzeugt Tiefeneffekt
- Implementiert durch verschiedene Bewegungsgeschwindigkeiten

## 10. Dateisystem-Struktur

```
js/
├── core/
│   ├── world.class.js         (Hauptspiellogik)
│   ├── collision-manager.js   (Kollisionserkennung)
│   ├── magicbar.class.js     (Magie-System)
│   └── statusbar.class.js     (Lebensanzeige)
│
├── models/
│   ├── bottle.class.js        (Tränke)
│   ├── coin.class.js         (Münzen)
│   └── movable-object.class.js (Basis für bewegliche Objekte)
│
└── characters/
    ├── character.class.js     (Basis-Charakterklasse)
    ├── player/               (Spielbare Charaktere)
    └── enemies.class.js      (Gegner)
```
