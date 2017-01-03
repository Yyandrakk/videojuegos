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
    Enemy_min_final = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        /*this.animations.add('down',[0,1,2,3],16,true,true);
        this.animations.add('left',[4,5,6,7],16,true,true);
        this.animations.add('derecha',[8,9,10,11],16,true,true);
        this.animations.add('up',[12,13,14,15],16,true,true);*/

        this.animations.frame=frame;
       // this.scale.setTo(2,2);
        game.add.existing(this);
    }


    Enemy_min_final.prototype = Object.create(Phaser.Sprite.prototype);
    Enemy_min_final.prototype.constructor = Enemy_min_final;
    Enemy_min_final.prototype.update = function () {


    }

    return Enemy_min_final;
});