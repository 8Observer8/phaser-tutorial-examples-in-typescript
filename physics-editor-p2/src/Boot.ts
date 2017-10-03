/// <reference path="./libs/phaser.d.ts" />

export class Boot extends Phaser.State
{
    public constructor()
    {
        super();
    }

    public preload()
    {
        this.load.image("megatron", "./assets/megatron.png");
        this.game.load.physics("physicsInfo", "./assets/physics.json");
    }

    public create()
    {
        this.game.state.start("Level");
    }
}