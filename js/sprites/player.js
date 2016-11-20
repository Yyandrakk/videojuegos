/**
 * Created by oscar on 18/11/16.
 */
define(['Phaser'], function (Phaser) {
    function Player (game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'player');
        this.animations.add('down',[0,1,2],12,true,true);
        this.animations.add('left',[3,4,5],12,true,true);
        this.animations.add('derecha',[6,7,8],12,true,true);
        this.animations.add('up',[9,10,11],12,true,true);

        this.animations.play('down');
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
        /*this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            left: [game.input.keyboard.addKey(Phaser.Keyboard.A), game.input.keyboard.addKey(Phaser.Keyboard.LEFT)],
            right: [game.input.keyboard.addKey(Phaser.Keyboard.D), game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }*/
        this.cursor = game.input.keyboard.createCursorKeys();

    }


    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.update = function () {
        if (this.cursor.left.isDown) {
            this.body.velocity.x = -200;
            this.animations.play('left');
        }
        else if (this.cursor.right.isDown) {
            this.body.velocity.x = 200;
            this.animations.play('derecha');
        }
        else if(this.cursor.up.isDown){
            this.body.velocity.y = -200;
            this.animations.play('up');
        }
        else if(this.cursor.down.isDown){
            this.body.velocity.y = +200;
            this.animations.play('down');
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
            //this.player.frame = 1;
        }
    }

    return Player;
});