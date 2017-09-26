/// <reference path="./libs/phaser.d.ts" />

export namespace SpaceHipster
{
    export class Preload extends Phaser.State
    {
        public constructor()
        {
            super();
        }

        splash: Phaser.Sprite;
        preloadBar: Phaser.Sprite;

        preload()
        {
            // Setting up the game loading screen
            this.splash = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
            this.splash.anchor.setTo(0.5);

            this.preloadBar = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloadbar');
            this.preloadBar.anchor.setTo(0.5);

            this.game.load.setPreloadSprite(this.preloadBar);

            // Pre-loading Assets now
            this.game.load.image('space', './assets/images/space.png');
            this.game.load.image('rock', './assets/images/rock.png');
            this.game.load.image('playerParticle', './assets/images/player-particle.png');

            this.game.load.spritesheet('playership', './assets/images/player.png', 12, 12);
            this.game.load.spritesheet('power', './assets/images/power.png', 12, 12);

            this.game.load.audio('collect', './assets/audio/collect.ogg');
            this.game.load.audio('explosion', './assets/audio/explosion.ogg');
        }

        create()
        {
            this.game.state.start('MainMenu');
        }
    }
}
