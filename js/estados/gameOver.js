define(['Phaser','Game','estados/mundo'], function (Phaser,Game,Mundo) {
    /**
     *
     * @constructor
     */
    function GameOver() {
        Phaser.State.call(this);
        this.optionGrupo=null;
        this.soundBoton=null;
    }
//Inheritance
    GameOver.prototype = Object.create(Phaser.State.prototype);
    GameOver.prototype.constructor = GameOver;
    /* download assets code here */
    GameOver.prototype.preload = function () {
		Game.load.image('fondoGameOver', "media/image/cientificoloco.jpg");
		Game.load.audio('evilLaugh', ['media/sound/Evil Laugh.mp3', 'media/sound/Evil Laugh.wav']);
		Game.load.audio('gameOverMusica', ['media/sound/Final Fantasy Game Over.mp3']);
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

    GameOver.prototype.create = function () {
        Game.add.image(0, 0, 'fondoGameOver');
        var nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY-100, 'GAME OVER',{font:'48px PressStart2P'});
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

        this.risa = this.game.add.audio('evilLaugh');
        this.risa.play();
		this.music = this.game.add.audio('gameOverMusica');
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


    return GameOver;


});