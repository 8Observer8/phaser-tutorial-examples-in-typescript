/// <reference path="./libs/phaser.d.ts" />

import * as GameStateModule from "./GameState";
import GameState = GameStateModule.ToddlerGame.GameState;

export namespace ToddlerGame
{
    export class Game extends Phaser.Game
    {
        constructor()
        {
            super(640, 360, Phaser.AUTO, '');
            this.state.add('GameState', GameState);
            this.state.start('GameState');
        }
    }
}

window.onload = function ()
{
    new ToddlerGame.Game();
};
