/// <reference path="../../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='./Placar.ts'/>

module Pregos {
	export class Tabuleiro {
		game: Phaser.Game;
		tabuleiro: Phaser.Sprite;
		bordas: Phaser.Group;
		gols: Phaser.Group;
		pregos: Phaser.Group;
		
		placar1: Placar;
		placar2: Placar;

		raioMoeda: number;

		debugMode = false;



		constructor(game: Phaser.Game, raioMoeda: number){
			this.game = game;		
			this.raioMoeda = raioMoeda;
			this.criaTabuleiro();
			this.criaGols();
			this.criaBordas();
			this.criaPregos();
			this.criaPlacares();
		}		

		criaTabuleiro(){
			this.tabuleiro = this.game.add.sprite(this.game.width/2, this.game.height/2, 'tabuleiro');
			this.tabuleiro.anchor.setTo(0.5, 0.5);
		}


		criaGols(){
			this.gols = this.game.add.physicsGroup(Phaser.Physics.P2JS);		
			this.gols.enableBodyDebug = this.debugMode;

			var gol;
			gol = this.gols.create(((this.game.width / 2) - (this.tabuleiro.width / 2)) / 2, this.game.height / 2, 'gol');
			gol.anchor.setTo(0.5, 0.5);
			gol.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
			gol.body.setRectangle(gol.width - (this.raioMoeda * 2), gol.height, -this.raioMoeda, 0, 0);
			gol.body.static = true;
			gol.name = "vermelho";

			gol = this.gols.create(this.game.width - (((this.game.width / 2) - (this.tabuleiro.width / 2))  / 2 ), this.game.height / 2, 'gol');
			gol.anchor.setTo(0.5, 0.5);
			gol.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
			gol.body.setRectangle(gol.width - (this.raioMoeda * 2), gol.height, this.raioMoeda, 0, 0);
			gol.body.static = true;
			gol.name = "azul";
		}

		criaBordas() {
			this.bordas = this.game.add.physicsGroup(Phaser.Physics.P2JS);
			this.bordas.enableBodyDebug = this.debugMode;

			var bordaAux = this.game.add.sprite(0, 0, 'borda');
			bordaAux.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
			bordaAux.height = this.gols.getTop().body.y - (this.gols.getTop().height/2);
			var borda;

			//borda esquerda 
			borda = this.bordas.create(bordaAux.width / 2, bordaAux.height / 2, 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;	
			borda.height = bordaAux.height;		
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;
			
			borda = this.bordas.create(bordaAux.width / 2, this.tabuleiro.height - (bordaAux.height/2), 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;
			
			//borda direita
			borda = this.bordas.create(this.game.width - (bordaAux.width / 2), (bordaAux.height/2), 'borda');
			borda.anchor.setTo(0.5, 0.5);			
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;
			
			borda = this.bordas.create(this.game.width - (bordaAux.width / 2) , this.tabuleiro.height - (bordaAux.height/2), 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;
				
			bordaAux.kill();
		}


		criaPregos() {
			this.pregos = this.game.add.physicsGroup(Phaser.Physics.P2JS);
			this.pregos.enableBodyDebug = this.debugMode;

			var prego;
			var tabX = this.tabuleiro.x;
			var tabY = this.tabuleiro.y;
			var tabW = this.tabuleiro.width;
			var tabH = this.tabuleiro.height;
			
			// Pregos Vermelhos
			prego = this.pregos.create(tabX - 0.48 * tabW, tabY, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;	
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.3 * tabW, tabY, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.11 * tabW, tabY, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.05 * tabW, tabY - 0.2 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.05 * tabW, tabY + 0.2 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.15 * tabW, tabY - 0.4 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.15 * tabW, tabY + 0.4 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.22 * tabW, tabY - 0.15 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.22 * tabW, tabY + 0.15 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.32 * tabW, tabY - 0.2 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX - 0.32 * tabW, tabY + 0.2 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			// Pregos Azuis
			prego = this.pregos.create(tabX + 0.48 * tabW, tabY, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;	
			prego.body.angle = Math.floor(Math.random() * 360);
			
			prego = this.pregos.create(tabX + 0.3 * tabW, tabY, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body .static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.11 * tabW, tabY, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.05 * tabW, tabY - 0.2 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.05 * tabW, tabY + 0.2 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.15 * tabW, tabY - 0.4 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.15 * tabW, tabY + 0.4 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.22 * tabW, tabY - 0.15 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.22 * tabW, tabY + 0.15 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.32 * tabW, tabY - 0.2 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX + 0.32 * tabW, tabY + 0.2 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);


		}

		criaPlacares() {
			this.placar1 = new Placar(this.game, this.bordas.getBottom().body.x, this.bordas.getBottom().body.y);
			this.placar2 = new Placar(this.game, this.bordas.getTop().body.x, this.bordas.getTop().body.y, true);
		}

		golDoAzul(){
			this.placar1.golDoAzul();
			this.placar2.golDoAzul();
		}

		golDoVermelho(){
			this.placar1.golDoVermelho();
			this.placar2.golDoVermelho();
		}

		udpate(){
			this.placar1.update();
			this.placar2.update();
		}

	}
}