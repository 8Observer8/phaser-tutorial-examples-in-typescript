/// <reference path="./libs/phaser.d.ts" />

export class Level extends Phaser.State
{
    private _player1: Phaser.Sprite;
    private _player2: Phaser.Sprite;

    public constructor()
    {
        super();
    }

    public create()
    {
        // #1
        // this._player1 = this.game.add.sprite(this.game.width / 2, 150, "megatron");
        // this._player2 = this.game.add.sprite(this.game.width / 2, this.game.height, "megatron");

        // this.game.physics.startSystem(Phaser.Physics.P2JS);

        // // Enabled physics on our sprites
        // this.game.physics.p2.enable([this._player1, this._player2]);

        // // Make our one body motionless
        // this._player1.body.static = true;

        // // Now create a sprite between our two bodies, parameters are rest length, stiffness and damping
        // // Rest length is the length of the spring at rest ( where it's not under pressure )
        // // Stiffness is the resistance to movement of the spring
        // // Damping determines how fast the spring loses it's "boing"  Our low damping keeps our spring "boinging"
        // // Boing is a word I made up to describe the up and down motion of a spring doing it's spring thing
        // this.game.physics.p2.createSpring(this._player1, this._player2, 200, 2, 0.3);

        // // Lets loop a timed event every 10 seconds that moves the one end of our spring back to the start
        // // Mostly just so people that didn't see it run the first time in the browser have something to see!
        // this.game.time.events.loop(Phaser.Timer.SECOND * 5, () =>
        // {
        //     this._player2.body.x = this.game.width / 2;
        //     this._player2.body.y = this.game.height;
        // }, this);

        // #2
        this._player1 = this.game.add.sprite(0, 0, "megatron");
        this._player2 = this.game.add.sprite(0, 0, "megatron");

        // Being lazy, positioning sprite after creation so we have a valid width/height
        this._player1.position.set(this._player1.width / 2, 150);

        // Now another sprite on the right side of the screen, down slightly
        this._player2.position.set(this.game.width / 2, 150);

        this.game.physics.startSystem(Phaser.Physics.P2JS);

        // Passing in true while enabling physics on an object causes the debug renderer to draw the physics body
        this.game.physics.p2.enable([this._player1, this._player2], true);

        // You need to call clearShapes() to get rid of the existing bounding box
        this._player1.body.clearShapes();
        this._player2.body.clearShapes();

        // Now load the polygon bounding data we created externally
        this._player1.body.loadPolygon("physicsInfo", "megatron");
        this._player2.body.loadPolygon("physicsInfo", "megatron");

        // Now let's get this party started
        this._player2.body.moveLeft(80);

        // Finally, when the collision occurs, move back to the beginning and start over
        this._player2.body.onBeginContact.add(
            (body: any, bodyB: any, shapeA: any, shapeB: any, equation: any) =>
        {
            this._player2.body.x = this.game.width / 2;
            this._player2.body.y = 150;
        }, this);
    }
}
