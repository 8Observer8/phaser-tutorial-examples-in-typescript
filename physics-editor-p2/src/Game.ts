/// <reference path="./libs/phaser.d.ts" />

import { Boot } from "./Boot";
import { Level } from "./Level";

export class Game extends Phaser.Game
{
    public constructor()
    {
        super(800, 600, Phaser.AUTO, "content");
        this.state.add("Boot", Boot, false);
        this.state.add("Level", Level, false);
        this.state.start("Boot");
    }
}
