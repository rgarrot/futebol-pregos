module Pregos.State {
  export class Preload extends Phaser.State {
    private preloadBar: Phaser.Sprite;
    private txtLogo: Phaser.BitmapText;
    private txtCarregando: Phaser.BitmapText;

    preload() {
      this.txtCarregando = this.add.bitmapText(this.game.width / 2, this.game.height / 2, 'carrier_command', 'Carregando...', 32);
      this.txtCarregando.anchor.setTo(0.5, 0.5);
     
      
      this.load.image('logo', 'assets/images/logo.png');
      this.load.image('btHumanHuman', 'assets/images/btHumanHuman.png');
      this.load.image('btHumanComputer', 'assets/images/btHumanComputer.png');
      this.load.image('borda', 'assets/images/bordaTabuleiro.png');
      this.load.image('tabuleiro', 'assets/images/tabuleiro.png');
      this.load.image('pregoAzul', 'assets/images/pregoAzul.png');
      this.load.image('pregoVermelho', 'assets/images/pregoVermelho.png');
      this.load.image('mira', 'assets/images/mira.png');
      this.load.image('chuteira', 'assets/images/chuteira.png')
      this.load.image('gol', 'assets/images/gol.png');
      this.load.image('placar', 'assets/images/placar.png');

      this.load.spritesheet('moeda', 'assets/images/moeda.png', 32, 32, 3);
      this.load.spritesheet('txtGol', 'assets/images/txtGol.png', 260, 230, 4);

      this.load.audio('hit', 'assets/audio/hit.ogg');
      this.load.audio('goal', 'assets/audio/goal.ogg');

      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    }

    create() {
      this.game.state.start('menu');
    }
  }
}