class Item extends MoveleObjekt {
    y = 450;
    height = 50;
    width = 50;
    collected = false;

    constructor() {
        super();
        this.x = 350 + Math.random() * 2000;
        this.y = 380 + Math.random() * 230;
    }

    collect() {
        this.collected = true;
    }

    isCollected() {
        return this.collected;
    }
} 