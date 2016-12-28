define(['Phaser'], function(Phaser){
    function Cuadrado(game,x,y,key){
        Phaser.Sprite.call(this,game,x,y,key);
        this.anchor.setTo(0.5,0.5);
        game.add.existing(this);
        this.cursor = game.input.keyboard.createCursorKeys();
        this.scale.setTo(0.25, 0.25);
        
        this.cursor= {
            up: [game.input.keyboard.addKey(Phaser.Keyboard.W), game.input.keyboard.addKey(Phaser.Keyboard.UP)],
            left: [game.input.keyboard.addKey(Phaser.Keyboard.A), game.input.keyboard.addKey(Phaser.Keyboard.LEFT)],
            right: [game.input.keyboard.addKey(Phaser.Keyboard.D), game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)],
            down: [game.input.keyboard.addKey(Phaser.Keyboard.S), game.input.keyboard.addKey(Phaser.Keyboard.DOWN)]
        }
    }
    
    Cuadrado.prototype = Object.create(Phaser.Sprite.prototype);
    Cuadrado.prototype.constructor = Cuadrado;
    
    Cuadrado.prototype.update = function () {
        if (this.cursor.left.some(bt => bt.isDown==true)) {
            this.body.velocity.x = -200;
            this.body.velocity.y = 0;
        }
        else if (this.cursor.right.some(bt => bt.isDown==true)) {
            this.body.velocity.x = 200;
            this.body.velocity.y = 0;
        }
        else if(this.cursor.up.some(b => b.isDown==true)){
            this.body.velocity.y = -200;
            this.body.velocity.x = 0;
        }
        else if(this.cursor.down.some(b=>b.isDown==true)){
            this.body.velocity.y = +200;
            this.body.velocity.x = 0;
        }
        else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            this.animations.stop();
        }
    }
    return Cuadrado;
});