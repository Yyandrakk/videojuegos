define(['Phaser','Game','sprites/player','estados/min_final','estados/laberinto','estados/rushhour','estados/puzzle'], function (Phaser,Game,Player,Min_final,Laberinto,Rushhour,Puzzle) {
    /**
     * Es un estado que permite moverte entre los minijuegos
     * @constructor
     */
    function Mundo() {
        Phaser.State.call(this);
        this.optionGrupo=null;
        this.soundBoton=null;
        this.desbloquear=false;
    }
//Inheritance
    Mundo.prototype = Object.create(Phaser.State.prototype);
    Mundo.prototype.constructor = Mundo;


    Mundo.prototype.preload = function () {
        var loadingLabel = Game.add.text(Game.world.centerX, 150, 'Cargando...',{ font: '30px PermanentMarker', fill: '#701e84' });
        loadingLabel.anchor.setTo(0.5, 0.5);
        var progressBar = Game.add.sprite(Game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        Game.load.setPreloadSprite(progressBar);
        Game.load.spritesheet('mage', 'media/sprite/face_w2_2d.png',32,32);
        Game.load.spritesheet('dog', 'media/sprite/dog.png',  32, 32);
        Game.load.spritesheet('arrow', 'media/sprite/arrow.png',  32,32);
        Game.load.image('audi', 'media/sprite/Audi.png');
        Game.load.image('Black_viper', 'media/sprite/Black_viper.png');
        Game.load.image('Mini_truck', 'media/sprite/Mini_truck.png');
        Game.load.image('taxi', 'media/sprite/taxi.png');
        Game.load.image('truck', 'media/sprite/truck.png');
        Game.load.image('tablero','media/image/field.png');
        Game.load.tilemap('mapMF', "media/map/minijuego_final.json", null,Phaser.Tilemap.TILED_JSON);
        Game.load.tilemap('mapRH', "media/map/rushhour.json", null,Phaser.Tilemap.TILED_JSON);
        Game.load.tilemap('mapLab', "media/map/minijuego_laberinto.json", null, Phaser.Tilemap.TILED_JSON);
        Game.load.image('tora_vx_02', 'media/tileset/tora_vx_02.png');
        Game.load.image('mountain_landscape', 'media/tileset/mountain_landscape.png');
        Game.load.audio('shoot_arrow', ['media/sound/shoot_arrow_mike-koenig.mp3', 'media/sound/shoot_arrow_mike-koenig.wav']);
        Game.load.audio('music_min_final', ['media/sound/Zander_Noriega-Fight_Them_Until_We_Cant.mp3', 'media/sound/Zander_Noriega-Fight_Them_Until_We_Cant.wav']);


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

        this.colPuz = Game.add.group();
        this.colPuz.enableBody=true;
        this.colPuz.visible=true;
        this.colPuz.physicsBodyType=Phaser.Physics.ARCADE;

        this.colRush = Game.add.group();
        this.colRush.enableBody=true;
        this.colRush.visible=true;
        this.colRush.physicsBodyType=Phaser.Physics.ARCADE;

        this.waterA = Game.add.group();
        this.waterA.visible=true;
        this.createWorld();

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);
        Game.world.swap(this.waterA,this.decoracion);
        Game.world.swap(this.decoracion,this.muro);
        this.player =  this.playerG.getAt(0);
        this.water = this.waterA.getAt(0);
        this.water.animations.add('move',[0,1,2,3],12,true,true);
        this.water.animations.play('move');


        /*
        Interesante para el juego de arastrar
        this.player.inputEnabled=true;
        this.player.input.enableDrag(false,false,true);
        this.player.input.priorityID=0;*/

        Game.camera.follow(this.player);
        if(Game.rnd.integerInRange(0, 10)<5){
            this.music = this.game.add.audio('mundo_music');
        }
        else{
            this.music = this.game.add.audio('mundo_music2')
        }
        this.music.loop = true;
        this.music.play();
        this.load_boton();
       // Game.world.swap(this.optionGrupo,this.suelo);
        //console.log([].slice.apply(Game.global.control));

    }
    Mundo.prototype.update = function () {
        Game.physics.arcade.collide(this.player,this.muro);
        Game.physics.arcade.collide(this.player,this.decoracion);

       if(this.desbloquear){
            Game.physics.arcade.overlap(this.player, this.colision, this.load_minfinal, null, this);
       }else{
           desbloquearFinal();
       }
        Game.physics.arcade.overlap(this.player, this.colLab, this.load_laberinto, null, this);
        Game.physics.arcade.overlap(this.player, this.colPuz, this.load_puzzle, null, this);
        Game.physics.arcade.overlap(this.player, this.colRush, this.load_Rushhour, null, this);
        this.player.update();
    }
    /**
     *
     */
    Mundo.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapP');

        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP3');
        this.map.addTilesetImage('tileMP4');
        this.suelo = this.map.createLayer('Capa suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('capa muro exterior');
        this.decoracion = this.map.createLayer('decoracion');
        this.map.createFromObjects('inicio','player','player',1,true,false,this.playerG,Player);
        this.map.createFromObjects('colision','min_final','colisionMP2',318,true,false,this.colision);
        this.map.createFromObjects('colision','puzzle','colisionMP2',518,true,false,this.colPuz);
        this.map.createFromObjects('colision','laberinto','colisionMP2',130,true,false,this.colLab);
        this.map.createFromObjects('colision','rushhour','colisionMP3',561,true,false,this.colRush);
        this.map.createFromObjects('colision','rushhour2','colisionMP3',531,true,false,this.colRush);

        this.map.createFromObjects('animated','water','water',0,true,false,this.waterA);
        this.map.setCollisionBetween(1, 10000, true, this.muro);
        this.map.setCollisionBetween(1, 10000, true, this.decoracion);
    }
    /**
     *
     * @param p
     * @param m
     */
    Mundo.prototype.load_minfinal=function (p,m) {
        Game.state.add('MinFinal', new Min_final());
        this.music.stop();
        Game.state.start('MinFinal');
    }
    /**
     *
     * @param p
     * @param m
     */
    Mundo.prototype.load_laberinto=function (p,m) {
       Game.state.add('Laberinto', new Laberinto());
        this.music.stop();
       Game.state.start('Laberinto');
    }
    /**
     *
     * @param p
     * @param m
     */
    Mundo.prototype.load_Rushhour=function (p,m) {
        Game.state.add('Rushhour', new Rushhour());
        this.music.stop();
        Game.state.start('Rushhour');
    }
    /**
     *
     * @param p
     * @param m
     */
    Mundo.prototype.load_puzzle=function (p,m) {
        Game.state.add('Puzzle', new Puzzle());
        this.music.stop();
        Game.state.start('Puzzle');
    }

    /**
     * Se encarga de generar los botones en su sitio
     */
    Mundo.prototype.load_boton=function () {

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
        if(confirm("¿Esta seguro de que quiere salir al menu?")) {
            for (var mini in Game.global.control){
                mini.haGanado=false
            }
            Game.state.start('Menu');
        }
    }

    /**
     * Desbloquea el minijuego final cuando se ganan todos
     */
    function desbloquearFinal(){
        for (var mini in Game.global.control){
            if(mini.haGanado==false){
                return;
            }
        }
        this.desbloquear=true;
    }
    return Mundo;
});