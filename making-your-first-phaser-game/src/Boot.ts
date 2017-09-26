/// <reference path="./libs/phaser.d.ts" />

export namespace FirstGame
{
    export class Boot extends Phaser.State
    {
        constructor()
        {
            super();
        }

        init()
        {
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
        }

        preload()
        {
            this.load.image('sky', './assets/sky.png');
            this.load.image('ground', './assets/platform.png');
            this.load.image('star', './assets/star.png');
            this.load.spritesheet('dude', './assets/dude.png', 32, 48);
        }

        create()
        {
            this.game.state.start('Level');
        }
    }
}
