/// <reference path="./libs/phaser.d.ts" />

import * as BootModule from "./Boot";
import Boot = BootModule.SpaceHipster.Boot;

import * as MainMenuModule from "./MainMenu";
import MainMenu = MainMenuModule.SpaceHipster.MainMenu;

import * as PlayGameModule from "./PlayGame";
import PlayGame = PlayGameModule.SpaceHipster.PlayGame;

import * as PreloadModule from "./Preload";
import Preload = PreloadModule.SpaceHipster.Preload;

export namespace SpaceHipster
{
    export class Game extends Phaser.Game
    {
        public constructor()
        {
            super(window.innerWidth, window.innerHeight, Phaser.AUTO, '');
            this.state.add('Boot', Boot, false);
            this.state.add('MainMenu', MainMenu, false);
            this.state.add('PlayGame', PlayGame, false);
            this.state.add('Preload', Preload, false);
            this.state.start('Boot');
        }
    }

    export let highScore: number;
}

window.onload = () =>
{
    new SpaceHipster.Game();
};
