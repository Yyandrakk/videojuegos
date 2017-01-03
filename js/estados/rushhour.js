define(['Phaser','Game','estados/mundo','sprites/Vehiculos'], function (Phaser,Game,Mundo,Vehiculos) {

    function Rushhour() {
        Phaser.State.call(this);

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
        //this.player = this.playerG.getAt(0);

      // Game.world.swap(this.playerG,this.suelo);
       this.crearTablero();
       this.load_boton();
    }

    Rushhour.prototype.update = function () {
        Game.physics.arcade.overlap(this.player, this.colSalida, this.levelCompleted, null, this);
        //Game.physics.arcade.overlap(this.player, this.muro, this.collideMuro, null, this);
    }

    Rushhour.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapRH');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP4');
        this.map.createLayer('suelo');
        this.muro = this.map.createLayer('decoracion');
        /*this.map.createFromObjects('coches','player','Audi',1,true,false,this.playerG,Vehiculos);
        this.map.createFromObjects('coches','cocV','Black_viper',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','cocH','taxi',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','camV','truck',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('coches','camH','Mini_truck',1,true,false,this.enemyG,Vehiculos);*/
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
        Game.add.sprite(0,0,"tablero");


      var vehiculos=new Array();
      vehiculos.push({
          fila:2 ,
          col:  2,
          dir:  true,
          tam:  2,
          key:  "audi"
      });
      vehiculos.push(
           {
               fila:0 ,
               col:  1,
               dir:  true,
               tam:  3,
               key:  "Mini_truck"
      });
      vehiculos.push (
           {
               fila:3 ,
               col:  3,
               dir:  true,
               tam:  3,
               key:  "Mini_truck"
           });
        vehiculos.push( {
               fila: 0 ,
               col:  4,
               dir:  false,
               tam:  3,
               key:  "truck"
           });
        vehiculos.push({
               fila: 4 ,
               col:  3,
               dir:  false,
               tam:  2,
               key:  "Black_viper"
           });
        vehiculos.push({
               fila: 4 ,
               col:  4,
               dir:  true,
               tam:  2,
               key:  "taxi"
           });


       for(j=0;j<vehiculos.length;j++){
            var veh=vehiculos[j];
           for(i=0;i<veh.tam;i++){
               if(veh.dir){
                   Game.global.rush.tablero[veh.fila][veh.col+i]=1;
               }else{
                   Game.global.rush.tablero[veh.fila+i][veh.col]=1;
               }
           }


           if(veh.dir){
              var vehS=Game.add.sprite(Game.global.rush.tamanoSprite*veh.col,Game.global.rush.tamanoSprite*veh.fila,veh.key);
           }else{
              var vehS=Game.add.sprite(Game.global.rush.tamanoSprite*veh.col+Game.global.rush.tamanoSprite,Game.global.rush.tamanoSprite*veh.fila,veh.key);
           }
           vehS.angle=(veh.dir)?0:90;
           vehS.tam=veh.tam;
           vehS.dir=veh.dir;
           vehS.col=veh.col;
           vehS.fila=veh.fila;
           vehS.inputEnabled=true;
           vehS.input.enableDrag();
           vehS.input.enableSnap(Game.global.rush.tamanoSprite,Game.global.rush.tamanoSprite,false,true);
           vehS.input.usedHandCursor=true;
           vehS.input.allowHorizontalDrag=vehS.dir;
           vehS.input.allowVerticalDrag=!vehS.dir;
           vehS.events.onDragStart.add(agarrar);
           vehS.events.onDragStop.add(soltar);

           if(veh.key=="audi"){
               this.player=vehS;
               Game.physics.enable(this.player,Phaser.Physics.ARCADE);
           }

       }

    }

    function agarrar(c) {



        var i,inicio,final;

        if(c.dir){
            inicio=c.col;
            final=c.col+c.tam-1;

            for(i=c.col-1;i>=0;i--){
                if(Game.global.rush.tablero[c.fila][i]==0){
                    inicio=i;
                }else{
                    break;
                }
            }
            if(c.key=="audi"){
                for (i = c.col + c.tam; i < 17; i++) {
                    if (Game.global.rush.tablero[c.fila][i] == 0) {
                        final = i;
                    } else {
                        break;
                    }
                }
            }else {

                for (i = c.col + c.tam; i < 6; i++) {
                    if (Game.global.rush.tablero[c.fila][i] == 0) {
                        final = i;
                    } else {
                        break;
                    }
                }
            }
            c.input.boundsRect=new Phaser.Rectangle(inicio*Game.global.rush.tamanoSprite,c.y,(final-inicio+1)*Game.global.rush.tamanoSprite,Game.global.rush.tamanoSprite);

        }else{
            inicio=c.fila;
            final=c.fila+c.tam-1;

            for(i=c.fila-1;i>=0;i--){
                if(Game.global.rush.tablero[i][c.col]==0){
                    inicio=i;
                }else{
                    break;
                }
            }

            for(i=c.fila+c.tam;i<6;i++){
                if(Game.global.rush.tablero[i][c.col]==0){
                    final=i;
                }else{
                    break;
                }
            }
            c.input.boundsRect=new Phaser.Rectangle(c.x,inicio*Game.global.rush.tamanoSprite,c.x+c.tam*Game.global.rush.tamanoSprite,(final-inicio+2-c.tam)*Game.global.rush.tamanoSprite);
        }
    }

    function soltar(c) {
        var i;
        for(i=0;i<c.tam;i++){
            if(c.dir){
                Game.global.rush.tablero[c.fila][c.col+i]=0;
            }else{
                Game.global.rush.tablero[c.fila+i][c.col]=0;
            }
        }

        if(c.dir){
            c.col=c.x/Game.global.rush.tamanoSprite;
            for(i=0;i<c.tam;i++){
                Game.global.rush.tablero[c.fila][c.col+i]=1;
            }
        }else{

            c.fila=c.y/Game.global.rush.tamanoSprite;
            for(i=0;i<c.tam;i++){
                Game.global.rush.tablero[c.fila+i][c.col]=1;
            }
        }

    }

    Rushhour.prototype.load_boton=function () {

        this.optionGrupo = Game.add.group();
        this.optionGrupo.fixedToCamera=true;
        this.optionGrupo.cameraOffset.setTo( 0,0);

        var optionBoton = Game.add.button( Game.width-30,Game.height-30, "option",mostrarMenu,this);
        optionBoton.scale.setTo(0.5,0.5);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);

        this.soundBoton = Game.add.button(Game.width-30, Game.height +30, "mute",toggleSound,this);
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;
        this.soundBoton.scale.setTo(0.5,0.5);
        this.soundBoton.anchor.set(0.5);
        this.soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(this.soundBoton);


        this.quitJuego = Game.add.button(Game.width-30, Game.height +90, "salir",salirMenu,this);
        this.quitJuego.scale.setTo(0.5,0.5);
        this.quitJuego.anchor.set(0.5);
        this.quitJuego.input.useHandCursor = true;
        this.optionGrupo.add( this.quitJuego);
    }


    function mostrarMenu(){
        Game.physics.arcade.isPaused=! Game.physics.arcade.isPaused;
        if(this.optionGrupo.cameraOffset.y == 0){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: -120
            }, 500, Phaser.Easing.Bounce.Out, true);

        }
        if(this.optionGrupo.cameraOffset.y == -120){

            var menuTween = Game.add.tween(this.optionGrupo.cameraOffset).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }

    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }
    function salirMenu() {
        if(confirm("¿Esta seguro de que quiere salir al menu?"))
            Game.state.start('Menu');

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