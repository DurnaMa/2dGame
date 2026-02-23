# JSDoc – Methoden-Dokumentation

---

## DrawableObject

| Methode                    | Parameter                               | Rückgabe | Beschreibung                                                 |
| -------------------------- | --------------------------------------- | -------- | ------------------------------------------------------------ |
| `loadImage(path)`          | `{string} path` – Pfad zur Bilddatei    | –        | Lädt ein einzelnes Bild.                                     |
| `draw(ctx)`                | `{CanvasRenderingContext2D} ctx`        | –        | Zeichnet das Objekt auf das Canvas.                          |
| `loadImages(arr)`          | `{string[]} arr` – Array von Bildpfaden | –        | Lädt mehrere Bilder in den Cache.                            |
| `drawBorder(ctx)`          | `{CanvasRenderingContext2D} ctx`        | –        | Zeichnet den äußeren Rahmen (nur Debug).                     |
| `drawCollisionBorder(ctx)` | `{CanvasRenderingContext2D} ctx`        | –        | Zeichnet den Kollisionsrahmen (nur Debug).                   |
| `drawCollisionMagic(ctx)`  | `{CanvasRenderingContext2D} ctx`        | –        | Zeichnet den Kollisionsrahmen für Magie-Objekte (nur Debug). |

---

## MovableObject _extends DrawableObject_

| Methode                      | Parameter                       | Rückgabe    | Beschreibung                                     |
| ---------------------------- | ------------------------------- | ----------- | ------------------------------------------------ |
| `applyGravity()`             | –                               | –           | Wendet Gravitation über ein Intervall an.        |
| `checkJumpReset()`           | –                               | –           | Setzt den Sprungzustand beim Landen zurück.      |
| `isAboveGround()`            | –                               | `{boolean}` | Prüft ob das Objekt über dem Boden ist.          |
| `isColliding(movableObject)` | `{MovableObject} movableObject` | `{boolean}` | Prüft Kollision mit einem anderen Objekt.        |
| `moveLeft()`                 | –                               | –           | Bewegt das Objekt nach links.                    |
| `moveRight()`                | –                               | –           | Bewegt das Objekt nach rechts.                   |
| `jump()`                     | –                               | –           | Lässt das Objekt springen.                       |
| `playAnimation(images)`      | `{string[]} images` – Bildpfade | –           | Spielt eine Animation ab.                        |
| `playItems(images)`          | `{string[]} images` – Bildpfade | –           | Spielt eine Item-Animation ab.                   |
| `hit()`                      | –                               | –           | Reduziert die Energie bei einem Treffer.         |
| `isHurt()`                   | –                               | `{boolean}` | Prüft ob das Objekt kürzlich getroffen wurde.    |
| `isIdle()`                   | –                               | `{boolean}` | Prüft ob das Objekt seit 3 Sekunden inaktiv ist. |

---

## Character _extends MovableObject_

| Methode                               | Parameter                              | Rückgabe    | Beschreibung                                                       |
| ------------------------------------- | -------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `isDeath()`                           | –                                      | `{boolean}` | Prüft ob der Charakter tot ist.                                    |
| `animate()`                           | –                                      | –           | Startet Bewegungs- und Animations-Intervalle.                      |
| `handleMovement()`                    | –                                      | –           | Verarbeitet die Bewegung pro Frame.                                |
| `updateArrowKeys()`                   | –                                      | –           | Aktualisiert die Position anhand der Pfeiltasten.                  |
| `handleAnimation()`                   | –                                      | –           | Verarbeitet Animations-Updates.                                    |
| `animateSetInterval()`                | –                                      | –           | Wählt und spielt die richtige Animation basierend auf dem Zustand. |
| `handleJumpAnimation()`               | –                                      | –           | Verarbeitet die Sprung-Animation.                                  |
| `triggerTrackedTimeout(spacePressed)` | `{number} spacePressed` – Intervall-ID | –           | Setzt die Sprung-Animation nach einem Timeout zurück.              |

---

## Rogue _extends Character_

| Methode          | Parameter | Rückgabe | Beschreibung                              |
| ---------------- | --------- | -------- | ----------------------------------------- |
| `shooting()`     | –         | –        | Spielt den Schuss-Sound ab.               |
| `jumpSound()`    | –         | –        | Spielt den Sprung-Sound ab.               |
| `walkingSound()` | –         | –        | Spielt den Lauf-Sound mit Verzögerung ab. |

---

## Enemy _extends MovableObject_

| Methode                     | Parameter | Rückgabe    | Beschreibung                                          |
| --------------------------- | --------- | ----------- | ----------------------------------------------------- |
| `getDistanceToCharacter()`  | –         | `{number}`  | Gibt die Distanz zum Charakter zurück.                |
| `getDirectionToCharacter()` | –         | `{number}`  | Gibt die Richtung zum Charakter zurück.               |
| `isCharacterNear()`         | –         | `{boolean}` | Prüft ob der Charakter in der Nähe ist.               |
| `isInAttackRange()`         | –         | `{boolean}` | Prüft ob der Charakter in Angriffs-Reichweite ist.    |
| `chaseCharacter()`          | –         | –           | Bewegt den Gegner Richtung Charakter.                 |
| `startAttack()`             | –         | –           | Startet einen Angriff.                                |
| `endAttack()`               | –         | –           | Beendet den Angriff und startet den Cooldown.         |
| `handleDeathAnimation()`    | –         | –           | Spielt die Todes-Animation und plant die Entfernung.  |
| `remove()`                  | –         | –           | Entfernt den Gegner aus dem Spiel.                    |
| `animate()`                 | –         | –           | Startet Bewegungs- und Animations-Intervalle.         |
| `updateMovement()`          | –         | –           | Aktualisiert die Bewegung pro Frame.                  |
| `updateFacingDirection()`   | –         | –           | Aktualisiert die Blickrichtung zum Charakter.         |
| `updateAnimation()`         | –         | –           | Aktualisiert die Animation basierend auf dem Zustand. |
| `isReadyToAttack()`         | –         | `{boolean}` | Prüft ob der Gegner angriffsbereit ist.               |
| `playAttackAnimation()`     | –         | –           | Spielt die Angriffs-Animation ab.                     |

---

## Endboss _extends Enemy_

| Methode               | Parameter                                               | Rückgabe    | Beschreibung                                          |
| --------------------- | ------------------------------------------------------- | ----------- | ----------------------------------------------------- |
| `animate()`           | –                                                       | –           | Startet Animations- und Bewegungs-Intervalle.         |
| `updateAnimation()`   | –                                                       | –           | Aktualisiert die Animation basierend auf dem Zustand. |
| `updateMovement()`    | –                                                       | –           | Aktualisiert die Bewegung pro Frame.                  |
| `shouldNotMove()`     | –                                                       | `{boolean}` | Prüft ob der Endboss sich nicht bewegen soll.         |
| `triggerIntroAnger()` | –                                                       | –           | Löst die Wut-Animation beim Erstkontakt aus.          |
| `patrol()`            | –                                                       | –           | Bewegt den Endboss im Patrouille-Bereich hin und her. |
| `checkActivation()`   | –                                                       | –           | Prüft ob der Charakter nah genug ist zur Aktivierung. |
| `isDead()`            | –                                                       | `{boolean}` | Prüft ob der Endboss tot ist.                         |
| `hit(damage)`         | `{number} [damage=Config.ENEMY.ENDBOSS.DAMAGE_PER_HIT]` | –           | Fügt dem Endboss Schaden zu.                          |

---

## CollisionManager

| Methode                                  | Parameter                                | Rückgabe    | Beschreibung                                         |
| ---------------------------------------- | ---------------------------------------- | ----------- | ---------------------------------------------------- |
| `isPlayerFalling(character)`             | `{Character} character`                  | `{boolean}` | Prüft ob der Spieler fällt.                          |
| `isPlayerAboveFalling(character, enemy)` | `{Character} character`, `{Enemy} enemy` | `{boolean}` | Prüft ob der Spieler über der Mitte des Gegners ist. |
| `isFeetHitEnemyHead(character, enemy)`   | `{Character} character`, `{Enemy} enemy` | `{boolean}` | Prüft ob die Füße den Kopf des Gegners treffen.      |
| `isJumpingOnEnemy(character, enemy)`     | `{Character} character`, `{Enemy} enemy` | `{boolean}` | Prüft ob der Spieler auf den Gegner springt.         |
| `checkAllCollisions()`                   | –                                        | –           | Prüft alle Kollisionstypen.                          |
| `cleanupDeadEnemies()`                   | –                                        | –           | Entfernt tote Gegner aus dem Level.                  |
| `checkEnemyCollisions()`                 | –                                        | –           | Prüft Kollisionen mit Gegnern.                       |
| `checkItemCollisions()`                  | –                                        | –           | Prüft Kollisionen mit Items.                         |
| `checkEndbossCollisions()`               | –                                        | –           | Prüft Kollisionen mit dem Endboss.                   |
| `handleEnemyCollision(enemy)`            | `{Enemy} enemy`                          | –           | Verarbeitet eine Gegner-Kollision.                   |
| `stompEnemy(enemy, character)`           | `{Enemy} enemy`, `{Character} character` | –           | Tötet einen Gegner durch Draufspringen.              |
| `applyEnemyDamage(character)`            | `{Character} character`                  | –           | Fügt dem Charakter Schaden durch einen Gegner zu.    |
| `handleCoinCollection(coin)`             | `{Coin} coin`                            | –           | Verarbeitet das Einsammeln einer Münze.              |
| `handleBottleCollection(bottle)`         | `{Bottle} bottle`                        | –           | Verarbeitet das Einsammeln einer Flasche.            |
| `handleEndbossCollision(endBoss)`        | `{Endboss} endBoss`                      | –           | Verarbeitet eine Endboss-Kollision.                  |
| `checkProjectileEnemyCollisions()`       | –                                        | –           | Prüft Projektil-Gegner-Kollisionen.                  |
| `handleProjectileCollision(projectile)`  | `{ThrowableObject} projectile`           | `{boolean}` | Prüft ob ein Projektil etwas getroffen hat.          |
| `hitEnemy(projectile)`                   | `{ThrowableObject} projectile`           | `{boolean}` | Prüft ob ein Projektil einen Gegner trifft.          |
| `hitEndBoss(projectile)`                 | `{ThrowableObject} projectile`           | `{boolean}` | Prüft ob ein Projektil den Endboss trifft.           |
| `isOutOfBounds(projectile)`              | `{ThrowableObject} projectile`           | `{boolean}` | Prüft ob ein Projektil außerhalb des Canvas ist.     |

---

## World

| Methode                                            | Parameter                       | Rückgabe    | Beschreibung                                    |
| -------------------------------------------------- | ------------------------------- | ----------- | ----------------------------------------------- |
| `setWorld()`                                       | –                               | –           | Setzt die Welt-Referenz auf alle Spielobjekte.  |
| `drawObjectLvel(setWorldOnArray)`                  | `{Function} setWorldOnArray`    | –           | Setzt die Welt-Referenz auf alle Level-Objekte. |
| `run()`                                            | –                               | –           | Startet die Haupt-Spielschleife.                |
| `checkThrowableObject()`                           | –                               | –           | Prüft ob der Spieler ein Projektil abfeuert.    |
| `draw()`                                           | –                               | –           | Zeichnet alle Spielobjekte auf das Canvas.      |
| `addToMap(movableObject)`                          | `{MovableObject} movableObject` | –           | Fügt ein Objekt zur Canvas-Map hinzu.           |
| `updateMovableObjectOtherDirection(movableObject)` | `{MovableObject} movableObject` | –           | Zeichnet das Objekt gespiegelt wenn nötig.      |
| `addObjectsToMap(objects)`                         | `{MovableObject[]} objects`     | –           | Fügt ein Array von Objekten zur Map hinzu.      |
| `stopGame()`                                       | –                               | –           | Stoppt die Spielschleife und alle Intervalle.   |
| `isGameOver()`                                     | –                               | `{boolean}` | Prüft ob das Spiel vorbei ist.                  |
| `isWin()`                                          | –                               | `{boolean}` | Prüft ob der Spieler gewonnen hat.              |

---

## EndScreen

| Methode                                                     | Parameter                                                                                          | Rückgabe    | Beschreibung                                    |
| ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------- | ----------------------------------------------- |
| `draw()`                                                    | –                                                                                                  | –           | Zeichnet den End-Screen mit Overlay und Button. |
| `drawButton()`                                              | –                                                                                                  | –           | Zeichnet den Restart-Button.                    |
| `roundRect(ctx, x, y, width, height, radius, fill, stroke)` | `{CanvasRenderingContext2D} ctx`, `{number} x, y, width, height, radius`, `{boolean} fill, stroke` | –           | Zeichnet ein abgerundetes Rechteck.             |
| `isButtonClicked(x, y)`                                     | `{number} x, y`                                                                                    | `{boolean}` | Prüft ob der Button geklickt wurde.             |
| `checkHover(x, y)`                                          | `{number} x, y`                                                                                    | –           | Aktualisiert den Hover-Zustand.                 |
| `hide()`                                                    | –                                                                                                  | –           | Versteckt den Screen.                           |
| `show()`                                                    | –                                                                                                  | –           | Zeigt den Screen an.                            |

---

## StartScreen

| Methode                 | Parameter       | Rückgabe    | Beschreibung                                           |
| ----------------------- | --------------- | ----------- | ------------------------------------------------------ |
| `draw()`                | –               | –           | Zeichnet den Start-Screen mit Overlay und Play-Button. |
| `drawButton()`          | –               | –           | Zeichnet den Play-Button.                              |
| `isButtonClicked(x, y)` | `{number} x, y` | `{boolean}` | Prüft ob der Button geklickt wurde.                    |
| `checkHover(x, y)`      | `{number} x, y` | –           | Aktualisiert den Hover-Zustand.                        |
| `hide()`                | –               | –           | Versteckt den Screen.                                  |
| `show()`                | –               | –           | Zeigt den Screen an.                                   |

---

## SoundManagerClass

| Methode                             | Parameter                                                                | Rückgabe    | Beschreibung                                        |
| ----------------------------------- | ------------------------------------------------------------------------ | ----------- | --------------------------------------------------- |
| `addSound(name, src, volume, loop)` | `{string} name`, `{string} src`, `{number} [volume]`, `{boolean} [loop]` | –           | Fügt einen neuen Sound hinzu.                       |
| `playSound(name, delay)`            | `{string} name`, `{number} [delay=0]`                                    | –           | Spielt einen Sound ab.                              |
| `stop(name)`                        | `{string} name`                                                          | –           | Stoppt einen Sound.                                 |
| `initButton(canvas)`                | `{HTMLCanvasElement} canvas`                                             | –           | Initialisiert den Mute-Button auf dem Canvas.       |
| `drawButton()`                      | –                                                                        | –           | Zeichnet den Mute/Unmute-Button.                    |
| `checkButtonHover(px, py)`          | `{number} px, py`                                                        | –           | Prüft ob die Maus über dem Button ist.              |
| `isButtonClicked(px, py)`           | `{number} px, py`                                                        | `{boolean}` | Prüft ob der Button geklickt wurde.                 |
| `isButtonHovered()`                 | –                                                                        | `{boolean}` | Gibt zurück ob der Button gehovert wird.            |
| `setButtonMuted(muted)`             | `{boolean} muted`                                                        | –           | Setzt den visuellen Mute-Zustand.                   |
| `static setMuted(value)`            | `{boolean} value`                                                        | –           | Setzt den globalen Mute-Zustand für alle Instanzen. |
| `static toggleMuted()`              | –                                                                        | –           | Wechselt den globalen Mute-Zustand.                 |
| `static isMuted()`                  | –                                                                        | `{boolean}` | Gibt den aktuellen Mute-Zustand zurück.             |

---

## Statusbar _extends DrawableObject_

| Methode                             | Parameter                                  | Rückgabe   | Beschreibung                                         |
| ----------------------------------- | ------------------------------------------ | ---------- | ---------------------------------------------------- |
| `reduceHealth(character)`           | `{Character} character`                    | –          | Zieht eine Stufe (20%) von der Statusbar ab.         |
| `reduceHealthBy(character, amount)` | `{Character} character`, `{number} amount` | –          | Zieht einen kleineren Betrag ab (z.B. Boss-Schaden). |
| `setPercentage(percentage)`         | `{number} percentage`                      | –          | Setzt den Prozentwert und aktualisiert das Bild.     |
| `resolveImageIndex()`               | –                                          | `{number}` | Gibt den Bildindex basierend auf dem Prozent zurück. |

---

## Magicbar _extends DrawableObject_

| Methode                     | Parameter             | Rückgabe | Beschreibung                                     |
| --------------------------- | --------------------- | -------- | ------------------------------------------------ |
| `addMagic(amount)`          | `{number} [amount]`   | –        | Fügt Magie hinzu beim Einsammeln einer Flasche.  |
| `useMagic(amount)`          | `{number} [amount]`   | –        | Verbraucht Magie beim Abfeuern eines Projektils. |
| `setPercentage(percentage)` | `{number} percentage` | –        | Setzt den Prozentwert und aktualisiert das Bild. |

---

## Level

| Methode               | Parameter | Rückgabe | Beschreibung                          |
| --------------------- | --------- | -------- | ------------------------------------- |
| `initializeCoins()`   | –         | –        | Startet die Animation aller Münzen.   |
| `initializeBottles()` | –         | –        | Startet die Animation aller Flaschen. |

---

## Item _extends MovableObject_

| Methode         | Parameter | Rückgabe    | Beschreibung                          |
| --------------- | --------- | ----------- | ------------------------------------- |
| `collect()`     | –         | –           | Markiert das Item als eingesammelt.   |
| `isCollected()` | –         | `{boolean}` | Prüft ob das Item eingesammelt wurde. |
| `isVisible()`   | –         | `{boolean}` | Prüft ob das Item sichtbar ist.       |

---

## Coin _extends Item_

| Methode     | Parameter | Rückgabe | Beschreibung                             |
| ----------- | --------- | -------- | ---------------------------------------- |
| `animate()` | –         | –        | Startet die Dreh-Animation der Münze.    |
| `collect()` | –         | –        | Sammelt die Münze ein und versteckt sie. |

---

## Bottle _extends Item_

| Methode     | Parameter | Rückgabe | Beschreibung                    |
| ----------- | --------- | -------- | ------------------------------- |
| `animate()` | –         | –        | Startet die Flaschen-Animation. |

---

## BackgroundObject _extends MovableObject_

| Methode     | Parameter                        | Rückgabe | Beschreibung                                   |
| ----------- | -------------------------------- | -------- | ---------------------------------------------- |
| `draw(ctx)` | `{CanvasRenderingContext2D} ctx` | –        | Zeichnet das Hintergrundobjekt auf das Canvas. |

---

## ThrowableObject _extends MovableObject_

| Methode  | Parameter | Rückgabe | Beschreibung                                         |
| -------- | --------- | -------- | ---------------------------------------------------- |
| `trow()` | –         | –        | Wirft den Feuerball in Blickrichtung des Charakters. |

---

## Globale Funktionen (game.js)

| Funktion                                    | Parameter                                                  | Rückgabe   | Beschreibung                                         |
| ------------------------------------------- | ---------------------------------------------------------- | ---------- | ---------------------------------------------------- |
| `setTrackedInterval(fn, time, description)` | `{Function} fn`, `{number} time`, `{string} [description]` | `{number}` | Setzt ein Intervall und trackt es global.            |
| `setTrackedTimeout(fn, time, description)`  | `{Function} fn`, `{number} time`, `{string} [description]` | `{number}` | Setzt ein Timeout und trackt es global.              |
| `stopAllIntervals()`                        | –                                                          | –          | Stoppt alle getrackten Intervalle und Timeouts.      |
| `init()`                                    | –                                                          | –          | Initialisiert das Spiel, Canvas, Screens und Events. |
| `animateUI()`                               | –                                                          | –          | Zentrale Animations-Schleife für Spiel und UI.       |
| `checkGameState()`                          | –                                                          | –          | Prüft ob das Spiel vorbei oder gewonnen ist.         |
| `endGame(screen)`                           | `{EndScreen} screen`                                       | –          | Beendet das Spiel und zeigt den Screen an.           |
| `handleMouseMove(event)`                    | `{MouseEvent} event`                                       | –          | Verarbeitet Mausbewegungen für Hover-Effekte.        |
| `handleClick(event)`                        | `{PointerEvent} event`                                     | –          | Verarbeitet Klick-Events auf dem Canvas.             |
| `startGame()`                               | –                                                          | –          | Startet das Spiel nach Klick auf den Play-Button.    |
| `restartGame()`                             | –                                                          | –          | Startet das Spiel neu.                               |
| `initButtonPressEvents()`                   | –                                                          | –          | Initialisiert Touch-Controls für mobile Buttons.     |

---

## Globale Funktionen (level1.js)

| Funktion                                                                   | Parameter                                                                                             | Rückgabe               | Beschreibung                                                   |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------- |
| `spawnEnemies()`                                                           | –                                                                                                     | –                      | Spawnt Gegner und den Endboss über die Level-Sektionen.        |
| `spawnItem()`                                                              | –                                                                                                     | –                      | Spawnt Münzen und Flaschen über die Level-Sektionen.           |
| `getXPosition(index)`                                                      | `{number} index`                                                                                      | `{number}`             | Gibt eine zufällige X-Position innerhalb einer Sektion zurück. |
| `createBackgroundLayer(imagePath, SECTIONCOUNT, width, yOffset, parallax)` | `{string} imagePath`, `{number} SECTIONCOUNT, width`, `{number} [yOffset=1]`, `{number} [parallax=1]` | `{BackgroundObject[]}` | Erstellt einen Hintergrund-Layer mit gekachelten Objekten.     |
| `initLevel1()`                                                             | –                                                                                                     | –                      | Initialisiert Level 1 mit allen Spielobjekten.                 |
