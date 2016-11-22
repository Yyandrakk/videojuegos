define(['Phaser','Game','sprites/dog'], function (Phaser,Game,Player) {

    function Laberinto() {
        Phaser.State.call(this);
        this.listSprites=[];
    }
//Inheritance
    Laberinto.prototype = Object.create(Phaser.State.prototype);
    Laberinto.prototype.constructor = Laberinto;


    Laberinto.prototype.preload = function () {
        this.createWorld();
        this.dog = new Dog(Game,Game.world.centerX, Game.world.centerY);
        this.dog.anchor.setTo(0.5, 0.5);

        this.dog.scale.setTo(0.75,0.75);
        Game.physics.arcade.enable(this.dog);
        //Game.camera.follow(this.player);
        this.listSprites.push(this.dog);
    }
    Laberinto.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);


    }
    Mundo.prototype.update = function () {
        Game.physics.arcade.collide(this.dog,this.muro);
        Game.physics.arcade.collide(this.player,this.decoracion);
        for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }

    }
    Mundo.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapLab');
        this.map.addTilesetImage('tora_vx_02');
        this.map.addTilesetImage('mountain_landscape');

        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.paredes = this.map.createLayer('Capa Arboles');
        this.objetivo = this.map.createLayer('Capa Objetivo');
        //this.map.setCollisionBetween(1, 10000, true, this.muro);
        //this.map.setCollisionBetween(1, 10000, true, this.decoracion);


    }
    return Mundo;
});