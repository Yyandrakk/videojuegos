define(['Phaser','Game','sprites/player','estados/min_final'], function (Phaser,Game,Player,Min_final) {

    function Mundo() {
        Phaser.State.call(this);
        this.listSprites=[];
    }
//Inheritance
    Mundo.prototype = Object.create(Phaser.State.prototype);
    Mundo.prototype.constructor = Mundo;


    Mundo.prototype.preload = function () {

        Game.load.spritesheet('mage', '../media/sprite/Mage.png',  16, 16);
        Game.load.spritesheet('dog', '../media/sprite/dog.png',  48, 48);
        Game.load.spritesheet('arrow', '../media/sprite/arrow.png',  32,32);
        Game.load.tilemap('mapMF', "../media/map/minijuego_final.json", null,Phaser.Tilemap.TILED_JSON);
        Game.load.tilemap('mapLab', "../media/map/minijuego_laberinto.json", null, Phaser.Tilemap.TILED_JSON);


    }
    Mundo.prototype.create = function () {
        Game.world.setBounds(0,0,40*32,40*32);
        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;
        this.colision = Game.add.group();
        this.colision.enableBody=true;
        this.colision.visible=true;
        this.colision.physicsBodyType=Phaser.Physics.ARCADE;
        this.colLab = Game.add.group();
        this.colLab.enableBody=true;
        this.colLab.visible=true;
        this.colLab.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);
        this.player =  this.playerG.getAt(0);


        /*
        Interesante para el juego de arastrar
        this.player.inputEnabled=true;
        this.player.input.enableDrag(false,false,true);
        this.player.input.priorityID=0;*/

        Game.camera.follow(this.player);



    }
    Mundo.prototype.update = function () {
        Game.physics.arcade.collide(this.player,this.muro);
        Game.physics.arcade.collide(this.player,this.decoracion);

        if(Game.global.control.every(minijuego => return minijuego.haGanado)){
            Game.physics.arcade.overlap(this.player, this.colision, this.load_minfinal, null, this);
        }
        Game.physics.arcade.overlap(this.player, this.colLab, this.load_laberinto, null, this);
        this.player.update();
    }
    Mundo.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapP');

        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('capa muro exterior');
        this.decoracion = this.map.createLayer('decoracion');
        this.map.createFromObjects('inicio','player','player',1,true,false,this.playerG,Player);
        this.map.createFromObjects('colision','min_final','colisionMP2',318,true,false,this.colision);
        this.map.createFromObjects('colision','laberinto','colisionMP2',518,true,false,this.colLab);
        this.map.setCollisionBetween(1, 10000, true, this.muro);
        this.map.setCollisionBetween(1, 10000, true, this.decoracion);
    }
    Mundo.prototype.load_minfinal=function (p,m) {
        Game.state.add('MinFinal', new Min_final());
        Game.state.start('MinFinal');
    }

    Mundo.prototype.load_laberinto=function (p,m) {
       // Game.state.add('Laberinto', new Laberinto());
        // Game.state.start('Laberinto');
    }
    return Mundo;
});