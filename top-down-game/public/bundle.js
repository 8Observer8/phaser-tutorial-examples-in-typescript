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
var TopDownGame;
(function (TopDownGame) {
    var Boot = /** @class */ (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            return _super.call(this) || this;
        }
        Boot.prototype.preload = function () {
            this.game.load.image('preloadBar', './assets/images/preloader-bar.png');
        };
        Boot.prototype.create = function () {
            this.game.stage.backgroundColor = "#fff";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.state.start('Preload', true, false);
        };
        return Boot;
    }(Phaser.State));
    TopDownGame.Boot = Boot;
})(TopDownGame = exports.TopDownGame || (exports.TopDownGame = {}));
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
var Boot = BootModule.TopDownGame.Boot;
var PreloadModule = require("./Preload");
var Preload = PreloadModule.TopDownGame.Preload;
var PlayGameModule = require("./PlayGame");
var PlayGame = PlayGameModule.TopDownGame.PlayGame;
var TopDownGame;
(function (TopDownGame) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game(width, height) {
            var _this = _super.call(this, width, height, Phaser.AUTO, '') || this;
            _this.state.add('Boot', Boot, false);
            _this.state.add('Preload', Preload, false);
            _this.state.add('PlayGame', PlayGame, false);
            _this.state.start('Boot', true, true);
            return _this;
        }
        return Game;
    }(Phaser.Game));
    TopDownGame.Game = Game;
})(TopDownGame = exports.TopDownGame || (exports.TopDownGame = {}));
window.onload = function () {
    new TopDownGame.Game(160, 160);
    console.log('The game is on');
};
},{"./Boot":1,"./PlayGame":3,"./Preload":4}],3:[function(require,module,exports){
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
var TopDownGame;
(function (TopDownGame) {
    var PlayGame = /** @class */ (function (_super) {
        __extends(PlayGame, _super);
        function PlayGame() {
            return _super.call(this) || this;
        }
        PlayGame.prototype.create = function () {
            this.map = this.game.add.tilemap('level1');
            this.map.addTilesetImage('tiles', 'gameTiles');
            this.background = this.map.createLayer('backgroundLayer');
            this.walls = this.map.createLayer('blockedLayer');
            this.map.setCollisionBetween(1, 2000, true, 'blockedLayer');
            this.background.resizeWorld();
            this.createItems();
            this.createDoors();
            this.createPlayer();
            this.cursors = this.game.input.keyboard.createCursorKeys();
        };
        PlayGame.prototype.createItems = function () {
            var _this = this;
            this.items = this.game.add.group();
            this.items.enableBody = true;
            var result = this.findObjectsByType('item', this.map, 'objectsLayer');
            result.forEach(function (element) {
                _this.createFromTiledObject(element, _this.items);
            });
        };
        PlayGame.prototype.createDoors = function () {
            var _this = this;
            this.doors = this.game.add.group();
            this.items.enableBody = true;
            var result = this.findObjectsByType('door', this.map, 'objectsLayer');
            result.forEach(function (element) {
                _this.createFromTiledObject(element, _this.doors);
            });
        };
        PlayGame.prototype.createPlayer = function () {
            var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
            this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
            this.player.anchor.setTo(0.5);
            this.game.physics.arcade.enable(this.player);
            this.player.body.collideWorldBounds = true;
            this.game.camera.follow(this.player);
        };
        PlayGame.prototype.findObjectsByType = function (type, map, layer) {
            var _this = this;
            var result = [];
            map.objects[layer].forEach(function (element) {
                if (element.properties.type === type) {
                    element.y -= _this.map.tileHeight;
                    result.push(element);
                }
            });
            return result;
        };
        PlayGame.prototype.createFromTiledObject = function (element, group) {
            var sprite = group.create(element.x, element.y, element.properties.sprite);
            Object.keys(element.properties).forEach(function (key) {
                sprite[key] = element.properties[key];
            });
        };
        PlayGame.prototype.update = function () {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.game.physics.arcade.collide(this.player, this.walls);
            this.game.physics.arcade.collide(this.player, this.items, this.collect, null, this);
            if (this.cursors.up.isDown) {
                this.player.body.velocity.y -= 50;
            }
            else if (this.cursors.down.isDown) {
                this.player.body.velocity.y += 50;
            }
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x -= 50;
            }
            else if (this.cursors.right.isDown) {
                this.player.body.velocity.x += 50;
            }
        };
        PlayGame.prototype.collect = function (player, item) {
            item.destroy();
            console.log("yummy");
        };
        return PlayGame;
    }(Phaser.State));
    TopDownGame.PlayGame = PlayGame;
})(TopDownGame = exports.TopDownGame || (exports.TopDownGame = {}));
},{}],4:[function(require,module,exports){
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
var TopDownGame;
(function (TopDownGame) {
    var Preload = /** @class */ (function (_super) {
        __extends(Preload, _super);
        function Preload() {
            return _super.call(this) || this;
        }
        Preload.prototype.preload = function () {
            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadBar');
            this.preloadBar.anchor.setTo(0.5);
            this.load.setPreloadSprite(this.preloadBar);
            this.load.tilemap('level1', './assets/tilemaps/level1.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.tilemap('level2', './assets/tilemaps/level2.json', null, Phaser.Tilemap.TILED_JSON);
            this.load.image('gameTiles', './assets/images/tiles.png');
            this.load.image('greencup', './assets/images/greencup.png');
            this.load.image('bluecup', './assets/images/bluecup.png');
            this.load.image('player', './assets/images/player.png');
            this.load.image('browndoor', './assets/images/browndoor.png');
        };
        Preload.prototype.create = function () {
            this.game.state.start('PlayGame');
        };
        return Preload;
    }(Phaser.State));
    TopDownGame.Preload = Preload;
})(TopDownGame = exports.TopDownGame || (exports.TopDownGame = {}));
},{}]},{},[2])

//# sourceMappingURL=bundle.js.map
