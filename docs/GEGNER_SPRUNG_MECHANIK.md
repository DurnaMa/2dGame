# Gegner-Sprung-Mechanik Implementation

## 1. Beteiligte Klassen und ihre Rollen

```
CollisionManager (js/core/collision-manager.class.js)
├── Prüft ob Spieler von oben auf Gegner springt
├── Löst Tod des Gegners aus (stompEnemy)
└── Gibt Aufwärts-Impuls an Spieler (JUMP_BOUNCE_POWER)

Character (js/characters/character.class.js)
├── Position (x, y)
├── Geschwindigkeit (speedY)
├── Offset-Werte für präzise Hitbox
└── Ist am Fallen? (speedY < 0)

Enemy (js/core/enemy.class.js)
├── isDead Status
├── Offset-Werte für präzise Hitbox
└── handleDeathAnimation() für Todes-Animation
```

## 2. Logik der Kollisionsprüfung

Die Sprung-Kill-Erkennung besteht aus **drei einzelnen Prüfungen**, die alle `true` ergeben müssen:

```javascript
isJumpingOnEnemy(character, enemy) {
  const falling    = this.isPlayerFalling(character);        // 1. Spieler fällt
  const aboveMiddle = this.isPlayerAboveFalling(character, enemy); // 2. Über Gegnermitte
  const feetHitHead = this.isFeetHitEnemyHead(character, enemy);  // 3. Füße treffen Kopf
  return falling && aboveMiddle && feetHitHead;
}
```

### 2.1 Spieler fällt (`isPlayerFalling`)

```javascript
isPlayerFalling(character) {
  return character.speedY < 0;
}
```

### 2.2 Spieler ist über der Gegnermitte (`isPlayerAboveFalling`)

```javascript
isPlayerAboveFalling(character, enemy) {
  const playerMiddle = character.y + character.height / Config.HALF;
  const enemyMiddle  = enemy.y + enemy.height / Config.HALF;
  return playerMiddle < enemyMiddle;
}
```

### 2.3 Füße treffen Gegnerkopf (`isFeetHitEnemyHead`)

Berücksichtigt die **Offset-Werte** beider Objekte für eine präzise Hitbox:

```javascript
isFeetHitEnemyHead(character, enemy) {
  const enemyTop       = enemy.y + enemy.offset.top;
  const characterFeet  = character.y + character.height - character.offset.bottom;
  const distanceFeetToHead = characterFeet - enemyTop;
  return distanceFeetToHead >= 0 && distanceFeetToHead <= Config.COLLISION.JUMP_KILL_HEIGHT_MAX;
}
```

## 3. Kollisionsbehandlung

### Sprung-Kill (`stompEnemy`)

Wenn der Spieler erfolgreich auf einen Gegner springt:

```javascript
stompEnemy(enemy, character) {
  enemy.isDead = true;                                    // Gegner stirbt
  character.speedY += Config.COLLISION.JUMP_BOUNCE_POWER; // Aufwärts-Impuls
  character.hit = true;                                   // Kurze Unverwundbarkeit
  setTimeout(() => {
    character.hit = false;
  }, Config.COLLISION.INVULNERABILITY_SHORT);
}
```

### Normaler Treffer (`applyEnemyDamage`)

Bei seitlicher Kollision erleidet der Spieler Schaden:

```javascript
applyEnemyDamage(character) {
  if (!character.hit && !character.isDeath()) {
    character.hit = true;
    this.world.statusBar.reduceHealthBy(character, Config.COLLISION.DAMAGE_NORMAL);
    character.lastHit = new Date().getTime();
    setTimeout(() => {
      character.hit = false;
    }, Config.COLLISION.INVULNERABILITY_LONG);
  }
}
```

## 4. Gesamter Ablauf

```
Spieler kollidiert mit Gegner
    ↓
handleEnemyCollision(enemy)
    ↓
Gegner schon tot? → Ja → Nichts tun
    ↓ Nein
isJumpingOnEnemy() prüft 3 Bedingungen:
    ├── isPlayerFalling()        → speedY < 0?
    ├── isPlayerAboveFalling()   → Spielermitte < Gegnermitte?
    └── isFeetHitEnemyHead()     → Füße-zu-Kopf Abstand ≤ MAX?
    ↓
    ├── Alle 3 = true  → stompEnemy() → Gegner stirbt + Bounce
    └── Sonst          → applyEnemyDamage() → Spieler verliert HP
```

## 5. Cleanup

Tote Gegner werden regelmäßig aus dem Level entfernt:

```javascript
cleanupDeadEnemies() {
  this.world.level.enemies = this.world.level.enemies.filter(
    (enemy) => !enemy.markedForRemoval
  );
}
```

## 6. Wichtige Config-Werte

| Config-Schlüssel                         | Bedeutung                                       |
| :--------------------------------------- | :---------------------------------------------- |
| `Config.COLLISION.JUMP_KILL_HEIGHT_MAX`  | Max. Abstand Füße-zu-Kopf für gültigen Sprung   |
| `Config.COLLISION.JUMP_BOUNCE_POWER`     | Aufwärts-Impuls nach Sprung-Kill                 |
| `Config.COLLISION.INVULNERABILITY_SHORT` | Kurze Unverwundbarkeit nach Sprung-Kill (ms)     |
| `Config.COLLISION.INVULNERABILITY_LONG`  | Längere Unverwundbarkeit nach Treffer (ms)       |
| `Config.COLLISION.DAMAGE_NORMAL`         | Schaden durch normalen Gegner                    |
| `Config.COLLISION.DAMAGE_BOSS`           | Schaden durch Endboss                            |