define(['Phaser','Game','estados/mundo','sprites/Vehiculos'], function (Phaser,Game,Mundo,Vehiculos) {

    function Rushhour() {
        Phaser.State.call(this);
        this.tablero=[
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ];
        this.tamanoSprite=32;
    }
//Inheritance
    Rushhour.prototype = Object.create(Phaser.State.prototype);
    Rushhour.prototype.constructor = Rushhour;
    Rushhour.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);

        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;

        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.ARCADE;

        this.colSalida = Game.add.group();
        this.colSalida.enableBody=true;
        this.colSalida.visible=true;
        this.colSalida.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();
        this.player = this.playerG.getAt(0);
/*
        var colisionesG= Game.physics.p2.createCollisionGroup();


        Game.physics.p2.updateBoundsCollisionGroup();

        //Game.physics.p2.enable(this.player,false);
        player.body.setCollisionGroup(colisionesG);
        player.body.collides([colisionesG]);

        this.enemyG.forEach(function (car) {
            car.body.setCollisionGroup(colisionesG);
            car.body.collides([colisionesG]);
        },this);
        this.raton = new Phaser.Physics.P2.Body(Game);
        Game.physics.p2.addBody(this.raton);

        Game.input.onDown.add(pulsar,this);
        Game.input.onUp.add(soltar,this);
        Game.input.addMoveCallback(moverVehiculo,this);
        Game.camera.follow(player);*/
       Game.world.swap(this.playerG,this.suelo);
    }

    Rushhour.prototype.update = function () {
        Game.physics.arcade.overlap(this.player, this.colSalida, this.levelCompleted, null, this);
        //Game.physics.arcade.overlap(this.player, this.muro, this.collideMuro, null, this);
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
        this.map.createFromObjects('salida','salida','colisionMP2',751,true,false,this.colSalida);
        this.map.setCollisionBetween(1, 10000, true, this.muro);

    }
    Rushhour.prototype.levelCompleted = function (p,m) {
        Game.global.control.rushhour.haGanado = true;
        // Game.state.add('Mundo', new Mundo());
       // this.music.stop();
        Game.state.start('Mundo');
    }

    Rushhour.prototype.crearTablero = function () {
       var i=0,j=0;
        for(i=0;i<this.player.tam;i++){
            this.tablero[this.player.fila][this.player.col+j]=1;
        }
        this.player.events.onDragStart.add(agarrar);
        this.player.events.onDragStop.add(soltar);

        this.enemyG.forEach(function (car) {
            for(i=0;i<this.car.tam;i++){
                if(car.dir){
                    this.tablero[this.car.fila][this.car.col+j]=1;
                }else{
                    this.tablero[this.car.fila+j][this.car.col]=1;
                }

            }
            this.car.events.onDragStart.add(agarrar);
            this.car.events.onDragStop.add(soltar);
        },this);
    }

    function agarrar(c) {
        var i,inicio,final;

        if(c.dir){
            inicio=c.col;
            final=c.col+c.tam-1;

            for(i=c.col-1;i>=0;i--){
                if(this.tablero[c.fila][i]==0){
                    inicio=i;
                }else{
                    break;
                }
            }

            for(i=c.col+c.tam;i<6;i++){
                if(this.tablero[c.fila][i]==0){
                    final=i;
                }else{
                    break;
                }
            }

            c.input.boundsRect=new Phaser.Rectangle(inicio*this.tamanoSprite,c.y,(final-inicio+1)*this.tamanoSprite,this.tamanoSprite);

        }else{
            inicio=c.fila;
            final=c.fila+c.tam-1;

            for(i=c.fila-1;i>=0;i--){
                if(this.tablero[i][c.col]==0){
                    inicio=i;
                }else{
                    break;
                }
            }

            for(i=c.fila+c.tam;i<6;i++){
                if(this.tablero[i][c.col]==0){
                    final=i;
                }else{
                    break;
                }
            }
            c.input.boundsRect=new Phaser.Rectangle(c.x,inicio*this.tamanoSprite,c.x+c.tam*this.tamanoSprite,(final-inicio+2-c.tam)*this.tamanoSprite);
        }
    }

    function soltar(c) {
        var i;
        for(i=0;i<c.tam;i++){
            if(c.dir){
                this.tablero[c.fila][c.col+i]=0;
            }else{
                this.tablero[c.fila+i][c.col]=0;
            }
        }

        if(c.dir){
            c.col=c.x/this.tamanoSprite;
            for(i=0;i<c.tam;i++){
                this.tablero[c.fila][c.col+i]=1;
            }
        }else{

            c.fila=c.y/this.tamanoSprite;
            for(i=0;i<c.tam;i++){
                this.tablero[c.fila+i][c.col]=1;
            }
        }
    }



/*
    function pulsar(pos) {

        var cuerpos=new Array();
        cuerpos.push(this.playerG.getAt(0).body);
        this.enemyG.forEach(function (car) {
            cuerpos.push(car.body);
        },this);

        var posCuerpos = Game.physics.p2.hitTest(pos.position,cuerpos);

        var PosP2 = [Game.physics.p2.pxmi(pos.x),Game.physics.p2.pxmi(pos.y)];
        var PosA = [pos.x,pos.y]
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
    }*/
    return Rushhour;
});