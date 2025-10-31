# Fantasy Platformer - Spielanleitung

## Steuerung
- **Pfeiltasten Links/Rechts**: Bewegung
- **Leertaste**: Springen
- **X-Taste**: Magie einsetzen (benötigt Magie-Energie)

## Spielmechaniken

### Magie-System
- Die Magieleiste startet leer
- Sammle blaue Tränke um Magie aufzuladen
- Jeder Trank gibt 16.67% Magie
- X-Taste drücken verbraucht langsam Magie

### Sammelobjekte
- **Blaue Tränke**: Füllen Magieleiste
- **Münzen**: Erhöhen Punktestand

### Gegner
- Berührung mit Gegnern verursacht Schaden
- Magie-Angriffe können Gegner besiegen

## Tipps
1. Sammle erst Tränke, bevor du Magie einsetzt
2. Nutze Sprünge um Gegnern auszuweichen
3. Behalte deine Magieleiste im Auge

## Debugging-Tipps
Browser-Konsole öffnen (F12) und eingeben:
```javascript
// Charakterstatus prüfen
world.character.energy    // Lebenspunkte
world.magicBar.percentage // Magie-Level

// Sammelobjekte zählen
world.level.coins.length  // Anzahl Münzen
world.level.bottles.length // Anzahl Tränke
```
