define(['Phaser','Game','sprites/player_min_final','sprites/enemy_min_final'], function (Phaser,Game,Player_min_final,Enemy_min_final) {

    function Min_final() {
        Phaser.State.call(this);

    }
//Inheritance
    Min_final.prototype = Object.create(Phaser.State.prototype);
    Min_final.prototype.constructor = Min_final;
    Min_final.prototype.preload = function () {

    }
    Min_final.prototype.create = function () {

        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;
        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);
       // Game.world.swap(this.enemyG,this.suelo);
        this.player =  this.playerG.getAt(0);



    }
    Min_final.prototype.update = function () {
        Game.physics.arcade.collide(this.player,this.muro);
        this.player.update();
    }
    Min_final.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapMF');
        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP3');
        this.suelo = this.map.createLayer('suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('muro');
        this.map.createFromObjects('object','player','player',1,true,false,this.playerG,Player_min_final);
        this.map.createFromObjects('object','enemy','mage',1,true,false,this.enemyG,Enemy_min_final);
        this.map.setCollisionBetween(1, 10000, true, this.muro);



    }
    return Min_final;
});