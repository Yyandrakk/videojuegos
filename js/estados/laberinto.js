define(['Phaser','Game','sprites/dog'], function (Phaser,Game,Dog) {

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
        this.listSprites.push(this.dog);
        Game.physics.arcade.enable(this.dog);
        //Game.camera.follow(this.player);
        this.listSprites.push(this.dog);
    }
    Laberinto.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);
        Game.camera.follow(this.dog);

    }
    Laberinto.prototype.update = function () {
        Game.physics.arcade.collide(this.dog,this.arboles);
        Game.physics.arcade.collide(this.dog,this.objetivo);
        for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }

    }
    Laberinto.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapLab', tileWidth=50, tileHeight=50);
        
        this.map.addTilesetImage('tora_vx_02');
        this.map.addTilesetImage('mountain_landscape');

        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.arboles = this.map.createLayer('Capa Arboles');
        this.objetivo = this.map.createLayer('Capa Objetivo');
        this.map.setCollisionBetween(1, 10000, true, this.arboles);
        this.map.setCollisionBetween(1, 10000, true, this.objetivo);


    }
    return Laberinto;
});