class Bottle extends Item {
    ITEMS = [
        '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Bottle/bottle1.png',
        '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Bottle/bottle2.png',
        '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Bottle/bottle3.png',
        '/assets/mountain-platformer-pixel-art-tileset/PNG/items/Bottle/bottle4.png',
    ];

    constructor() {
        super();
        this.loadImages(this.ITEMS);
    }

    animate() {
        setInterval(() => {
            this.playItems(this.ITEMS);
        }, 200);
    }
} 