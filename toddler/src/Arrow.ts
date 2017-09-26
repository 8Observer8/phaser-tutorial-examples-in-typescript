/// <reference path="./libs/phaser.d.ts" />

export namespace ToddlerGame
{
    export class Arrow extends Phaser.Sprite
    {
        direction: number;
        constructor(game: Phaser.Game, x: number, y: number)
        {
            super(game, x, y, 'arrow');
        }
    }
}
