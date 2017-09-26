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
var ToddlerGame;
(function (ToddlerGame) {
    var Arrow = /** @class */ (function (_super) {
        __extends(Arrow, _super);
        function Arrow(game, x, y) {
            return _super.call(this, game, x, y, 'arrow') || this;
        }
        return Arrow;
    }(Phaser.Sprite));
    ToddlerGame.Arrow = Arrow;
})(ToddlerGame = exports.ToddlerGame || (exports.ToddlerGame = {}));
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
var GameStateModule = require("./GameState");
var GameState = GameStateModule.ToddlerGame.GameState;
var ToddlerGame;
(function (ToddlerGame) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this, 640, 360, Phaser.AUTO, '') || this;
            _this.state.add('GameState', GameState);
            _this.state.start('GameState');
            return _this;
        }
        return Game;
    }(Phaser.Game));
    ToddlerGame.Game = Game;
})(ToddlerGame = exports.ToddlerGame || (exports.ToddlerGame = {}));
window.onload = function () {
    new ToddlerGame.Game();
};
},{"./GameState":3}],3:[function(require,module,exports){
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
var ArrowModule = require("./Arrow");
var Arrow = ArrowModule.ToddlerGame.Arrow;
var ToddlerGame;
(function (ToddlerGame) {
    var GameState = /** @class */ (function (_super) {
        __extends(GameState, _super);
        function GameState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        GameState.prototype.init = function () {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        };
        GameState.prototype.preload = function () {
            this.load.image('background', './assets/images/background.png');
            this.load.image('arrow', './assets/images/arrow.png');
            this.load.spritesheet('chicken', './assets/images/chicken_spritesheet.png', 131, 200, 3);
            this.load.spritesheet('horse', './assets/images/horse_spritesheet.png', 212, 200, 3);
            this.load.spritesheet('pig', './assets/images/pig_spritesheet.png', 297, 200, 3);
            this.load.spritesheet('sheep', './assets/images/sheep_spritesheet.png', 244, 200, 3);
            this.load.audio('chickenSound', ['./assets/audio/chicken.ogg', './assets/audio/chicken.mp3']);
            this.load.audio('horseSound', ['./assets/audio/horse.ogg', './assets/audio/horse.mp3']);
            this.load.audio('pigSound', ['./assets/audio/pig.ogg', './assets/audio/pig.mp3']);
            this.load.audio('sheepSound', ['./assets/audio/sheep.ogg', './assets/audio/sheep.mp3']);
        };
        GameState.prototype.create = function () {
            var _this = this;
            this.background = this.game.add.sprite(0, 0, 'background');
            var animalData = [
                { key: 'chicken', text: 'CHICKEN', sound: 'chickenSound' },
                { key: 'horse', text: 'HORSE', sound: 'horseSound' },
                { key: 'pig', text: 'PIG', sound: 'pigSound' },
                { key: 'sheep', text: 'SHEEP', sound: 'sheepSound' }
            ];
            this.animals = this.game.add.group();
            var animal;
            animalData.forEach(function (element) {
                animal = _this.animals.create(-1000, _this.game.world.centerY, element.key, 0);
                animal.text = element.text;
                animal.sound = _this.game.add.audio(element.sound);
                animal.anchor.setTo(0.5);
                animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
                animal.inputEnabled = true;
                animal.input.pixelPerfectClick = true;
                animal.events.onInputDown.add(_this.animateAnimal, _this);
            });
            this.currentAnimal = this.animals.next();
            this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
            this.showText(this.currentAnimal);
            this.leftArrow = new Arrow(this.game, 60, this.game.world.centerY);
            this.game.add.existing(this.leftArrow);
            this.leftArrow.anchor.setTo(0.5);
            this.leftArrow.scale.x = -1;
            this.leftArrow.direction = -1;
            this.leftArrow.inputEnabled = true;
            this.leftArrow.input.pixelPerfectClick = true;
            this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
            this.rightArrow = new Arrow(this.game, this.game.world.width - 60, this.game.world.centerY);
            this.game.add.existing(this.rightArrow);
            this.rightArrow.anchor.setTo(0.5);
            this.rightArrow.direction = 1;
            this.rightArrow.inputEnabled = true;
            this.rightArrow.input.pixelPerfectClick = true;
            this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        };
        GameState.prototype.animateAnimal = function (sprite) {
            sprite.play('animate');
            sprite.sound.play();
        };
        GameState.prototype.switchAnimal = function (sprite) {
            var _this = this;
            if (this.isMoving) {
                return false;
            }
            this.isMoving = true;
            this.animalText.visible = false;
            var newAnimal, endX;
            if (sprite.direction > 0) {
                newAnimal = this.animals.next();
                newAnimal.x = -newAnimal.width / 2;
                endX = 640 + this.currentAnimal.width / 2;
            }
            else {
                newAnimal = this.animals.previous();
                newAnimal.x = 640 + newAnimal.width / 2;
                endX = -this.currentAnimal.width / 2;
            }
            var newAnimalMovement = this.add.tween(newAnimal);
            newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
            newAnimalMovement.onComplete.add(function () {
                _this.isMoving = false;
                _this.showText(newAnimal);
            });
            newAnimalMovement.start();
            var currentAnimalMovement = this.add.tween(this.currentAnimal);
            currentAnimalMovement.to({ x: endX }, 1000).start();
            this.currentAnimal = newAnimal;
        };
        GameState.prototype.showText = function (animal) {
            if (!this.animalText) {
                var style = {
                    font: 'bold 30pt Arial',
                    fill: "#D0171B",
                    align: "center"
                };
                this.animalText = this.game.add.text(this.game.width / 2, this.game.height * 0.85, '', style);
                this.animalText.anchor.set(0.5, 0.5);
            }
            this.animalText.setText(animal.text);
            this.animalText.visible = true;
        };
        return GameState;
    }(Phaser.State));
    ToddlerGame.GameState = GameState;
})(ToddlerGame = exports.ToddlerGame || (exports.ToddlerGame = {}));
},{"./Arrow":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
