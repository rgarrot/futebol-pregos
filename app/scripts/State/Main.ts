/// <reference path='../Object/Tabuleiro.ts'/>


module Pregos.State {
	export class Main extends Phaser.State {
		game: Phaser.Game;

		background: Phaser.TileSprite;
		tabuleiro: Tabuleiro;
		

		golVermelho: Phaser.Sprite;
		golAzul: Phaser.Sprite;
		moeda: Phaser.Sprite;
		mira: Phaser.TileSprite;
		dedo: Phaser.Sprite;



		create() {
			this.game.physics.startSystem(Phaser.Physics.P2JS);	
			this.game.physics.p2.restitution = 0.6;			
			this.stage.backgroundColor = 0xdb9e4b;
			this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, "madeira");
			this.tabuleiro = new Tabuleiro(this.game, 16);			

			// cria mira
			this.mira = this.add.tileSprite(this.game.width / 2, this.game.height / 2, 15, 20, 'mira');
			this.mira.alpha = 0;
			this.mira.anchor.x = 0.5;

			// cria dedo
			this.dedo = this.add.sprite(this.game.width / 2, this.game.height / 2, 'mira');
			this.dedo.alpha = 0;
			this.dedo.anchor.setTo(0.5, 0.5);

			// cria moeda
			this.moeda = this.add.sprite(this.game.width / 2, this.game.height / 2, 'moeda');
			this.moeda.anchor.set(0.5, 0.5);
			this.moeda.name = "moeda";
			this.game.physics.p2.enable(this.moeda, false);
			this.moeda.body.collideWorldBounds = true;
			this.moeda.body.setCircle(16);
			this.moeda.body.damping = 0.5;
			this.moeda.body.onBeginContact.add(this.golHandler, this);
	

    		
			//evento chutar
			this.moeda.inputEnabled = true;
			this.moeda.events.onInputDown.add(this.prepare, this);
			this.moeda.events.onInputUp.add(this.launch, this);

		


		}

		update() {
			this.dedo.x = this.game.input.activePointer.worldX;
			this.dedo.y = this.game.input.activePointer.worldY;
			this.mira.x = this.moeda.x;
			this.mira.y = this.moeda.y;
			this.mira.rotation = this.game.physics.arcade.angleBetween(this.moeda, this.dedo) - 3.14 / 2;
			this.dedo.rotation = this.mira.rotation;
			this.mira.height = Math.min(this.game.physics.arcade.distanceToPointer(this.moeda), 150);
			this.tabuleiro.udpate();		
		}

		prepare() {
			this.mira.alpha = 0.5;
		}

		launch() {
			this.mira.alpha = 0;
			var velx = (this.moeda.x - this.dedo.x);
			velx = Math.min(Math.max(-150, velx), 150);
			var vely = (this.moeda.y - this.dedo.y);
			vely = Math.min(Math.max(-150, vely), 150);

			this.moeda.body.velocity.x = velx * 6;

			this.moeda.body.velocity.y = vely * 6;
		}

		golHandler(body, shapeA, shapeB, contactEquations){
			if (body == null)
				return true;
			var foiGol = false;
			if (body.sprite.name == "azul") {
				this.tabuleiro.golDoVermelho();
				foiGol = true;
			}else if (body.sprite.name == "vermelho") {
				this.tabuleiro.golDoAzul();
				foiGol = true;
			} 			

			if(foiGol){
				this.moeda.body.velocity.x = 0;
				this.moeda.body.velocity.y = 0;
				this.moeda.body.x = this.game.width / 2;
				this.moeda.body.y = this.game.height / 2;
			}
			return true;
		}

		
		render(){
			//this.game.debug.spriteInfo(this.moeda, 32, 32);
		}


	}
}