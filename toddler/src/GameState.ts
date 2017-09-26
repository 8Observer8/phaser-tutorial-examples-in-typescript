/// <reference path="./libs/phaser.d.ts" />

import * as ArrowModule from "./Arrow";
import Arrow = ArrowModule.ToddlerGame.Arrow;

import * as IAnimalDataModule from "./IAnimalData";
import IAnimalData = IAnimalDataModule.ToddlerGame.IAnimalData;

import * as AnimalModule from "./Animal";
import Animal = AnimalModule.ToddlerGame.Animal;

export namespace ToddlerGame
{
    export class GameState extends Phaser.State
    {
        background: Phaser.Sprite;
        animals: Phaser.Group;
        currentAnimal: any;
        leftArrow: Arrow;
        rightArrow: Arrow;
        isMoving: boolean;
        animalText: Phaser.Text;

        init()
        {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        }

        preload()
        {
            this.load.image('background', './assets/images/background.png');
            this.load.image('arrow', './assets/images/arrow.png');
            this.load.spritesheet('chicken', './assets/images/chicken_spritesheet.png', 131, 200, 3);
            this.load.spritesheet('horse', './assets/images/horse_spritesheet.png', 212, 200, 3);
            this.load.spritesheet('pig', './assets/images/pig_spritesheet.png', 297, 200, 3);
            this.load.spritesheet('sheep', './assets/images/sheep_spritesheet.png', 244, 200, 3);
            this.load.audio('chickenSound', ['./assets/audio/chicken.ogg', './assets/audio/chicken.mp3']);
            this.load.audio('horseSound', ['./assets/audio/horse.ogg', './assets/audio/horse.mp3']);
            this.load.audio('pigSound', ['./assets/audio/pig.ogg', './assets/audio/pig.mp3']);
            this.load.audio('sheepSound', ['./assets/audio/sheep.ogg', './assets/audio/sheep.mp3']);
        }

        create()
        {
            this.background = this.game.add.sprite(0, 0, 'background');

            let animalData: IAnimalData[] = [
                { key: 'chicken', text: 'CHICKEN', sound: 'chickenSound' },
                { key: 'horse', text: 'HORSE', sound: 'horseSound' },
                { key: 'pig', text: 'PIG', sound: 'pigSound' },
                { key: 'sheep', text: 'SHEEP', sound: 'sheepSound' }
            ];

            this.animals = this.game.add.group();

            let animal: Animal;
            animalData.forEach((element: IAnimalData) =>
            {
                animal = this.animals.create(-1000, this.game.world.centerY, element.key, 0);
                animal.text = element.text;
                animal.sound = this.game.add.audio(element.sound);
                animal.anchor.setTo(0.5);
                animal.animations.add('animate', [0, 1, 2, 1, 0, 1], 3, false);
                animal.inputEnabled = true;
                animal.input.pixelPerfectClick = true;
                animal.events.onInputDown.add(this.animateAnimal, this);
            });

            this.currentAnimal = this.animals.next();
            this.currentAnimal.position.set(this.game.world.centerX, this.game.world.centerY);
            this.showText(this.currentAnimal);

            this.leftArrow = new Arrow(this.game, 60, this.game.world.centerY);
            this.game.add.existing(this.leftArrow);
            this.leftArrow.anchor.setTo(0.5);
            this.leftArrow.scale.x = -1;
            this.leftArrow.direction = -1;
            this.leftArrow.inputEnabled = true;
            this.leftArrow.input.pixelPerfectClick = true;
            this.leftArrow.events.onInputDown.add(this.switchAnimal, this);

            this.rightArrow = new Arrow(this.game, this.game.world.width - 60, this.game.world.centerY);
            this.game.add.existing(this.rightArrow);
            this.rightArrow.anchor.setTo(0.5);
            this.rightArrow.direction = 1;
            this.rightArrow.inputEnabled = true;
            this.rightArrow.input.pixelPerfectClick = true;
            this.rightArrow.events.onInputDown.add(this.switchAnimal, this);
        }

        animateAnimal(sprite: Animal)
        {
            sprite.play('animate');
            sprite.sound.play();
        }

        switchAnimal(sprite: Arrow)
        {
            if (this.isMoving)
            {
                return false;
            }
            this.isMoving = true;
            this.animalText.visible = false;

            let newAnimal: any, endX: number;
            if (sprite.direction > 0)
            {
                newAnimal = this.animals.next();
                newAnimal.x = -newAnimal.width / 2;
                endX = 640 + this.currentAnimal.width / 2;
            }
            else
            {
                newAnimal = this.animals.previous();
                newAnimal.x = 640 + newAnimal.width / 2;
                endX = -this.currentAnimal.width / 2;
            }

            let newAnimalMovement = this.add.tween(newAnimal);
            newAnimalMovement.to({ x: this.game.world.centerX }, 1000);
            newAnimalMovement.onComplete.add(() =>
            {
                this.isMoving = false;
                this.showText(newAnimal);
            });
            newAnimalMovement.start();

            let currentAnimalMovement = this.add.tween(this.currentAnimal);
            currentAnimalMovement.to({ x: endX }, 1000).start();

            this.currentAnimal = newAnimal;
        }

        showText(animal: Animal)
        {
            if (!this.animalText)
            {
                let style = {
                    font: 'bold 30pt Arial',
                    fill: "#D0171B",
                    align: "center"
                };
                this.animalText = this.game.add.text(this.game.width / 2, this.game.height * 0.85, '', style);
                this.animalText.anchor.set(0.5, 0.5);
            }
            this.animalText.setText(animal.text);
            this.animalText.visible = true;
        }
    }
}
