define(['Phaser','Game','estados/mundo','sprites/Vehiculos'], function (Phaser,Game,Mundo,Vehiculos) {

    function Rushhour() {
        Phaser.State.call(this);

    }
//Inheritance
    Rushhour.prototype = Object.create(Phaser.State.prototype);
    Rushhour.prototype.constructor = Rushhour;
    Rushhour.prototype.create = function () {
        Game.physics.p2.gravity.y=0;
        Game.physics.p2.gravity.x=0;
        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.P2JS;

        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.P2JS;

        this.createWorld();

        var colisionesG= Game.physics.p2.createCollisionGroup();
        this.raton = new Phaser.Physics.P2.Body(Game);

        Game.physics.p2.updateBoundsCollisionGroup();
        var player = this.playerG.getAt(0);
        player.body.setCollisionGroup(colisionesG);
        player.body.collides([colisionesG]);

        this.enemyG.forEach(function (car) {
            car.body.setCollisionGroup(colisionesG);
            car.body.collides([colisionesG]);
        },this);

        Game.physics.p2.addBody(this.raton);

        Game.input.onDown.add(pulsar,this);
        Game.input.onUp.add(soltar,this);
        Game.input.addMoveCallback(moverVehiculo,this);

        Game.world.swap(this.playerG,this.suelo);
    }

    Rushhour.prototype.update = function () {


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

    function pulsar(pos) {

        var cuerpos=new Array();
        cuerpos.push(this.playerG.getAt(0).body);
        this.enemyG.forEach(function (car) {
            cuerpos.push(car.body);
        },this);

        var posCuerpos = Game.physics.p2.hitTest(pos.position,cuerpos);

        var PosP2 = [Game.physics.p2.pxmi(pos.position.x),Game.physics.p2.pxmi(pos.position.y)];

        if(posCuerpos.length){

            var SpritePulsado=posCuerpos[0];
            var PosLocal=[0,0];


            SpritePulsado.toLocalFrame(PosLocal,PosP2);
            var mpxiArray=[Game.physics.p2.mpxi(PosLocal[0]),Game.physics.p2.mpxi(PosLocal[1])];
            this.restricionRaton = Game.physics.p2.createRevoluteConstraint(this.raton,[0,0],SpritePulsado,mpxiArray)
        }

    }

    function soltar() {
        Game.physics.p2.removeConstraint(this.restricionRaton)
    }

    function moverVehiculo(pos) {
        this.raton.x=Game.physics.p2.pxmi(pos.x);
        this.raton.y=Game.physics.p2.pxmi(pos.y);
    }
    return Rushhour;
});