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
        this.inputEnabled=true;
        this.input.enableDrag();
        this.input.usedHandCursor=true;

        switch (key){
            case "Audi":
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "taxi":
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "Mini_truck":
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "truck":
                this.input.allowHorizontalDrag=false;
                this.input.allowVerticalDrag=true;
                break;
            case "Black_viper":
                this.input.allowHorizontalDrag=false;
                this.input.allowVerticalDrag=true;
                break;
            default:
        }
        game.add.existing(this);
    }

    Vehiculos.prototype = Object.create(Phaser.Sprite.prototype);
    Vehiculos.prototype.constructor = Vehiculos;

    return Vehiculos;
});