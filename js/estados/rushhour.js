define(['Phaser','Game','estados/mundo','sprites/Vehiculos','JQuery','estados/gameOver'], function (Phaser,Game,Mundo,Vehiculos,$,GameOver) {
    /**
     * Estado que representa al minijuego Rush Hour
     * @constructor
     */
    function Rushhour() {
        Phaser.State.call(this);


    }
//Inheritance
    /**
     *
     * @type {Phaser.State}
     */
    Rushhour.prototype = Object.create(Phaser.State.prototype);
    Rushhour.prototype.constructor = Rushhour;

    Rushhour.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);
        this.sound_car = this.game.add.audio('car');
        this.music = this.game.add.audio('To_New_World');
        this.music.loop = true;
        this.music.play();
        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.ARCADE;

        this.colSalida = Game.add.group();
        this.colSalida.enableBody=true;
        this.colSalida.visible=true;
        this.colSalida.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();
        Game.world.swap(this.enemyG,this.suelo);
        this.crearTablero();
        this.load_boton();


        this.enemyG.forEach(function (e) {
            e.body.gravity.x=500;
            e.body.velocity.y=100*Game.rnd.realInRange(0.5,1.5);
            e.body.bounce.y=1;
        },this);



    }

    Rushhour.prototype.update = function () {
        Game.physics.arcade.overlap(this.player, this.colSalida, this.levelCompleted, null, this);
        Game.physics.arcade.collide(this.enemyG, this.muro);
        Game.physics.arcade.overlap(this.player, this.enemyG, this.levelInCompleted, null, this);
    }
    /**
     * Carga el tile Map
     */
    Rushhour.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapRH');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP4');
        this.suelo=this.map.createLayer('suelo');
        this.muro = this.map.createLayer('decoracion');
        this.map.createFromObjects('coches','poli','Police',1,true,false,this.enemyG,Vehiculos);
        this.map.createFromObjects('salida','salida','colisionMP2',751,true,false,this.colSalida);
        this.map.setCollisionBetween(1, 10000, true, this.muro);

    }
    /**
     * Devuelve al jugador al mundo y marca como ganada la partida
     * @param p - No se usa, necesario para el overlap
     * @param m - No se usa, necesario para el overlap
     */
    Rushhour.prototype.levelCompleted = function (p,m) {
        Game.global.control.rushhour.haGanado = true;

        this.music.stop();
        Game.state.start('Mundo');
    }
    /**
     * Devuelve al jugador al mundo cuando pierde
     * @param p - No se usa, necesario para el overlap
     * @param m - No se usa, necesario para el overlap
     */
    Rushhour.prototype.levelInCompleted = function (p,m) {

        this.music.stop();
        Game.state.add('GameOver', new GameOver());
        Game.state.start('GameOver');
    }


    /**
     *  Se usa JQuery sincrono para leer desde un archivo JSON los datos de cada vehiculo
      * @param {Array} vehiculos - Array donde se insertan los datos de los vehiculos
     */
    Rushhour.prototype.leerVehiculos = function (vehiculos) {
        $.getJSON("media/map/rush/patronRushHour.json",function (datos) {

            $.each(datos["vehiculos"],function (id,veh) {

                vehiculos.push(veh);

            });
        });
    }
    /**
     * Carga el tablero en su posicion, tambien añade los vehiculos en su posicion
     */
    Rushhour.prototype.crearTablero = function () {

        var i=0,j=0;
        Game.add.sprite(0,0,"tablero");

        Game.global.rush.tablero=[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];


        var vehiculos=new Array();
        $.ajaxSetup({async:false});
        this.leerVehiculos(vehiculos);

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
            vehS.music= this.sound_car;
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
    /**
     * El evento que se dispara cuando pulsa y arrastra un vehiculo,
     * evitando que salga del tablero y permite las colisiones
     * @param {Phaser.Sprite} c - Vehiculo que esta pulsando
     */
    function agarrar(c) {

        var i,inicio,final;
        c.music.play();
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
                for (i = c.col + c.tam; i < 18; i++) {
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

    /**
     * Actualiza el tablero cuando suelta un vehiculo en su nueva posicion.
     * @param {Phaser.Sprite} c - Vehiculo que ha soltado.
     */
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

    /**
     * Se encarga de generar los botones en su sitio
     */
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

    /**
     * Se encarga de mostrar o ocultar el resto de botones cuando se da al de opciones
     */
    function mostrarMenu(){

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

    /**
     * Pone o quita el sonido
     */
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }

    /**
     * Accion cuando se pulsa el boton de salir, vuelves al menu de inicio, reiniciando el juego
     */
    function salirMenu() {
        if (confirm("¿Esta seguro de que quiere salir al menu?")) {
            for (var mini in Game.global.control) {
                mini.haGanado = false
            }
            this.music.stop();
            Game.state.start('Menu');
        }
    }

    return Rushhour;
});