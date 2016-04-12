/// <reference path="../../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='./Placar.ts'/>

module Pregos {
	export class Tabuleiro {
		game: Phaser.Game;
		tabuleiro: Phaser.Sprite;
		bordas: Phaser.Group;
		gols: Phaser.Group;
		pregos: Phaser.Group;
		txtGol: Phaser.Sprite;
		txtGolFinal: Phaser.BitmapText;

		placar1: Placar;
		placar2: Placar;

		raioMoeda: number;
		contaTicksTxtGol: number;
		debugMode = false;
		fimDeJogo = false;

		constructor(game: Phaser.Game, raioMoeda: number) {
			this.game = game;
			this.raioMoeda = raioMoeda;
			this.criaTabuleiro();
			this.criaGols();
			this.criaBordas();
			this.criaPregos();
			this.criaPlacares();
			this.criaTxtGol();
		}

		criaTabuleiro() {
			this.tabuleiro = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'tabuleiro');
			this.tabuleiro.anchor.setTo(0.5, 0.5);
		}


		criaGols() {
			this.gols = this.game.add.physicsGroup(Phaser.Physics.P2JS);
			this.gols.enableBodyDebug = this.debugMode;

			var gol;
			gol = this.gols.create(this.game.width / 2, this.tabuleiro.y - (this.tabuleiro.height / 2) - 25, 'gol');
			gol.anchor.setTo(0.5, 0.5);
			gol.body.setRectangle(gol.width, gol.height - (this.raioMoeda * 2), 0, -this.raioMoeda, 0);
			gol.body.static = true;
			gol.name = "vermelho";

			gol = this.gols.create(this.game.width / 2, this.tabuleiro.y + (this.tabuleiro.height / 2) + 25, 'gol');
			gol.anchor.setTo(0.5, 0.5);
			gol.body.angle = 180;
			
			//após rotação a coordenada fica invertida, por isso offset negativo.
			gol.body.setRectangle(gol.width, gol.height - (this.raioMoeda * 2), 0, -this.raioMoeda, 0);
			gol.body.static = true;
			gol.name = "azul";
		}

		criaBordas() {
			this.bordas = this.game.add.physicsGroup(Phaser.Physics.P2JS);
			this.bordas.enableBodyDebug = this.debugMode;

			var bordaAux = this.game.add.sprite(0, 0, 'borda');
			bordaAux.height = (this.game.height / 2) - (this.tabuleiro.height / 2);
			bordaAux.width = this.gols.getTop().body.x - (this.gols.getTop().width / 2);
			var borda;

			//borda superior 
			borda = this.bordas.create(bordaAux.width / 2, bordaAux.height / 2, 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;

			borda = this.bordas.create(this.tabuleiro.width - (bordaAux.width / 2), bordaAux.height / 2, 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;
			
			//borda inferior
			borda = this.bordas.create(bordaAux.width / 2, this.game.height - (bordaAux.height / 2), 'borda');
			borda.anchor.setTo(0.5, 0.5);
			borda.width = bordaAux.width;
			borda.height = bordaAux.height;
			borda.body.setRectangle(borda.width, borda.height);
			borda.body.static = true;

			borda = this.bordas.create(this.game.width - (bordaAux.width / 2), this.game.height - (bordaAux.height / 2), 'borda');
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
			prego = this.pregos.create(tabX, tabY - 0.48 * tabH, 'pregoVermelho');
			prego.name = "prego";
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);

			prego = this.pregos.create(tabX, tabY - 0.3 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX, tabY - 0.11 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.2 * tabW, tabY - 0.05 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.2 * tabW, tabY - 0.05 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.4 * tabW, tabY - 0.15 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.4 * tabW, tabY - 0.15 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.15 * tabW, tabY - 0.22 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.15 * tabW, tabY - 0.22 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.2 * tabW, tabY - 0.32 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.2 * tabW, tabY - 0.32 * tabH, 'pregoVermelho');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			// Pregos Azuis
			prego = this.pregos.create(tabX, tabY + 0.48 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX, tabY + 0.3 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX, tabY + 0.11 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.2 * tabW, tabY + 0.05 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.2 * tabW, tabY + 0.05 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.4 * tabW, tabY + 0.15 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.4 * tabW, tabY + 0.15 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.15 * tabW, tabY + 0.22 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.15 * tabW, tabY + 0.22 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX - 0.2 * tabW, tabY + 0.32 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";

			prego = this.pregos.create(tabX + 0.2 * tabW, tabY + 0.32 * tabH, 'pregoAzul');
			prego.anchor.setTo(0.5, 0.5);
			prego.body.setCircle(8);
			prego.body.static = true;
			prego.body.angle = Math.floor(Math.random() * 360);
			prego.name = "prego";
		}

		criaPlacares() {
			this.placar1 = new Placar(this.game, this.bordas.getBottom().body.x, this.gols.getBottom().body.y);
			this.placar2 = new Placar(this.game, this.bordas.getTop().body.x, this.gols.getTop().body.y, true);
		}

		criaTxtGol() {
			this.txtGol = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'txtGol');
			this.txtGol.anchor.setTo(0.5, 0.5);
			this.txtGol.alpha = 0;
			this.contaTicksTxtGol = 100;
		}

		golDoAzul() {
			this.placar1.golDoAzul();
			this.placar2.golDoAzul();
			this.txtGol.alpha = 1;
			this.txtGol.frame = 1;
			this.contaTicksTxtGol = 0;

			if(this.placar1.golsAzul == 5){
				this.txtGol.frame = 3;
				this.fimDeJogo = true;
			}

		}

		golDoVermelho() {
			this.placar1.golDoVermelho();
			this.placar2.golDoVermelho();
			this.txtGol.alpha = 1;
			this.txtGol.frame = 0;
			this.contaTicksTxtGol = 0;

			if(this.placar1.golsVermelho == 5){
				this.txtGol.frame = 2;
				this.fimDeJogo = true;
			}
		}

		udpate() {
			this.placar1.update();
			this.placar2.update();

			if (this.txtGol.alpha == 1) {
				this.txtGol.rotation += 0.04;
				if(!this.fimDeJogo){
					this.contaTicksTxtGol += 1;
				}
			} 
			if (this.contaTicksTxtGol >= 100) {
				this.txtGol.alpha = 0;
			}
		}


	}
}