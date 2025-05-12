class Bottle extends Item {
    ITEMS = [
        'assets/sprite-effects/1_0027_Bottle28.png',
        'assets/sprite-effects/1_0027_Bottle28.png',
        'assets/sprite-effects/1_0027_Bottle28.png',
        'assets/sprite-effects/1_0027_Bottle28.png'
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