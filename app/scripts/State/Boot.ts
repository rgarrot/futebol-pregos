module Pregos.State {
  export class Boot extends Phaser.State {
    preload() {
      this.load.bitmapFont('carrier_command', 'assets/fonts/berlin.png', 'assets/fonts/berlin.xml');
    }

    create() {
        this.game.stage.backgroundColor = 0x036937;

        // Assign global settings here      
        this.game.state.start('preload');
    }
  }
}