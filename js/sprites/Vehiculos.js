define(['Phaser'], function (Phaser) {
    /**
     * Sprite de los vehiculos para el Rush Hour
     * @param game - Phaser.Game
     * @param {number} x - Coordenada  x
     * @param {number} y - Coordenada y
     * @param {string} key - Imagen precargada para el sprite
     * @param {number} frame - Id del frame del spritesheet
     * @constructor
     */
    Vehiculos = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.frame=frame;

        game.add.existing(this);
    }
    /**
     *
     * @type {Phaser.Sprite}
     */
    Vehiculos.prototype = Object.create(Phaser.Sprite.prototype);
    Vehiculos.prototype.constructor = Vehiculos;

    return Vehiculos;
});