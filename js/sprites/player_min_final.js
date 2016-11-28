define(['Phaser'], function (Phaser) {
    Player_min_final = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.add('down',[0,1,2],12,true,true);
        this.animations.add('left',[3,4,5],12,true,true);
        this.animations.add('derecha',[6,7,8],12,true,true);
        this.animations.add('up',[9,10,11],12,true,true);

        this.animations.frame=frame;
        //this.anchor.setTo(1.5,0.5);

        this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }
        game.add.existing(this);
    }


    Player_min_final.prototype = Object.create(Phaser.Sprite.prototype);
    Player_min_final.prototype.constructor = Player_min_final;
    Player_min_final.prototype.update = function () {

        if(this.cursor.up.some(b => b.isDown==true)){
            this.body.velocity.y = -200;
            this.body.velocity.x = 0;
            this.animations.play('up');
        }
        else if(this.cursor.down.some(b=>b.isDown==true)){
            this.body.velocity.y = +200;
            this.body.velocity.x = 0;
            this.animations.play('down');
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
        }
    }

    return Player_min_final;
});