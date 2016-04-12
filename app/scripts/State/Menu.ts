module Pregos.State {
  export class Menu extends Phaser.State {
    
    private logo: Phaser.Sprite;
    private btHumanHuman: Phaser.Sprite;
    //private btHumanComputer: Phaser.Sprite;

    create() {
      this.logo = this.add.sprite(this.game.width / 2, this.game.height * 0.1, 'logo');
      this.logo.anchor.setTo(0.5, 0.5);

      //this.btHumanComputer = this.add.sprite(this.game.width / 2, this.game.height * 0.9, 'btHumanComputer');
      //this.btHumanComputer.anchor.setTo(0.5, 0.5);
      this.btHumanHuman = this.add.sprite(this.game.width / 2, this.game.height * 0.9, 'btHumanHuman');
      this.btHumanHuman.anchor.setTo(0.5, 0.5);

      this.btHumanHuman.inputEnabled = true;
      this.btHumanHuman.events.onInputDown.addOnce(() => {
      this.game.state.start('main');
      });

    }
  }
}