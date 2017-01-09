define(['Phaser','Game','sprites/player_min_final','sprites/enemy_min_final','BarHealth','estados/victoria','estados/gameOver'], function (Phaser,Game,Player_min_final,Enemy_min_final,BarHealth,Victoria,GameOver) {
    /**
     *
     * @constructor
     */
    function Min_final() {
        Phaser.State.call(this);
        this.shootTime =0;
        this.shootEnemyTime=0;
        this.dificult=500;
        this.optionGrupo=null;
        this.soundBoton=null;
    }
//Inheritance
    /**
     *
     * @type {Phaser.State}
     */
    Min_final.prototype = Object.create(Phaser.State.prototype);
    Min_final.prototype.constructor = Min_final;

    Min_final.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);

        Game.touchControl = Game.plugins.add(Phaser.Plugin.TouchControl);
        Game.touchControl.inputEnable();
        Game.touchControl.settings.singleDirection=true;
        if(Game.device.desktop) {
            Game.touchControl.inputDisable();
        }

        this.playerG = Game.add.group();
        this.playerG.enableBody=true;
        this.playerG.visible=true;
        this.playerG.physicsBodyType=Phaser.Physics.ARCADE;
        this.enemyG = Game.add.group();
        this.enemyG.enableBody=true;
        this.enemyG.visible=true;
        this.enemyG.physicsBodyType=Phaser.Physics.ARCADE;
        this.createWorld();

        this.arrowPlayer = Game.add.group();
        this.arrowPlayer.enableBody=true;
        this.arrowPlayer.visible=true;
        this.arrowPlayer.createMultiple(30,'arrow');
        this.arrowPlayer.setAll('frame',8);
        this.arrowPlayer.setAll('anchor.y',0.5);
        this.arrowPlayer.setAll('anchor.x',1);

        this.arrowEnemy = Game.add.group();
        this.arrowEnemy.enableBody=true;
        this.arrowEnemy.visible=true;
        this.arrowEnemy.createMultiple(30,'arrow');
        this.arrowEnemy.setAll('frame',4);
        this.arrowEnemy.setAll('anchor.y',0.5);
        this.arrowEnemy.setAll('anchor.x',0);
        this.arrowEnemy.setAll('anchor.x',0);



        this.shootArrow= Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);

        this.player =  this.playerG.getAt(0);
        this.player.health+=5;
        this.player.maxHealth= this.player.health;


        this.sound_arrow = this.game.add.audio('shoot_arrow');
        this.music = this.game.add.audio('music_min_final');
        this.music.loop = true;
        this.music.play();

        this.dead=this.player.animations.getAnimation("dead");

        this.deadB=false;
        this.load_boton();

        this.barraVida=new HealthBar(Game,{x:150,y:15,height:20,width:200,bar:{color:'#13ad3e'},bg:{color:'#770f0f'}});



    }
    Min_final.prototype.update = function () {

        Game.physics.arcade.collide(this.arrowPlayer,this.muro, this.col_muro, null,this);
        Game.physics.arcade.collide(this.arrowEnemy,this.muro, this.col_muro, null,this);
        Game.physics.arcade.overlap(this.arrowEnemy,this.player,this.player_damage,null,this);
        Game.physics.arcade.overlap(this.arrowPlayer,this.enemyG,this.enemy_kill,null,this);

        if(this.deadB==true){
            this.music.stop();
            Game.state.add('GameOver', new GameOver());
            Game.state.start('GameOver');
        }
        if(this.player.alive) {
            Game.physics.arcade.collide(this.player, this.muro);

            if ((this.shootArrow.isDown || Game.touchControl.cursors.left || Game.touchControl.cursors.right) && Game.time.now > this.shootTime) {
                this.sound_arrow.play();
                var arrow = this.arrowPlayer.getFirstExists(false);
                if (arrow) {

                    arrow.reset(this.player.x, this.player.y);
                    arrow.body.velocity.x = 300;
                    this.shootTime = Game.time.now + 300;
                }
            }
            if (Game.time.now > this.shootEnemyTime) {
                var arrowE = this.arrowEnemy.getFirstExists(false);
                var enemys = this.enemyG.getAll('alive', true);
                //alert(enemys.length);
                if (enemys.length > 0 && arrowE) {
                    var index = Game.rnd.integerInRange(0, enemys.length - 1);
                    arrowE.reset(enemys[index].x, enemys[index].y);
                    Game.physics.arcade.moveToObject(arrowE,this.player,200);
                    this.shootEnemyTime = Game.time.now + this.dificult;
                }
            }

        }else{
            this.player.revive();
            this.dead.play(10);
            this.deadB=true;

        }


    }
    /**
     *
     */
    Min_final.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapMF');
        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP3');
        this.suelo = this.map.createLayer('suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('muro');
        this.map.createFromObjects('object','player','player',1,true,false,this.playerG,Player_min_final);
        this.map.createFromObjects('object','enemy','mage',13,true,false,this.enemyG,Enemy_min_final);
        this.map.setCollisionBetween(1, 10000, true, this.muro);



    }
    /**
     *
     * @param a
     * @param e
     */
    Min_final.prototype.enemy_kill= function(a,e){
        a.kill();
        e.kill();
        this.dificult-=10;

        if(this.enemyG.countLiving()<=0){
            this.music.stop();
            Game.state.add('Victoria', new Victoria());

            Game.state.start('Victoria');

        }

    }
    /**
     *
     * @param p
     * @param a
     */
    Min_final.prototype.player_damage= function(p,a){
        a.kill();
        //cambiar que no le quite la ultima vida
        this.player.damage(1);
        this.barraVida.setPercent((this.player.health/this.player.maxHealth)*100);


    }
    Min_final.prototype.col_muro= function(a,e){
        a.kill();

    }

    /**
     * Se encarga de generar los botones en su sitio
     */
    Min_final.prototype.load_boton=function () {

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
    return Min_final;
});