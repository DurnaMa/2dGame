# Gegner-Sprung-Mechanik Implementation

## 1. Beteiligte Klassen und ihre Rollen

```
CollisionManager
├── Prüft ob Spieler von oben auf Gegner springt
├── Löst Tod des Gegners aus
└── Gibt kleinen Aufwärts-Impuls an Spieler

Character
├── Position (x, y)
├── Geschwindigkeit (speedY)
└── Ist am Fallen? (speedY < 0)

EnemiesAnt
├── Leben/Status
└── Animation für Tod
```

## 2. Logik der Kollisionsprüfung

```javascript
// Pseudocode für die Kollisionsprüfung
isJumpingOnEnemy(character, enemy) {
    return (
        character.speedY < 0 &&           // Spieler fällt nach unten
        character.y + character.height    // Spielerfüße
        < enemy.y + enemy.height/3 &&    // Oberes Drittel des Gegners
        character.isColliding(enemy)     // Normale Kollision
    );
}
```

## 3. Implementierungsschritte

1. EnemiesAnt erweitern:
   - isDead Status hinzufügen
   - Todes-Animation hinzufügen
   - Kollisionsbox anpassen

2. CollisionManager erweitern:
   - Neue Methode für Sprung-Kollision
   - Unterscheidung zwischen normalem Treffer und Sprung

3. Character erweitern:
   - Aufwärts-Impuls nach Gegner-Sprung
   - Unverwundbarkeit für kurze Zeit

## 4. Beispiel-Implementation

```javascript
// In CollisionManager:
checkEnemyCollisions() {
    this.world.level.enemiesAnt.forEach((enemy) => {
        if (this.world.character.isColliding(enemy)) {
            if (this.isJumpingOnEnemy(this.world.character, enemy)) {
                this.handleEnemyJumpKill(enemy);
            } else {
                this.handleEnemyDamage();
            }
        }
    });
}

handleEnemyJumpKill(enemy) {
    enemy.die();                         // Gegner stirbt
    this.world.character.bounce();       // Spieler springt hoch
    // Optional: Punkte vergeben
}

// In EnemiesAnt:
die() {
    this.isDead = true;
    this.playAnimation(this.IMAGES_DEATH);
    // Nach Animation: this.remove();
}

// In Character:
bounce() {
    this.speedY = 15;  // Kleiner Aufwärts-Impuls
    this.isInvulnerable = true;
    setTimeout(() => {
        this.isInvulnerable = false;
    }, 500);
}
```

## 5. Animationen und Feedback

- Todes-Animation für Gegner
- Aufsprung-Animation für Spieler
- Sound-Effekt beim erfolgreichen Sprung
- Kleine Partikel-Effekte
- Optional: Punkte-Popup

## 6. Zu beachtende Details

1. Timing:
   - Kollisionserkennung muss präzise sein
   - Todes-Animation muss vollständig ablaufen
   - Aufwärts-Impuls muss sich natürlich anfühlen

2. Spielgefühl:
   - Sprung sollte sich befriedigend anfühlen
   - Kollisionsbox muss fair sein
   - Feedback durch Animation/Sound wichtig

3. Edge Cases:
   - Was passiert bei mehreren Gegnern?
   - Wie verhält es sich mit anderen Kollisionen?
   - Spezialfall: Gegner an Kanten