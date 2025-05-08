class Statusbar extends MoveleObjekt {
  y = 150;
  height = 50;
  width = 50;

  CHARACKTER_STATUSBAR = ['/assets/fantasy-platformer-game-ui/16Inner_Interface/character_info_full.png'];

  constructor() {
    super();
    this.loadImages(this.CHARACKTER_STATUSBAR);
    this.y = 150;
    console.log('Statusbar liegt auf der y-Achse (y = ' + this.y + ')')
  }
}
