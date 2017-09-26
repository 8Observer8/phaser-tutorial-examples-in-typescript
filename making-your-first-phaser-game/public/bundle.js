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
var FirstGame;
(function (FirstGame) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.init = function () {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        };
        Boot.prototype.preload = function () {
            this.load.image('sky', './assets/sky.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('star', './assets/star.png');
            this.load.spritesheet('dude', './assets/dude.png', 32, 48);
        };
        Boot.prototype.create = function () {
            this.game.state.start('Level');
        };
        return Boot;
    }(Phaser.State));
    FirstGame.Boot = Boot;
})(FirstGame = exports.FirstGame || (exports.FirstGame = {}));
},{}],2:[function(require,module,exports){
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
var Boot = BootModule.FirstGame.Boot;
var LevelModule = require("./Level");
var Level = LevelModule.FirstGame.Level;
var FirstGame;
(function (FirstGame) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 800, 600, Phaser.AUTO, '') || this;
            _this.state.add('Boot', Boot);
            _this.state.add('Level', Level);
            _this.state.start('Boot');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    FirstGame.Game = Game;
})(FirstGame = exports.FirstGame || (exports.FirstGame = {}));
window.onload = function () {
    new FirstGame.Game();
};
},{"./Boot":1,"./Level":3}],3:[function(require,module,exports){
"use strict";
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
var FirstGame;
(function (FirstGame) {
    var Level = /** @class */ (function (_super) {
        __extends(Level, _super);
        function Level() {
            return _super.call(this) || this;
        }
        Level.prototype.init = function () {
            this.score = 0;
        };
        Level.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(0, 0, 'sky');
            // Creating ground and platforms
            this.platforms = this.game.add.group();
            this.platforms.enableBody = true;
            var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');
            ground.scale.setTo(2, 2);
            ground.body.immovable = true;
            var ledge = this.platforms.create(400, 400, 'ground');
            ledge.body.immovable = true;
            ledge = this.platforms.create(-150, 250, 'ground');
            ledge.body.immovable = true;
            //Creating player
            this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');
            this.game.physics.enable(this.player);
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 600;
            this.player.body.collideWorldBounds = true;
            // Adding Player animations
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);
            // Adding Stars
            this.stars = this.game.add.group();
            this.stars.enableBody = true;
            for (var i = 0; i < 12; i++) {
                var star = this.stars.create(i * 70, 0, 'star');
                star.body.gravity.y = 500;
                star.body.bounce.y = 0.3 + Math.random() * 0.2;
            }
            // Adding Score Text
            this.scoreText = this.game.add.text(16, 16, 'score: 0', { fontSize: 64, fill: '#000' });
            // Adding keyboard input listener
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        Level.prototype.update = function () {
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);
            this.game.physics.arcade.overlap(this.player, this.stars, this.collect, null, this);
            this.player.body.velocity.x = 0;
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -200;
                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 200;
                this.player.animations.play('right');
            }
            else {
                this.player.animations.stop();
                this.player.frame = 4;
            }
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -450;
            }
        };
        Level.prototype.collect = function (player, star) {
            star.kill();
            this.score += 10;
            this.scoreText.text = 'Score: ' + this.score;
        };
        return Level;
    }(Phaser.State));
    FirstGame.Level = Level;
})(FirstGame = exports.FirstGame || (exports.FirstGame = {}));
},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
