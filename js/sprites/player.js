define(['Phaser','Game'], function (Phaser,Game) {
    /**
     * Sprite para el mundo
     * @param game - Phaser.Game
     * @param {number} x - Coordenada  x
     * @param {number} y - Coordenada y
     * @param {string} key - Imagen precargada para el sprite
     * @param {number} frame - Id del frame del spritesheet
     * @constructor
     */
     Player = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.add('down',[0,1,2],96,true,true);
        this.animations.add('leftd',[3,4,5],96,true,true);
        this.animations.add('left',[12,13,14],96,true,true);
        this.animations.add('leftu',[15,16,17],96,true,true);
        this.animations.add('right',[24,25,26],96,true,true);
        this.animations.add('rightd',[27,28,29],96,true,true);
        this.animations.add('up',[36,37,38],96,true,true);
        this.animations.add('rightu',[39,40,41],96,true,true);

        this.animations.frame=frame;
        this.anchor.setTo(0.5,0.5);
        game.input.mouse.capture = true;
        this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            left: [game.input.keyboard.addKey(Phaser.Keyboard.A), game.input.keyboard.addKey(Phaser.Keyboard.LEFT)],
            right: [game.input.keyboard.addKey(Phaser.Keyboard.D), game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }
         game.add.existing(this);
    }

    /**
     *
     * @type {Phaser.Sprite}
     */
    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.update = function () {

        if((this.cursor.left.some(bt => bt.isDown==true) && this.cursor.up.some(b => b.isDown==true))){
            this.body.velocity.x = -200;
            this.body.velocity.y = -200;
            this.animations.play('leftu',15);
        }
        else if(this.cursor.left.some(bt => bt.isDown==true) && this.cursor.down.some(b => b.isDown==true)){
            this.body.velocity.x = -200;
            this.body.velocity.y = +200;
            this.animations.play('leftd',15);
        }else if(this.cursor.right.some(bt => bt.isDown==true) && this.cursor.down.some(b => b.isDown==true)){
            this.body.velocity.x = +200;
            this.body.velocity.y = +200;
            this.animations.play('rightd');
        }else if(this.cursor.right.some(bt => bt.isDown==true) && this.cursor.up.some(b => b.isDown==true)){
            this.body.velocity.x = +200;
            this.body.velocity.y = -200;
            this.animations.play('rightu',15);
        }
        else if ((this.cursor.left.some(bt => bt.isDown==true))|| Game.touchControl.cursors.left ) {
            this.body.velocity.x = -200;
            this.body.velocity.y = 0;
            this.animations.play('left',15);
        }
        else if (this.cursor.right.some(bt => bt.isDown==true)||Game.touchControl.cursors.right) {
            this.body.velocity.x = 200;
            this.body.velocity.y = 0;
            this.animations.play('right',15);
        }
        else if((this.cursor.up.some(b => b.isDown==true)) || Game.touchControl.cursors.up ){
            this.body.velocity.y = -200;
            this.body.velocity.x = 0;
            this.animations.play('up',15);
        }
        else if(this.cursor.down.some(b=>b.isDown==true)||Game.touchControl.cursors.down){
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

    return Player;
});