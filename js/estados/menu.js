define(['Phaser','Game','estados/mundo','TouchControl'], function (Phaser,Game,Mundo,TouchControl) {
    /**
     *
     * @constructor
     */
    function Menu() {
        Phaser.State.call(this);
        this.optionGrupo=null;
        this.soundBoton=null;
    }
//Inheritance
    Menu.prototype = Object.create(Phaser.State.prototype);
    Menu.prototype.constructor = Menu;
    /* download assets code here */
    Menu.prototype.preload = function () {
       //Cargar el mundo inicial
        Game.load.image('tileMP1', 'media/tileset/Hyptosis/hyptosis_tile-art-batch-1.png');
        Game.load.image('tileMP2', 'media/tileset/Hyptosis/hyptosis_til-art-batch-2.png');
        Game.load.image('tileMP3', 'media/tileset/Hyptosis/hyptosis_tile-art-batch-3.png');
        Game.load.image('tileMP4', 'media/tileset/Hyptosis/hyptosis_tile-art-batch-4.png');

        Game.load.image('compass', 'media/image/compass_rose.png');
        Game.load.image('touch_segment', 'media/image/touch_segment.png');
        Game.load.image('touch', 'media/image/touch.png');

        Game.load.spritesheet('colisionMP1', 'media/tileset/Hyptosis/hyptosis_tile-art-batch-1.png',32,32);
        Game.load.spritesheet('colisionMP2', 'media/tileset/Hyptosis/hyptosis_til-art-batch-2.png',32,32);
        Game.load.spritesheet('colisionMP3', 'media/tileset/Hyptosis/hyptosis_tile-art-batch-3.png',32,32);

        Game.load.spritesheet('water','media/tileset/wateranimate2.png',96,193);

        Game.load.tilemap('mapP', "media/map/mapaPrincipal.json", null,Phaser.Tilemap.TILED_JSON);

        Game.load.spritesheet('player', 'media/sprite/actor_10.png',  32, 32);



    }
    /**
     *
     */
    function mostrarMenu(){
        if(this.optionGrupo.y == 0){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: -60
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
        if(this.optionGrupo.y == -60){
            var menuTween = Game.add.tween(this.optionGrupo).to({
                y: 0
            }, 500, Phaser.Easing.Bounce.Out, true);
        }
    }

    /**
     *
     */
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }

    Menu.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);



        Game.add.image(0, 0, 'back_menu');
        var nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY-100, 'EPS WARRIOR',{font:'48px PressStart2P'});
        nameLabel.anchor.setTo(0.5, 0.5);
        var startBo = Game.add.button(Game.world.centerX, Game.world.centerY, "startB", empezar,this);
        startBo.scale.setTo(0.5,0.5);
        startBo.anchor.set(0.5);


        this.optionGrupo = Game.add.group();
        var optionBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 130, "option",mostrarMenu,this);
        optionBoton.scale.setTo(0.5,0.5);
        optionBoton.anchor.set(0.5);
        this.optionGrupo.add(optionBoton);
        this.soundBoton = Game.add.button(Game.world.centerX, Game.world.centerY + 200, "mute",toggleSound,this);
        this.soundBoton.frame=1;
        this.soundBoton.scale.setTo(0.5,0.5);
        this.soundBoton.anchor.set(0.5);
        this.soundBoton.input.useHandCursor = true;
        this.optionGrupo.add(this.soundBoton);

        this.music = this.game.add.audio('menu_music');
        this.music.loop = true;
        this.music.play();


    }
    /**
     *
     */
    function empezar() {
        Game.physics.startSystem(Phaser.Physics.ARCADE);
        Game.state.add('Mundo', new Mundo());
        this.music.stop();
        Game.state.start('Mundo');
    }


    return Menu;


});