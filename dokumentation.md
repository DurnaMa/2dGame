# Softwaresystem Dokumentation (UML 2.5 Beschreibung)

Diese Dokumentation beschreibt die Struktur des Softwaresystems basierend auf den bereitgestellten JavaScript-Dateien. Die Beschreibung orientiert sich
am UML 2.5 Klassendiagrammformat.

## Klassenübersicht

Im System wurden die folgenden Klassen identifiziert:

- `MoveleObjekt` (Basisklasse, Details abgeleitet aus Nutzung)
- `BackgroundObjeckt`
- `Item`
- `Bottle`
- `Coins`
- `Character`
- `Cloud`
- `Endboss`
- `EnemiesAnt`
- `Keyboard`
- `Level`
- `Statusbar`
- `World`

---

## Klassendetails

### Klasse: MoveleObjekt

- **Basisklasse:** (Scheint die Basisklasse für alle beweglichen Objekte zu sein. Enthält wahrscheinlich grundlegende Eigenschaften wie Position, Größe, Bildverwaltung und Methoden für Bewegung, Animation, Kollision und Gravitation, basierend auf der Nutzung in abgeleiteten Klassen.)

---

### Klasse: BackgroundObjeckt

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert statische oder sich bewegende Hintergrundobjekte.
- **Attribute:**
  - `width: number`
  - `height: number`
  - `x: number`
  - `y: number`
- **Methoden:**
  - `constructor(imgePath: string, x: number, y: number)`

---

### Klasse: Item

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Basisklasse für sammelbare Gegenstände im Spiel.
- **Attribute:**
  - `y: number`
  - `height: number`
  - `width: number`
  - `collected: boolean = false`
- **Methoden:**
  - `constructor()`
  - `collect(): void`
  - `isCollected(): boolean`

---

### Klasse: Bottle

- **Basisklasse:** `Item`
- **Beschreibung:** Repräsentiert eine sammelbare Flasche.
- **Attribute:**
  - `ITEMS: string[]` (Array von Bildpfaden für Animation)
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Startet die Animation der Flasche)

---

### Klasse: Coins

- **Basisklasse:** `Item`
- **Beschreibung:** Repräsentiert eine sammelbare Münze.
- **Attribute:**
  - `y: number`
  - `height: number`
  - `width: number`
  - `ITEMS: string[]` (Array von Bildpfaden für Animation)
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Startet die Animation der Münze)

---

### Klasse: Character

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert den vom Spieler gesteuerten Charakter.
- **Attribute:**
  - `y: number = 420`
  - `x: number = 0`
  - `height: number = 300`
  - `width: number = 300`
  - `speed: number = 1.5`
  - `IMAGES_WALKING: string[]` (Array von Bildpfaden für Lauf-Animation)
  - `IMAGES_JUPING: string[]` (Array von Bildpfaden für Sprung-Animation)
  - `world: World` (Referenz auf die Spielwelt)
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Steuert Bewegung und Animation basierend auf Eingaben und Zustand)

---

### Klasse: Cloud

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert eine sich bewegende Wolke.
- **Attribute:**
  - `y: number = 550`
  - `width: number = 1200`
  - `height: number = 700`
  - `x: number`
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Startet die Bewegung nach links)

---

### Klasse: Endboss

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert den Endgegner.
- **Attribute:**
  - `height: number = 700`
  - `width: number = 650`
  - `y: number = 116`
  - `x: number = 0`
  - `IMAGES_WALKING: string[]` (Array von Bildpfaden für Lauf-Animation)
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Startet die Lauf-Animation)

---

### Klasse: EnemiesAnt

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert einen Typ von Gegner.
- **Attribute:**
  - `y: number = 350`
  - `x: number = 40`
  - `height: number = 500`
  - `width: number = 500`
  - `IMAGES_WALKING: string[]` (Array von Bildpfaden für Lauf-Animation)
  - `speed: number`
- **Methoden:**
  - `constructor()`
  - `animate(): void` (Steuert Bewegung nach links und Animation)

---

### Klasse: Keyboard

- **Beschreibung:** Verwaltet den Status der Tastatureingaben.
- **Attribute:**
  - `LEFT: boolean = false`
  - `RIGHT: boolean = false`
  - `UP: boolean = false`
  - `DOWN: boolean = false`
  - `SPACE: boolean = false`
- **Methoden:** (Statusänderungen erfolgen über externe Event-Listener)

---

### Klasse: Level

- **Beschreibung:** Definiert die Struktur und den Inhalt eines Spiellevels.
- **Attribute:**
  - `enemiesAnt: EnemiesAnt[] | Endboss[]` (Liste der Gegner im Level)
  - `clouds: Cloud[]` (Liste der Wolken im Level)
  - `backgroundObjecktRocks: BackgroundObjeckt[]` (Liste der Hintergrundobjekte im Level)
  - `level_end_x: number = 3700` (Die x-Koordinate, die das Ende des Levels markiert)
  - `coins: Coins[]` (Liste der Münzen im Level)
  - `bottles: Bottle[]` (Liste der Flaschen im Level)
- **Methoden:**
  - `constructor(enemiesAnt: (EnemiesAnt | Endboss)[], clouds: Cloud[], backgroundObjecktRocks: BackgroundObjeckt[], coins: Coins[], bottles: Bottle[]`
  - `initializeCoins(): void` (Startet die Animationen der Münzen)
  - `initializeBottles(): void` (Startet die Animationen der Flaschen)

---

### Klasse: Statusbar

- **Basisklasse:** `MoveleObjekt`
- **Beschreibung:** Repräsentiert die Statusleiste des Charakters.
- **Attribute:**
  - `y: number = 150`
  - `height: number = 50`
  - `width: number = 50`
  - `CHARACKTER_STATUSBAR: string[]` (Array von Bildpfaden für die Statusleiste)
- **Methoden:**
  - `constructor()`

---

### Klasse: World

- **Beschreibung:** Die Hauptklasse, die den Spielzustand, die Objekte und das Rendering verwaltet.
- **Attribute:**
  - `character: Character`
  - `level: Level`
  - `canvas: HTMLCanvasElement`
  - `ctx: CanvasRenderingContext2D`
  - `keyboard: Keyboard`
  - `camera_x: number = 0` (Kamera-Offset auf der x-Achse)
  - `coins: Coins[]` (Wahrscheinlich Referenz auf `level.coins`)
  - `bottles: Bottle[]` (Wahrscheinlich Referenz auf `level.bottles`)
- **Methoden:**
  - `constructor(canvas: HTMLCanvasElement, keyboard: Keyboard)`
  - `setWorld(): void` (Weist dem Charakter die Welt-Instanz zu)
  - `draw(): void` (Die Haupt-Rendering-Schleife des Spiels)
  - `addToMap(mo: MoveleObjekt): void` (Fügt ein bewegliches Objekt zum Canvas hinzu und handhabt Spiegelung)
  - `filpImage(mo: MoveleObjekt): void` (Spiegelt das Bild eines Objekts horizontal)
  - `filpImageBack(mo: MoveleObjekt): void` (Setzt die Spiegelung zurück)
  - `addObjectesToMap(Objectes: MoveleObjekt[]): void` (Fügt ein Array von Objekten zur Karte hinzu)
  - `addCloudToMap(cloud: Cloud): void` (Spezifische Methode zum Zeichnen einer Wolke)

---

## Beziehungen zwischen Klassen

Basierend auf der Codeanalyse bestehen die folgenden Beziehungen zwischen den Klassen:

- **Komposition/Aggregation:**

  - `Level` **enthält** (`enemiesAnt`, `clouds`, `backgroundObjecktRocks`, `coins`, `bottles`). Der Level verwaltet die Lebensdauer und den Inhalt
    dieser Listen von Objekten.
  - `World` **enthält** (`character`, `level`, `keyboard`, `canvas`, `ctx`). Die `World` ist für die Verwaltung dieser zentralen Spielkomponenten
    verantwortlich.

- **Assoziation:**

  - `Character` **kennt** `World`. Das `Character`-Objekt hat eine Referenz auf das `World`-Objekt (`character.world`), um auf globale
    Spielinformationen wie Tastatureingaben und Level-Ende zugreifen zu können.
  - `World` **kennt** `Character`, `Level`, `Keyboard`. Dies ist eine bidirektionale oder unidirektionale Assoziation, die durch die Attribute in der
    `World`-Klasse dargestellt wird.

- **Vererbung (Generalisierung):**
  - `BackgroundObjeckt` erbt von `MoveleObjekt`.
  - `Item` erbt von `MoveleObjekt`.
  - `Bottle` erbt von `Item`.
  - `Coins` erbt von `Item`.
  - `Character` erbt von `MoveleObjekt`.
  - `Cloud` erbt von `MoveleObjekt`.
  - `Endboss` erbt von `MoveleObjekt`.
  - `EnemiesAnt` erbt von `MoveleObjekt`.
  - `Statusbar` erbt von `MoveleObjekt`.

Diese Dokumentation bietet eine strukturierte Beschreibung der Klassen und ihrer Interaktionen und dient als Grundlage für die Erstellung eines
visuellen UML 2.5 Klassendiagramms.
