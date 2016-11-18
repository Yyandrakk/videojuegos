/**
 * Created by oscar on 18/11/16.
 */
define((['Phaser'], function (Phaser) {
    function Player (game,x,y) {
        Phaser.Sprite.call(this,game,x,y,'player');
        this.animations.add('fly',[0,1,2],10,true,true);
        this.animations.play('fly');
        this.anchor.setTo(0.5,0.5);
        this.speed = 0.2;
        game.add.existing(this);
    }

    Player.prototype = Object.create(Phaser.Sprite.prototype);
    Player.prototype.constructor = Player;
    Player.prototype.update = function () {
        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else if(this.cursor.up.isDown){
            this.player.body.velocity.y = +200;
            this.player.animations.play('up');
        }
        else if(this.cursor.down.isDown){
            this.player.body.velocity.y = -200;
            this.player.animations.play('down');
        }
        else {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.animations.stop(); // Stop the animation
            this.player.frame = 4; // Set the player frame to 4 (stand still)
            //this.player.frame = 4; // Set the player frame to 4 (stand still)
        }
        // Make the player jump
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -320;
            this.jumpSound.play();
        }
    }
    return Player;
});