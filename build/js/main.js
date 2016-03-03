var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Pregos;
(function (Pregos) {
    var State;
    (function (State) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.preload = function () {
                this.load.image('preload-bar', 'assets/images/preload-bar.png');
            };
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = 0x000000;
                // Assign global settings here
                this.game.state.start('preload');
            };
            return Boot;
        })(Phaser.State);
        State.Boot = Boot;
    })(State = Pregos.State || (Pregos.State = {}));
})(Pregos || (Pregos = {}));
var Pregos;
(function (Pregos) {
    var State;
    (function (State) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
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
                this.load.image('chuteira', 'assets/images/chuteira.png');
                this.load.image('gol', 'assets/images/gol.png');
                this.load.image('placar', 'assets/images/placar.png');
                this.load.bitmapFont('carrier_command', 'assets/fonts/carrier_command.png', 'assets/fonts/carrier_command.xml');
                //this.load.bitmapFont('lcd', 'assets/fonts/lcd_0.png', 'assets/fonts/lcd.xml');
            };
            Preload.prototype.create = function () {
                console.log(window.innerHeight);
                console.log(window.innerWidth);
                console.log(window.devicePixelRatio);
                this.game.state.start('menu');
            };
            return Preload;
        })(Phaser.State);
        State.Preload = Preload;
    })(State = Pregos.State || (Pregos.State = {}));
})(Pregos || (Pregos = {}));
var Pregos;
(function (Pregos) {
    var State;
    (function (State) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                var _this = this;
                this.background = this.add.sprite(this.game.width / 2, this.game.height / 2, 'menu-background');
                this.background.anchor.setTo(0.5, 0.5);
                this.input.onDown.addOnce(function () {
                    _this.game.state.start('main');
                });
            };
            return Menu;
        })(Phaser.State);
        State.Menu = Menu;
    })(State = Pregos.State || (Pregos.State = {}));
})(Pregos || (Pregos = {}));
/// <reference path="../../vendor/phaser-official/typescript/phaser.d.ts"/>
var Pregos;
(function (Pregos) {
    var Placar = (function () {
        function Placar(game, x, y, flipped) {
            if (flipped === void 0) { flipped = false; }
            this.game = game;
            this.golsAzul = 0;
            this.golsVermelho = 0;
            this.bgplacar = this.game.add.sprite(x, y, 'placar');
            this.bgplacar.anchor.setTo(0.5, 0.5);
            if (flipped) {
                this.bgplacar.angle = 90;
            }
            else {
                this.bgplacar.angle = -90;
            }
            this.txtGol = this.game.add.bitmapText(x, y, 'carrier_command', '', 32);
            this.txtGol.scale.x = 0.3;
            this.txtGol.scale.y = 0.5;
            this.txtGol.anchor.setTo(0.5, 0.5);
            this.txtGol.alpha = 0.5;
            if (flipped) {
                this.txtGol.angle = 90;
            }
            else {
                this.txtGol.angle = -90;
            }
        }
        Placar.prototype.golDoAzul = function () {
            this.golsAzul += 1;
            this.txtGol.tint = 0x0000ff;
            this.txtGol.setText("GOOOOLLLLL!");
            this.txtGol.alpha = 1;
        };
        Placar.prototype.golDoVermelho = function () {
            this.golsVermelho += 1;
            this.txtGol.tint = 0xff0000;
            this.txtGol.setText("GOOOOLLLLL!");
            this.txtGol.alpha = 1;
        };
        Placar.prototype.update = function () {
            if (this.txtGol.alpha > 0.5) {
                this.txtGol.alpha -= 0.005;
            }
            else {
                this.txtGol;
                this.txtGol.tint = 0xffffff;
                this.txtGol.alpha = 0.5;
                this.txtGol.setText("VML " + this.golsVermelho + ":" + this.golsAzul + " AZL");
            }
        };
        return Placar;
    })();
    Pregos.Placar = Placar;
})(Pregos || (Pregos = {}));
/// <reference path="../../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='./Placar.ts'/>
var Pregos;
(function (Pregos) {
    var Tabuleiro = (function () {
        function Tabuleiro(game, raioMoeda) {
            this.debugMode = false;
            this.game = game;
            this.raioMoeda = raioMoeda;
            this.criaTabuleiro();
            this.criaGols();
            this.criaBordas();
            this.criaPregos();
            this.criaPlacares();
        }
        Tabuleiro.prototype.criaTabuleiro = function () {
            this.tabuleiro = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'tabuleiro');
            this.tabuleiro.anchor.setTo(0.5, 0.5);
        };
        Tabuleiro.prototype.criaGols = function () {
            this.gols = this.game.add.physicsGroup(Phaser.Physics.P2JS);
            this.gols.enableBodyDebug = this.debugMode;
            var gol;
            gol = this.gols.create(((this.game.width / 2) - (this.tabuleiro.width / 2)) / 2, this.game.height / 2, 'gol');
            gol.anchor.setTo(0.5, 0.5);
            gol.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
            gol.body.setRectangle(gol.width - (this.raioMoeda * 2), gol.height, -this.raioMoeda, 0, 0);
            gol.body.static = true;
            gol.name = "vermelho";
            gol = this.gols.create(this.game.width - (((this.game.width / 2) - (this.tabuleiro.width / 2)) / 2), this.game.height / 2, 'gol');
            gol.anchor.setTo(0.5, 0.5);
            gol.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
            gol.body.setRectangle(gol.width - (this.raioMoeda * 2), gol.height, this.raioMoeda, 0, 0);
            gol.body.static = true;
            gol.name = "azul";
        };
        Tabuleiro.prototype.criaBordas = function () {
            this.bordas = this.game.add.physicsGroup(Phaser.Physics.P2JS);
            this.bordas.enableBodyDebug = this.debugMode;
            var bordaAux = this.game.add.sprite(0, 0, 'borda');
            bordaAux.width = (this.game.width / 2) - (this.tabuleiro.width / 2);
            bordaAux.height = this.gols.getTop().body.y - (this.gols.getTop().height / 2);
            var borda;
            //borda esquerda 
            borda = this.bordas.create(bordaAux.width / 2, bordaAux.height / 2, 'borda');
            borda.anchor.setTo(0.5, 0.5);
            borda.width = bordaAux.width;
            borda.height = bordaAux.height;
            borda.body.setRectangle(borda.width, borda.height);
            borda.body.static = true;
            borda = this.bordas.create(bordaAux.width / 2, this.tabuleiro.height - (bordaAux.height / 2), 'borda');
            borda.anchor.setTo(0.5, 0.5);
            borda.width = bordaAux.width;
            borda.height = bordaAux.height;
            borda.body.setRectangle(borda.width, borda.height);
            borda.body.static = true;
            //borda direita
            borda = this.bordas.create(this.game.width - (bordaAux.width / 2), (bordaAux.height / 2), 'borda');
            borda.anchor.setTo(0.5, 0.5);
            borda.width = bordaAux.width;
            borda.height = bordaAux.height;
            borda.body.setRectangle(borda.width, borda.height);
            borda.body.static = true;
            borda = this.bordas.create(this.game.width - (bordaAux.width / 2), this.tabuleiro.height - (bordaAux.height / 2), 'borda');
            borda.anchor.setTo(0.5, 0.5);
            borda.width = bordaAux.width;
            borda.height = bordaAux.height;
            borda.body.setRectangle(borda.width, borda.height);
            borda.body.static = true;
            bordaAux.kill();
        };
        Tabuleiro.prototype.criaPregos = function () {
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
            prego.body.static = true;
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
        };
        Tabuleiro.prototype.criaPlacares = function () {
            this.placar1 = new Pregos.Placar(this.game, this.bordas.getBottom().body.x, this.bordas.getBottom().body.y);
            this.placar2 = new Pregos.Placar(this.game, this.bordas.getTop().body.x, this.bordas.getTop().body.y, true);
        };
        Tabuleiro.prototype.golDoAzul = function () {
            this.placar1.golDoAzul();
            this.placar2.golDoAzul();
        };
        Tabuleiro.prototype.golDoVermelho = function () {
            this.placar1.golDoVermelho();
            this.placar2.golDoVermelho();
        };
        Tabuleiro.prototype.udpate = function () {
            this.placar1.update();
            this.placar2.update();
        };
        return Tabuleiro;
    })();
    Pregos.Tabuleiro = Tabuleiro;
})(Pregos || (Pregos = {}));
/// <reference path='../Object/Tabuleiro.ts'/>
var Pregos;
(function (Pregos) {
    var State;
    (function (State) {
        var Main = (function (_super) {
            __extends(Main, _super);
            function Main() {
                _super.apply(this, arguments);
            }
            Main.prototype.create = function () {
                this.game.physics.startSystem(Phaser.Physics.P2JS);
                this.game.physics.p2.restitution = 0.6;
                this.stage.backgroundColor = 0xdb9e4b;
                this.background = this.add.tileSprite(0, 0, this.game.width, this.game.height, "madeira");
                this.tabuleiro = new Pregos.Tabuleiro(this.game, 16);
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
            };
            Main.prototype.update = function () {
                this.dedo.x = this.game.input.activePointer.worldX;
                this.dedo.y = this.game.input.activePointer.worldY;
                this.mira.x = this.moeda.x;
                this.mira.y = this.moeda.y;
                this.mira.rotation = this.game.physics.arcade.angleBetween(this.moeda, this.dedo) - 3.14 / 2;
                this.dedo.rotation = this.mira.rotation;
                this.mira.height = Math.min(this.game.physics.arcade.distanceToPointer(this.moeda), 150);
                this.tabuleiro.udpate();
            };
            Main.prototype.prepare = function () {
                this.mira.alpha = 0.5;
            };
            Main.prototype.launch = function () {
                this.mira.alpha = 0;
                var velx = (this.moeda.x - this.dedo.x);
                velx = Math.min(Math.max(-150, velx), 150);
                var vely = (this.moeda.y - this.dedo.y);
                vely = Math.min(Math.max(-150, vely), 150);
                this.moeda.body.velocity.x = velx * 6;
                this.moeda.body.velocity.y = vely * 6;
            };
            Main.prototype.golHandler = function (body, shapeA, shapeB, contactEquations) {
                if (body == null)
                    return true;
                var foiGol = false;
                if (body.sprite.name == "azul") {
                    this.tabuleiro.golDoVermelho();
                    foiGol = true;
                }
                else if (body.sprite.name == "vermelho") {
                    this.tabuleiro.golDoAzul();
                    foiGol = true;
                }
                if (foiGol) {
                    this.moeda.body.velocity.x = 0;
                    this.moeda.body.velocity.y = 0;
                    this.moeda.body.x = this.game.width / 2;
                    this.moeda.body.y = this.game.height / 2;
                }
                return true;
            };
            Main.prototype.render = function () {
                //this.game.debug.spriteInfo(this.moeda, 32, 32);
            };
            return Main;
        })(Phaser.State);
        State.Main = Main;
    })(State = Pregos.State || (Pregos.State = {}));
})(Pregos || (Pregos = {}));
/// <reference path="../vendor/phaser-official/typescript/phaser.d.ts"/>
/// <reference path='State/Boot.ts'/>
/// <reference path='State/Preload.ts'/>
/// <reference path='State/Menu.ts'/>
/// <reference path='State/Main.ts'/>
var Pregos;
(function (Pregos) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 853, 480, Phaser.CANVAS, 'game-div');
            this.state.add('boot', Pregos.State.Boot);
            this.state.add('preload', Pregos.State.Preload);
            this.state.add('menu', Pregos.State.Menu);
            this.state.add('main', Pregos.State.Main);
            this.state.start('boot');
        }
        return Game;
    })(Phaser.Game);
    Pregos.Game = Game;
})(Pregos || (Pregos = {}));
window.onload = function () {
    var game = new Pregos.Game();
};
//# sourceMappingURL=main.js.map