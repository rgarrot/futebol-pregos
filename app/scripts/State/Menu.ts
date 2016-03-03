module Pregos.State {
  export class Menu extends Phaser.State {
    background: Phaser.Sprite;

    create() {
      this.background = this.add.sprite(this.game.width /2, this.game.height / 2, 'menu-background');
      this.background.anchor.setTo(0.5, 0.5);
      this.input.onDown.addOnce(() => {
        this.game.state.start('main');
      });
    }
  }
}