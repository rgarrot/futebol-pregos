/// <reference path="../../vendor/phaser-official/typescript/phaser.d.ts"/>
module Pregos {
	export class Placar {
		game: Phaser.Game;
		golsAzul: number;
		golsVermelho: number;

		bgplacar: Phaser.Sprite;
		txtGol: Phaser.BitmapText;

		constructor(game: Phaser.Game, x: number, y: number, flipped = false) {
			this.game = game;
			this.golsAzul = 0;
			this.golsVermelho = 0;

			this.bgplacar = this.game.add.sprite(x, y, 'placar');
			this.bgplacar.anchor.setTo(0.5, 0.5);
			if(flipped){
				this.bgplacar.angle = 0;
			} else {
				this.bgplacar.angle = 180;
			}


			this.txtGol = this.game.add.bitmapText(x, y, 'carrier_command', '', 32);
			this.txtGol.scale.x = 0.6;
			this.txtGol.scale.y = 0.8;
			this.txtGol.anchor.setTo(0.5, 0.5);
			this.txtGol.alpha = 1;
			if(flipped){
				this.txtGol.angle = 0;
			} else {
				this.txtGol.angle = 180;
			}
		}


		public golDoAzul(){
			this.golsAzul += 1;
			//this.txtGol.tint = 0x0000ff;
			//this.txtGol.setText("GOOOOLLLLL!");
			//this.txtGol.alpha = 1;
		}

		public golDoVermelho(){
			this.golsVermelho += 1;
			//this.txtGol.tint = 0xff0000;
			//this.txtGol.setText("GOOOOLLLLL!");
			//this.txtGol.alpha = 1;
		}

		public update(){
			//if (this.txtGol.alpha > 0.5){
			//	this.txtGol.alpha -= 0.005;
			//} else {
				this.txtGol.tint = 0xffffff;
				this.txtGol.alpha = 1;
				this.txtGol.setText(this.golsVermelho + " x " + this.golsAzul);
			//}
		}
	}
}