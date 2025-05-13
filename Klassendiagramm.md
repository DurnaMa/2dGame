# Klassendiagramm Zusammenfassung

## Klassenbeschreibungen

Hier sind die im Diagramm definierten Klassen mit ihren Attributen und Methoden. Die Symbole `+`, `-` und `#` deuten auf die Sichtbarkeit hin (public, private, protected).

---

### 1. `MoveleObjekt`
* *(Abstrakte Klasse)*
* **Attribute:**
    * `# x: float`
    * `# y: float`
    * `# speed: float`
    * `# sprite: Image`
* **Methoden:**
    * `+ move(): void`
    * `+ update(): void`
    * `+ draw(): void`

---

### 2. `Character`
* **Attribute:**
    * `- health: int`
    * `- coins: int`
    * `- bottles: int`
* **Methoden:**
    * `+ jump(): void`
    * `+ collectItem(Item): void`
    * `+ takeDamage(int): void`

---

### 3. `EnemiesAnt`
* **Attribute:**
    * `- damage: int`
    * `- patrolPoints: Point[]`
* **Methoden:**
    * `+ patrol(): void`
    * `+ attack(Character): void`

---

### 4. `Endboss`
* **Attribute:**
    * `- health: int`
    * `- attackPattern: AttackPattern`
* **Methoden:**
    * `+ specialAttack(): void`
    * `+ changePhase(): void`

---

### 5. `Cloud`
* **Attribute:**
    * `- speed: float`
* **Methoden:**
    * `+ moveHorizontally(): void`

---

### 6. `BackgroundObjeckt`
* **Attribute:**
    * `- parallaxFactor: float`
* **Methoden:**
    * `+ updatePosition(float): void`

---

### 7. `Item`
* *(Abstrakte Klasse)*
* **Attribute:**
    * `# value: int`
* **Methoden:**
    * `+ collect(Character): void`

---

### 8. `Statusbar`
* **Attribute:**
    * `- healthBar: Rectangle`
    * `- coinCounter: Text`
    * `- bottleCounter: Text`
* **Methoden:**
    * `+ updateHealth(int): void`
    * `+ updateCoins(int): void`
    * `+ updateBottles(int): void`
    * `+ draw(): void`

---

### 9. `Coins`
* **Attribute:**
    * *(Keine spezifischen Attribute im Diagramm aufgeführt)*
* **Methoden:**
    * `+ collect(Character): void`

---

### 10. `Bottle`
* **Attribute:**
    * `- healingAmount: int`
* **Methoden:**
    * `+ collect(Character): void`

---

## Beziehungen

### Vererbungsbeziehungen (Ist-ein-Beziehung)

Die folgenden Klassen erben von anderen Klassen (Kindklasse → Elternklasse):

* `Character` → `MoveleObjekt`
* `EnemiesAnt` → `MoveleObjekt`
* `Endboss` → `MoveleObjekt`
* `Cloud` → `MoveleObjekt`
* `BackgroundObjeckt` → `MoveleObjekt`
* `Item` → `MoveleObjekt`
* `Coins` → `Item`
* `Bottle` → `Item`

---

### Assoziationsbeziehungen (Hat-eine-Beziehung oder kennt-eine-Beziehung)

Die folgenden Beziehungen bestehen zwischen den Klassen:

* `Character` **sammelt** `Item`
* `Character` **hat** `Statusbar`
* `EnemiesAnt` **greift an** `Character`
* `Endboss` **bekämpft** `Character`

