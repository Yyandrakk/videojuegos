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
    Vehiculos = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.frame=frame;

        game.add.existing(this);
    }

    Vehiculos.prototype = Object.create(Phaser.Sprite.prototype);
    Vehiculos.prototype.constructor = Vehiculos;

    return Vehiculos;
});