/// <reference path="./libs/phaser.d.ts" />

import * as BootModule from "./Boot";
import Boot = BootModule.FirstGame.Boot;

import * as LevelModule from "./Level";
import Level = LevelModule.FirstGame.Level;

export namespace FirstGame
{
    export class Game extends Phaser.Game
    {
        constructor()
        {
            super(800, 600, Phaser.AUTO, '');
            this.state.add('Boot', Boot);
            this.state.add('Level', Level);
            this.state.start('Boot');
        }
    }
}

window.onload = () =>
{
    new FirstGame.Game();
};
