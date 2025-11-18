class GameOverScreen extends DrawableObject {
    width = GAME_CONFIG.UI.GAMEOVER.WIDTH;
    height = GAME_CONFIG.UI.GAMEOVER.HEIGHT;

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
        ctx.fillRect(0, 0, GAME_CONFIG.UI.GAMEOVER.SCREEN_WIDTH, GAME_CONFIG.UI.GAMEOVER.SCREEN_HEIGHT);

        // Position berechnen für die Mitte des Bildschirms
        this.x = (720 - this.width) / 2;
        this.y = (480 - this.height) / 2;

        // Hintergrund Panel zeichnen
        if (this.img) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }

        // Game Over Text
        ctx.font = 'bold ' + GAME_CONFIG.UI.GAMEOVER.FONT_SIZE_LARGE + 'px Arial';
        ctx.fillStyle = '#8B0000';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', GAME_CONFIG.UI.GAMEOVER.TEXT_X, GAME_CONFIG.UI.GAMEOVER.TEXT_Y);

        // Retry Button
        ctx.fillStyle = '#4a4a4a';
        const buttonWidth = GAME_CONFIG.UI.GAMEOVER.BUTTON_WIDTH;
        const buttonHeight = GAME_CONFIG.UI.GAMEOVER.BUTTON_HEIGHT;
        const buttonX = this.x + (this.width - buttonWidth) / 2;
        const buttonY = this.y + GAME_CONFIG.UI.GAMEOVER.BUTTON_Y_OFFSET;
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

        // Retry Text
        ctx.font = GAME_CONFIG.UI.GAMEOVER.FONT_SIZE_SMALL + 'px Arial';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('Retry', GAME_CONFIG.UI.GAMEOVER.TEXT_X, this.y + 210);
    }

    isRetryButtonClicked(clickX, clickY) {
        if (!this.visible) return false;

        const buttonWidth = GAME_CONFIG.UI.GAMEOVER.BUTTON_WIDTH;
        const buttonHeight = GAME_CONFIG.UI.GAMEOVER.BUTTON_HEIGHT;
        const buttonX = this.x + (this.width - buttonWidth) / 2;
        const buttonY = this.y + GAME_CONFIG.UI.GAMEOVER.BUTTON_Y_OFFSET;

        return (
            clickX >= buttonX &&
            clickX <= buttonX + buttonWidth &&
            clickY >= buttonY &&
            clickY <= buttonY + buttonHeight
        );
    }
}
