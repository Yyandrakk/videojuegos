define(['Phaser'], function (Phaser) {
    Vehiculos = function(game,x,y,key,frame) {
        Phaser.Sprite.call(this,game,x,y,key);
        this.animations.frame=frame;
        /*this.inputEnabled=true;
        this.input.enableDrag();
        this.input.usedHandCursor=true;


        switch (key){
            case "Audi":
                this.scale.setTo(2,1);
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "taxi":
                this.scale.setTo(2,1);
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "Mini_truck":
                this.scale.setTo(3,1);
                this.input.allowHorizontalDrag=true;
                this.input.allowVerticalDrag=false;
                break;
            case "truck":
                this.scale.setTo(1,3);
                this.input.allowHorizontalDrag=false;
                this.input.allowVerticalDrag=true;
                break;
            case "Black_viper":
                this.scale.setTo(1,3);
                this.input.allowHorizontalDrag=false;
                this.input.allowVerticalDrag=true;
                break;
            default:
        }*/
        game.add.existing(this);
    }

    Vehiculos.prototype = Object.create(Phaser.Sprite.prototype);
    Vehiculos.prototype.constructor = Vehiculos;

    return Vehiculos;
});