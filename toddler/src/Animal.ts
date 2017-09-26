/// <reference path="./libs/phaser.d.ts" />

export namespace ToddlerGame
{
    export class Animal extends Phaser.Sprite
    {
        text: string;
        sound: Phaser.Sound;
        constructor(game: Phaser.Game, x: number, y: number, key: string)
        {
            super(game, x, y, key);
        }
    }
}
