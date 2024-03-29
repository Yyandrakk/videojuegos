define(['Phaser','Game','estados/gameOver'], function (Phaser,Game) {
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
    /**
     *
     * @type {Phaser.State}
     */
    GameOver.prototype = Object.create(Phaser.State.prototype);
    GameOver.prototype.constructor = GameOver;
    /* download assets code here */
    GameOver.prototype.preload = function () {
		Game.load.image('fondoGameOver', "media/image/cientificoloco.jpg");
		Game.load.audio('evilLaugh', ['media/sound/Evil Laugh.mp3', 'media/sound/Evil Laugh.wav']);
		Game.load.audio('gameOverMusica', ['media/sound/Final Fantasy Game Over.mp3']);
    }
    /**
     * Se encarga de mostrar o ocultar el resto de botones cuando se da al de opciones
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
     * Pone o quita el sonido
     */
    function toggleSound() {

        Game.sound.mute = ! Game.sound.mute;
        this.soundBoton.frame = Game.sound.mute ? 0 : 1;

    }

    GameOver.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);
        Game.add.image(0, 0, 'fondoGameOver');
        var nameLabel = Game.add.text(Game.world.centerX, Game.world.centerY-100, 'GAME OVER',{font:'48px PressStart2P',fill:'#70120f'});
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
     * Carga el estado Mundo que es inicial del juego y lo inicia
     */
    function empezar() {
        this.music.stop();
        Game.state.start('Mundo');
    }


    return GameOver;


});