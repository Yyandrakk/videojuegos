define(['Phaser','Game','estados/mundo','sprites/Vehiculos'], function (Phaser,Game,Mundo,Vehiculos) {

    function Rushhour() {
        Phaser.State.call(this);

    }
//Inheritance
    Rushhour.prototype = Object.create(Phaser.State.prototype);
    Rushhour.prototype.constructor = Rushhour;
    Rushhour.prototype.create = function () {

        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;

        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.ARCADE;

        this.createWorld();

        Game.world.swap(this.playerG,this.suelo);
    }

    Rushhour.prototype.update = function () {
        Game.physics.arcade.collide(this.playerG,this.muro);
        Game.physics.arcade.collide(this.enemyG,this.muro);

    }

    Rushhour.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapRH');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP4');
        this.suelo = this.map.createLayer('suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('muro');
        this.map.createFromObjects('coches','player','Audi',1,true,false,this.playerG,Vehiculos);
        this.map.createFromObjects('coches','cocV','Black_viper',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','cocH','taxi',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','camV','truck',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','camH','Mini_truck',1,true,false,this.enemyG,Vehiculos);
        this.map.setCollisionBetween(1, 10000, true, this.muro);

    }
    return Rushhour;
});