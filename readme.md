# Fantasy Platform – 2D Pixel-Art Platformer

> Ein side-scrolling Pixel-Art-Plattformer, entwickelt mit **Vanilla JavaScript** und dem **HTML5 Canvas**.  
> **Einzelprojekt** – die größte Herausforderung war die **Hitbox- und Kollisionserkennung**.

---

## Inhaltsverzeichnis

1. [Über das Spiel](#über-das-spiel)
2. [Features](#features)
3. [Meine Herausforderung – Hitbox & Collision](#meine-herausforderung--hitbox--collision)
4. [Steuerung](#steuerung)
5. [Projektstruktur](#projektstruktur)
6. [Technologien](#technologien)
7. [Starten](#starten)
8. [Erweiterung](#erweiterung)

---

## Über das Spiel

**Fantasy Platform** ist ein 2D-Jump 'n' Run im Pixel-Art-Stil.  
Der Spieler steuert einen Charakter (Rogue) durch eine Fantasy-Welt voller Gegner, Sammelobjekte und einem Endboss.  
Ziel ist es, alle Bosse zu besiegen – oder dabei zu überleben.

---

## Features

| Feature                    | Beschreibung                                                                     |
| :------------------------- | :------------------------------------------------------------------------------- |
| **Charakter-Klassen**      | Rogue & Mage als spielbare Klassen mit eigenen Animationen                       |
| **Gegner-Typen**           | Dragon, BigKnight und ein Endboss mit eigenem Verhalten                          |
| **Magie-System**           | Blaue Tränke sammeln → Magieleiste füllen → Projektile (Feuerbälle) verschießen |
| **Sammelobjekte**          | Münzen (Punkte) und Tränke (Magie-Energie)                                       |
| **Sprung-Kill-Mechanik**   | Gegner durch gezieltes Draufspringen besiegen                                    |
| **Parallax-Hintergründe**  | Mehrschichtiger Hintergrund mit Parallax-Scrolling                               |
| **Start- & End-Screens**   | Animierter Startbildschirm, Game-Over- und Sieg-Bildschirm mit Menü/Restart     |
| **Sound-System**           | Hintergrundmusik & Sound-Effekte, Mute-Toggle mit localStorage                  |
| **Mobile-Steuerung**       | Touch-Buttons für Bewegung, Springen und Angriff auf mobilen Geräten             |
| **Responsive**             | Querformat-Erkennung mit Overlay-Hinweis für Mobilgeräte                         |
| **Hitbox-Tester-Tool**     | Eigenes Debug-Tool zum visuellen Anpassen der Hitboxen pro Charakter             |

---

## Meine Herausforderung – Hitbox & Collision

Die größte Herausforderung in diesem Projekt war das **Hitbox- und Kollisionssystem**.  
Pixel-Art-Sprites haben oft große transparente Bereiche um die eigentliche Figur herum.  
Ohne angepasste Hitboxen fühlt sich das Spiel unfair an – der Spieler wird „getroffen", obwohl visuell kein Kontakt bestand.

### Das Problem

Sprites haben eine feste Breite/Höhe (z. B. 200×200 px), aber der eigentliche Charakter nimmt nur einen Teil davon ein.  
Ohne Offset füllt die Kollisionsbox das gesamte Sprite-Rechteck aus.

### Meine Lösung

Jedes Objekt hat ein **Offset-Objekt** (`top`, `left`, `right`, `bottom`), das die Hitbox vom Sprite-Rand nach innen verschiebt:

```javascript
// Beispiel: Rogue
offset = { top: 90, left: 35, right: 90, bottom: 25 };
```

Die Kollisionsprüfung in `movable-object.class.js` berücksichtigt diese Offsets und auch die **Blickrichtung** des Charakters (Spiegelung):

```javascript
isColliding(movableObject) {
  return (
    this.x + this.width - (this.otherDirection ? this.offset.left : this.offset.right) >
      movableObject.x + (movableObject.otherDirection ? movableObject.offset.right : movableObject.offset.left) &&
    this.y + this.height - this.offset.bottom > movableObject.y + movableObject.offset.top &&
    this.x + (this.otherDirection ? this.offset.right : this.offset.left) <
      movableObject.x + movableObject.width -
        (movableObject.otherDirection ? movableObject.offset.left : movableObject.offset.right) &&
    this.y + this.offset.top < movableObject.y + movableObject.height - movableObject.offset.bottom
  );
}
```

### Sprung-Kill-Erkennung

Der `CollisionManager` unterscheidet, ob ein Spieler **von oben** auf einen Gegner springt oder **seitlich** kollidiert:

```javascript
isJumpingOnEnemy(character, enemy) {
  const falling    = this.isPlayerFalling(character);       // speedY < 0
  const aboveMiddle = this.isPlayerAboveFalling(character, enemy); // Spielermitte über Gegnermitte
  const feetHitHead = this.isFeetHitEnemyHead(character, enemy);  // Füße treffen Gegnerkopf
  return falling && aboveMiddle && feetHitHead;
}
```

### Hitbox-Tester-Tool

Um die Offset-Werte visuell zu kalibrieren, habe ich ein eigenes **Hitbox-Tester-Tool** gebaut (`hitBox/`).  
Man kann dort Sprites hochladen, die Offsets per Slider anpassen und sich die resultierende Hitbox in Echtzeit anzeigen lassen.  
Die fertigen Werte lassen sich per Klick als Config-Code kopieren.

> **Öffne:** `hitBox/hitbox-tester.html` im Browser

---

## Steuerung

| Taste                     | Aktion                          |
| :------------------------ | :------------------------------ |
| ← → (Pfeiltasten)        | Bewegen (links / rechts)        |
| Leertaste                 | Springen                        |
| X                         | Magie einsetzen (Feuerball)     |
| M                         | Sound ein-/ausschalten          |

Auf **Mobilgeräten** erscheinen Touch-Buttons am unteren Bildschirmrand.

---

## Projektstruktur

```
fantasy-platformer-pixel-art_2d/
├── index.html                      Einstiegspunkt
├── style.css                       Haupt-Stylesheet
├── media.css                       Responsive / Media Queries
│
├── js/
│   ├── game.js                     Initialisierung, Game-Loop, State-Management
│   ├── core/
│   │   ├── config.class.js         Zentrale Konfigurationswerte
│   │   ├── world.class.js          Spielwelt, Rendering, Kamera
│   │   ├── collision-manager.class.js  Kollisionslogik (Hitbox / Sprung-Kill)
│   │   ├── drawable-object.class.js    Basisklasse: Bilder laden & zeichnen
│   │   ├── keyboard.class.js          Tastatur-Zustand
│   │   ├── level.class.js             Level-Container
│   │   ├── start-screen.class.js      Startbildschirm
│   │   ├── end-screen.class.js        Game-Over & Win Screen
│   │   ├── statusbar.class.js         UI: Lebensleiste
│   │   ├── magicbar.class.js          UI: Magieleiste
│   │   └── sound-manager.class.js     Sound-Verwaltung
│   ├── models/
│   │   ├── movable-object.class.js    Physik, Gravitation, Kollisionsprüfung
│   │   ├── backgroundobject.class.js  Parallax-Hintergrundobjekte
│   │   ├── item.class.js             Basis-Item-Klasse
│   │   ├── coin.class.js             Münzen
│   │   ├── bottle.class.js           Tränke
│   │   └── throwable-object.class.js  Projektile / Feuerbälle
│   ├── characters/
│   │   ├── character.class.js      Spieler-Basisklasse
│   │   ├── endboss.class.js        Endboss
│   │   ├── player/
│   │   │   ├── rogue.class.js      Spieler: Schurke
│   │   │   └── mage.class.js       Spieler: Magier
│   │   └── enemies/
│   │       ├── bigKnight.class.js  Gegner: Ritter
│   │       └── dragon.class.js     Gegner: Drache
│   └── levels/
│       └── level1.js               Level-1-Definition
│
├── hitBox/                         Hitbox-Tester-Tool (Debug)
├── assets/                         Alle Pixel-Art-Sprites, Sounds, Hintergründe
├── docs/                           Technische Dokumentation
├── fonts/                          Schriftarten
├── impressum/                      Impressum
└── templates/                      HTML-Vorlagen
```

---

## Technologien

- **JavaScript** (ES6+, OOP mit Klassen)
- **HTML5 Canvas** (Rendering)
- **CSS3** (UI, Media Queries, Mobile-Steuerung)
- Kein Framework – alles **Vanilla**

---

## Starten

1. Repository klonen oder herunterladen
2. `index.html` im Browser öffnen
3. Auf „Start" klicken und spielen!

> Für den Hitbox-Tester: `hitBox/hitbox-tester.html` öffnen.

---

## Erweiterung

- **Neues Level:** Datei in `js/levels/` anlegen und in `index.html` einbinden
- **Neue Figur:** Klasse in `js/characters/player/` oder `js/characters/enemies/` erstellen
- **Neues Item:** Klasse in `js/models/` erstellen, die von `Item` erbt
- **Neuer Screen:** Subklasse von `EndScreen` in `js/core/` anlegen

---

## Dokumentation

Weitere technische Details findest du im `docs/`-Ordner:

| Datei                        | Thema                                               |
| :--------------------------- | :-------------------------------------------------- |
| `PROJEKTSTRUKTUR.md`         | Detaillierte Klassen- und Vererbungshierarchie       |
| `SPIELANLEITUNG.md`          | Spielanleitung & Debugging-Tipps                     |
| `GEGNER_SPRUNG_MECHANIK.md`  | Implementierungsdetails der Sprung-Kill-Mechanik     |
| `GAME_OVER_WIN_ARCHITECTURE.md` | End-Screen-Architektur & State-Management         |
| `JSDOC.md`                   | JSDoc-Referenz aller Klassen und Methoden            |

---

*© 2026 Fantasy Platform*
