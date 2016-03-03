module Pregos.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;

    preload() {
      this.preloadBar = this.add.sprite(0, 148, 'preload-bar');
      this.load.setPreloadSprite(this.preloadBar);
      this.load.image('menu-background', 'assets/images/menu-background.png');  

      this.load.image('madeira', 'assets/images/wood_pattern.png');
      this.load.image('borda', 'assets/images/bordaTabuleiro.png');
      this.load.image('tabuleiro', 'assets/images/tabuleiro.png');
      this.load.image('pregoAzul', 'assets/images/pregoAzul.png');
      this.load.image('pregoVermelho', 'assets/images/pregoVermelho.png');
      this.load.image('moeda', 'assets/images/moeda.png');
      this.load.image('mira', 'assets/images/mira.png');
      this.load.image('chuteira', 'assets/images/chuteira.png')
      this.load.image('gol', 'assets/images/gol.png');
      this.load.image('placar', 'assets/images/placar.png');

      this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
     //this.load.bitmapFont('lcd', 'assets/fonts/lcd_0.png', 'assets/fonts/lcd.xml');
    }

    create() {
      console.log(window.innerHeight);
      console.log(window.innerWidth);
      console.log(window.devicePixelRatio);
      this.game.state.start('menu');
    }
  }
}