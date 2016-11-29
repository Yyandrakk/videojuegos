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
        this.dog = new Dog(Game);
        this.dog.anchor.setTo(0.5, 0.5);

        this.dog.scale.setTo(0.6,0.6);
        this.listSprites.push(this.dog);
        Game.physics.arcade.enable(this.dog);
        //Game.camera.follow(this.player);
        this.listSprites.push(this.dog);
    }
    Laberinto.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);
        this.dog.position.x = 50;
        this.dog.position.y = 810;
        Game.camera.follow(this.dog);

    }
    Laberinto.prototype.update = function () {
        Game.physics.arcade.collide(this.dog,this.arboles);
        Game.physics.arcade.collide(this.dog,this.objetivo);
        for(i=0;i<this.listSprites.length;i++){
            this.listSprites[i].update();
        }
        Game.physics.arcade.overlap(this.dog, this.objetivo, this.dogDie, null, this);

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
    
    Laberinto.prototype.dogDie = function() {
        this.dog.position.x = 50;
        this.dog.position.y = 810;
    }
    return Laberinto;
});