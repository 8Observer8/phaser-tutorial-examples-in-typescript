(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
/// <reference path="./libs/phaser.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule = require("./Game");
var SpaceHipster;
(function (SpaceHipster) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.init = function () {
            if (!GameModule.SpaceHipster.highScore) {
                GameModule.SpaceHipster.highScore = 0;
            }
        };
        Boot.prototype.preload = function () {
            this.game.load.image('logo', './assets/images/logo.png');
            this.game.load.image('preloadbar', './assets/images/preloader-bar.png');
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = '#fff';
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.minWidth = 240;
            this.game.scale.minHeight = 170;
            this.game.scale.maxWidth = 2880;
            this.game.scale.maxHeight = 1920;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preload');
        };
        return Boot;
    }(Phaser.State));
    SpaceHipster.Boot = Boot;
})(SpaceHipster = exports.SpaceHipster || (exports.SpaceHipster = {}));
},{"./Game":2}],2:[function(require,module,exports){
"use strict";
/// <reference path="./libs/phaser.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BootModule = require("./Boot");
var Boot = BootModule.SpaceHipster.Boot;
var MainMenuModule = require("./MainMenu");
var MainMenu = MainMenuModule.SpaceHipster.MainMenu;
var PlayGameModule = require("./PlayGame");
var PlayGame = PlayGameModule.SpaceHipster.PlayGame;
var PreloadModule = require("./Preload");
var Preload = PreloadModule.SpaceHipster.Preload;
var SpaceHipster;
(function (SpaceHipster) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, window.innerWidth, window.innerHeight, Phaser.AUTO, '') || this;
            _this.state.add('Boot', Boot, false);
            _this.state.add('MainMenu', MainMenu, false);
            _this.state.add('PlayGame', PlayGame, false);
            _this.state.add('Preload', Preload, false);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    SpaceHipster.Game = Game;
})(SpaceHipster = exports.SpaceHipster || (exports.SpaceHipster = {}));
window.onload = function () {
    new SpaceHipster.Game();
};
},{"./Boot":1,"./MainMenu":3,"./PlayGame":4,"./Preload":5}],3:[function(require,module,exports){
"use strict";
/// <reference path="./libs/phaser.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule = require("./Game");
var SpaceHipster;
(function (SpaceHipster) {
    var MainMenu = /** @class */ (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            return _super.call(this) || this;
        }
        MainMenu.prototype.create = function () {
            this.game.input.enabled = true;
            this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'space');
            this.background.autoScroll(-20, 0);
            var text = "Tap to Begin";
            var style = {
                font: "30px Arial",
                fill: "#fff",
                align: "center"
            };
            this.beginText = this.game.add.text(this.game.width / 2, this.game.height / 2, text, style);
            this.beginText.anchor.set(0.5, 0.5);
            console.log(this.beginText);
            text = "Highest Score: " + GameModule.SpaceHipster.highScore;
            this.highScoreText = this.game.add.text(this.game.width / 2, this.game.height / 2 + 50, text, style);
            this.highScoreText.anchor.set(0.5, 0.5);
        };
        MainMenu.prototype.update = function () {
            if (this.game.input.activePointer.justPressed()) {
                this.game.state.start('PlayGame');
            }
        };
        return MainMenu;
    }(Phaser.State));
    SpaceHipster.MainMenu = MainMenu;
})(SpaceHipster = exports.SpaceHipster || (exports.SpaceHipster = {}));
},{"./Game":2}],4:[function(require,module,exports){
"use strict";
/// <reference path="./libs/phaser.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GameModule = require("./Game");
var SpaceHipster;
(function (SpaceHipster) {
    var PlayGame = /** @class */ (function (_super) {
        __extends(PlayGame, _super);
        function PlayGame() {
            return _super.call(this) || this;
        }
        PlayGame.prototype.init = function () {
            this.playerScore = 0;
            this.playerSpeed = 100;
        };
        PlayGame.prototype.create = function () {
            this.game.world.setBounds(0, 0, 1920, 1920);
            this.background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'space');
            this.explosionSound = this.game.add.audio('explosion');
            this.collectSound = this.game.add.audio('collect');
            this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'playership');
            this.player.anchor.setTo(0.5);
            this.player.scale.setTo(2);
            this.player.animations.add('fly', [0, 1, 2, 3], 5, true);
            this.player.animations.play('fly');
            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;
            this.game.camera.follow(this.player);
            this.generateAsteroids();
            this.generateCollectibles();
            this.showLabels();
        };
        PlayGame.prototype.update = function () {
            if (this.game.input.activePointer.justPressed()) {
                this.game.physics.arcade.moveToPointer(this.player, this.playerSpeed);
            }
            this.game.physics.arcade.collide(this.player, this.asteroids, this.hitAsteroid, null, this);
            this.game.physics.arcade.overlap(this.player, this.collectables, this.collect, null, this);
        };
        PlayGame.prototype.generateAsteroids = function () {
            this.asteroids = this.game.add.group();
            this.asteroids.enableBody = true;
            this.asteroids.physicsBodyType = Phaser.Physics.ARCADE;
            var numAsteroids = this.game.rnd.integerInRange(150, 200);
            var asteroid;
            for (var i = 0; i < numAsteroids; i++) {
                asteroid = this.asteroids.create(this.game.world.randomX, this.game.world.randomY, 'rock');
                asteroid.scale.setTo(this.game.rnd.integerInRange(10, 40) / 10);
                asteroid.body.velocity.x = this.game.rnd.integerInRange(-20, 20);
                asteroid.body.velocity.y = this.game.rnd.integerInRange(-20, 20);
                asteroid.body.immovable = true;
                asteroid.body.collideWorldBounds = true;
            }
        };
        PlayGame.prototype.hitAsteroid = function (player, asteroid) {
            this.game.input.enabled = false;
            this.explosionSound.play();
            var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
            emitter.makeParticles('playerParticle');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = new Phaser.Point(0, 0);
            emitter.start(true, 1000, null, 100);
            //player.destroy();
            //asteroid.destroy();
            player.kill();
            asteroid.kill();
            GameModule.SpaceHipster.highScore = Math.max(this.playerScore, GameModule.SpaceHipster.highScore);
            this.game.time.events.add(1000, this.gameOver, this);
        };
        PlayGame.prototype.generateCollectibles = function () {
            this.collectables = this.game.add.group();
            this.collectables.enableBody = true;
            this.collectables.physicsBodyType = Phaser.Physics.ARCADE;
            var numCollectibles = this.game.rnd.integerInRange(100, 150);
            var collectable;
            for (var i = 0; i < numCollectibles; i++) {
                collectable = this.collectables.create(this.game.world.randomX, this.game.world.randomY, 'power');
                collectable.animations.add('fly', [0, 1, 2, 3], 5, true);
                collectable.animations.play('fly');
            }
        };
        PlayGame.prototype.collect = function (player, collectable) {
            this.collectSound.play();
            this.playerScore++;
            this.scoreLabel.text = "Score: " + this.playerScore;
            //collectable.destroy();
            collectable.kill();
        };
        PlayGame.prototype.showLabels = function () {
            var text = "Score: 0";
            var style = {
                font: "20px Impact",
                fill: "#fff",
                align: "center"
            };
            this.scoreLabel = this.game.add.text(50, 50, text, style);
            this.scoreLabel.fixedToCamera = true;
        };
        PlayGame.prototype.gameOver = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return PlayGame;
    }(Phaser.State));
    SpaceHipster.PlayGame = PlayGame;
})(SpaceHipster = exports.SpaceHipster || (exports.SpaceHipster = {}));
},{"./Game":2}],5:[function(require,module,exports){
"use strict";
/// <reference path="./libs/phaser.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SpaceHipster;
(function (SpaceHipster) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super.call(this) || this;
        }
        Preload.prototype.preload = function () {
            // Setting up the game loading screen
            this.splash = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.splash.anchor.setTo(0.5);
            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
            this.preloadBar.anchor.setTo(0.5);
            this.game.load.setPreloadSprite(this.preloadBar);
            // Pre-loading Assets now
            this.game.load.image('space', './assets/images/space.png');
            this.game.load.image('rock', './assets/images/rock.png');
            this.game.load.image('playerParticle', './assets/images/player-particle.png');
            this.game.load.spritesheet('playership', './assets/images/player.png', 12, 12);
            this.game.load.spritesheet('power', './assets/images/power.png', 12, 12);
            this.game.load.audio('collect', './assets/audio/collect.ogg');
            this.game.load.audio('explosion', './assets/audio/explosion.ogg');
        };
        Preload.prototype.create = function () {
            this.game.state.start('MainMenu');
        };
        return Preload;
    }(Phaser.State));
    SpaceHipster.Preload = Preload;
})(SpaceHipster = exports.SpaceHipster || (exports.SpaceHipster = {}));
},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
