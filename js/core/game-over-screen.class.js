class GameOverScreen extends DrawableObject {
    width = 400;
    height = 300;

    constructor() {
        super();
        this.loadImage('assets/fantasy-platformer-game-ui/PNG/10Defeat/begie_border2.png');
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    hide() {
        this.visible = false;
    }

    draw(ctx) {
        if (!this.visible) return;

        // Dunklerer Hintergrund für besseren Kontrast
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, 720, 480);

        // Position berechnen für die Mitte des Bildschirms
        this.x = (720 - this.width) / 2;
        this.y = (480 - this.height) / 2;

        // Hintergrund Panel zeichnen
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        // Game Over Text
        ctx.font = 'bold 48px Arial';
        ctx.fillStyle = '#8B0000';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', 360, 200);

        // Retry Button
        ctx.fillStyle = '#4a4a4a';
        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonX = this.x + (this.width - buttonWidth) / 2;
        const buttonY = this.y + 180;
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        // Retry Text
        ctx.font = '24px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('Retry', 360, this.y + 210);
    }

    isRetryButtonClicked(clickX, clickY) {
        if (!this.visible) return false;

        const buttonWidth = 200;
        const buttonHeight = 50;
        const buttonX = this.x + (this.width - buttonWidth) / 2;
        const buttonY = this.y + 180;

        return (
            clickX >= buttonX &&
            clickX <= buttonX + buttonWidth &&
            clickY >= buttonY &&
            clickY <= buttonY + buttonHeight
        );
    }
}
