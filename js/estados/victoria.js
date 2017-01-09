define(['Phaser','Game'], function (Phaser,Game)  {
    /**
     * Estado final que muestra los creditos cuando se han completado todos los minijuegos
     * @constructor
     */
    function Victoria() {
        Phaser.State.call(this);
        this.shoot=0;
        this.music;
    }

    Victoria.prototype = Object.create(Phaser.State.prototype);
    Victoria.prototype.constructor = Victoria;

    Victoria.prototype.preload = function () {
        Game.load.image('victoria', "media/image/victoria.png");
        Game.load.spritesheet('fireworks', 'media/sprite/Fireworks.png',80,80);
        Game.load.audio('victM', 'media/sound/bensound-happyrock.mp3');
    }

    Victoria.prototype.create = function () {
        Game.world.setBounds(0,0,640,352);
        Game.add.image(0, 0, 'victoria');
        this.fuegosA = Game.add.group();
        this.fuegosA.enableBody=true;
        this.fuegosA.visible=true;
        this.fuegosA.createMultiple(30,'fireworks');

        this.fuegosA.forEach(function (f) {
            var num=Game.rnd.integerInRange(0, 12);
            if(num<4){
                f.frame=0;
                f.animations.add('fire',[0,3,6,9,12],1,false,true);
            }else if(num>=4 && num<8){
                f.frame=1;
                f.animations.add('fire',[1,4,7,10,13],1,false,true);
            }else{
                f.frame=2;
                f.animations.add('fire',[2,5,8,11,14],1,false,true);
            }

        },this);
        this.music = this.game.add.audio('victM');
        this.music.loop = true;
        this.music.play();
        this.espacio = Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        Game.add.text(20, Game.world.centerY+45, 'La princesa esta\nen otro castillo,\npresiona espacio.',{font:'16px PressStart2P',fill: '#1c0f57'});
        Game.add.text(Game.world.centerX+100, Game.world.centerY+100, 'Creditos:\nJavier Juarez\nOscar Garcia de Lara',{font:'16px PermanentMarker',fill: '#701e84'});

    }

    Victoria.prototype.update = function () {

        if(this.espacio.isDown){
            this.music.stop();
            Game.state.start('Menu');
        }


        if (Game.time.now > this.shoot) {
            var fireW = this.fuegosA.getFirstExists(false);

            if (fireW) {

                fireW.reset(Game.rnd.integerInRange(0,Game.world.width-64),Game.world.height);
                fireW.body.velocity.y = -75;
                fireW.animations.play('fire',null,false,true);
                this.shoot= Game.time.now +600;
            }
        }

    }



    return Victoria;
});
