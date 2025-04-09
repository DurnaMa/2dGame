class EnemiesAnt extends MoveleObjekt {
  constructor() {
    super().loadImage('/assets/Characters/EnemiesAndNpc/ant/Sprites/ant-1.png');

    this.x = 250 + Math.random() * 500;
  }


}
