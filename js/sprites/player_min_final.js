define(['Phaser'], function (Phaser) {
    /**
     *
     * @param game
     * @param x
     * @param y
     * @param key
     * @param frame
     * @constructor
     */
    Player_min_final = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.add('down',[0,1,2],96,true,true);
        this.animations.add('leftd',[3,4,5],96,true,true);
        this.animations.add('left',[12,13,14],96,true,true);
        this.animations.add('leftu',[6,7,8],96,true,true);
        this.animations.add('right',[24,25,26],96,true,true);
        this.animations.add('rightd',[27,28,29],96,true,true);
        this.animations.add('up',[36,37,38],96,true,true);
        this.animations.add('rightu',[39,40,41],96,true,true);
        this.animations.add('dead',[87,88,89]);

        this.animations.frame=frame;
        //this.anchor.setTo(1.5,0.5);

        this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }


       //this.health+=5;
        game.add.existing(this);
    }


    Player_min_final.prototype = Object.create(Phaser.Sprite.prototype);
    Player_min_final.prototype.constructor = Player_min_final;
    Player_min_final.prototype.update = function () {

        if(this.cursor.up.some(b => b.isDown==true)|| this.game.touchControl.cursors.up){
            this.body.velocity.y = -200;
            this.body.velocity.x = 0;
            this.animations.play('up',15);
        }
        else if(this.cursor.down.some(b=>b.isDown==true)||this.game.touchControl.cursors.down){
            this.body.velocity.y = +200;
            this.body.velocity.x = 0;
            this.animations.play('down',15);
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
        }
    }

    return Player_min_final;
});