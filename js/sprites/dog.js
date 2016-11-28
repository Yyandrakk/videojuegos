define(['Phaser'], function (Phaser) {
    function Dog(game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'dog');
        this.animations.add('down',[0,1,2,3],16,true,true);
        this.animations.add('derecha',[4,5,6,7],16,true,true);
        this.animations.add('up',[8,9,10,11],16,true,true);
        this.animations.add('left',[12,13,14,15],16,true,true);

        this.animations.play('down');
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
        game.input.mouse.capture = true;
        //this.cursor = game.input.keyboard.createCursorKeys();

    }


    Dog.prototype = Object.create(Phaser.Sprite.prototype);
    Dog.prototype.constructor = Dog;
    Dog.prototype.update = function () {
        if (game.input.mousePointer.isDown) {
            game.physics.arcade.moveToPointer(this.body, 400);
            if (Phaser.Rectangle.contains(this.body, game.input.x, game.input.y))
                this.body.velocity.setTo(0, 0);
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
            //this.player.frame = 1;
        }
    }

    return Dog;
});