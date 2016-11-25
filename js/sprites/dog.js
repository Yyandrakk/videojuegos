define(['Phaser'], function (Phaser) {
    function Dog(game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'dog');
        this.animations.add('down',[0,1,2,3],16,true,true);
        this.animations.add('left',[4,5,6,7],16,true,true);
        this.animations.add('derecha',[8,9,10,11],16,true,true);
        this.animations.add('up',[12,13,14,15],16,true,true);

        this.animations.play('down');
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
        this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            left: [game.input.keyboard.addKey(Phaser.Keyboard.A), game.input.keyboard.addKey(Phaser.Keyboard.LEFT)],
            right: [game.input.keyboard.addKey(Phaser.Keyboard.D), game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }
        //this.cursor = game.input.keyboard.createCursorKeys();

    }


    Dog.prototype = Object.create(Phaser.Sprite.prototype);
    Dog.prototype.constructor = Dog;
    Dog.prototype.update = function () {
        if (this.cursor.left.some(bt => bt.isDown==true)) {
            this.body.velocity.x = -200;
            this.animations.play('left');
        }
        else if (this.cursor.right.some(bt => bt.isDown==true)) {
            this.body.velocity.x = 200;
            this.animations.play('derecha');
        }
        else if(this.cursor.up.some(b => b.isDown==true)){
            this.body.velocity.y = -200;
            this.animations.play('up');
        }
        else if(this.cursor.down.some(b=>b.isDown==true)){
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

    return Dog;
});