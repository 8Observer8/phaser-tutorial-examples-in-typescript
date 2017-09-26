/// <reference path="./libs/phaser.d.ts" />

import * as BootModule from "./Boot";
import Boot = BootModule.TopDownGame.Boot;

import * as PreloadModule from "./Preload";
import Preload = PreloadModule.TopDownGame.Preload;

import * as PlayGameModule from "./PlayGame";
import PlayGame = PlayGameModule.TopDownGame.PlayGame;

export namespace TopDownGame
{
    export class Game extends Phaser.Game
    {
        constructor(width: number, height: number)
        {
            super(width, height, Phaser.AUTO, '');

            this.state.add('Boot', Boot, false);
            this.state.add('Preload', Preload, false);
            this.state.add('PlayGame', PlayGame, false);

            this.state.start('Boot', true, true);
        }
    }
}

window.onload = () =>
{
    new TopDownGame.Game(160, 160);
    console.log('The game is on');
};
