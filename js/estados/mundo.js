/**
 * Created by oscar on 18/11/16.
 */
define(['Phaser','Game','sprites/player'], function (Phaser,Game,Player) {

    function Mundo() {
        Phaser.State.call(this);
        this.listSprites=[];
    }
//Inheritance
    Mundo.prototype = Object.create(Phaser.State.prototype);
    Mundo.prototype.constructor = Mundo;


    Mundo.prototype.preload = function () {
        this.createWorld();
        this.player = new Player(Game,Game.world.centerX, Game.world.centerY);
        this.player.anchor.setTo(0.5, 0.5);

        this.player.scale.setTo(0.75,0.75);
        Game.physics.arcade.enable(this.player);
        Game.camera.follow(this.player);
        this.listSprites.push(this.player);




    }
    Mundo.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);//posible cambio de 1000 a lo del tilemap


    }
    Mundo.prototype.update = function () {
        for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }
    }
    Mundo.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapP');
        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.layer = this.map.createLayer('Capa suelo');
        this.layer.resizeWorld();
    }
    return Mundo;
});