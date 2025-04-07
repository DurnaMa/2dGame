let canvas;
let ctx;
//let character = new Image();
let character = new MoveleObjekt();

function init() {
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  // character.src = '../SunnyLandCollectionFiles/Assets/Characters/Players/sunny-bunny/Sprites/idle/_0000_Layer-1.png';
  // setTimeout(function () {
  //   ctx.drawImage(character, 50, 50, 100, 100);
  // }, 2000);

  console.log('My Chracter is', character);
}
