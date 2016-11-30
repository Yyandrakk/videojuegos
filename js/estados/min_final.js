define(['Phaser','Game','sprites/player_min_final','sprites/enemy_min_final'], function (Phaser,Game,Player_min_final,Enemy_min_final) {

    function Min_final() {
        Phaser.State.call(this);
        this.shootTime =0;
        this.shootEnemyTime=0;
        this.dificult=500;
    }
//Inheritance
    Min_final.prototype = Object.create(Phaser.State.prototype);
    Min_final.prototype.constructor = Min_final;
    Min_final.prototype.preload = function () {

    }
    Min_final.prototype.create = function () {

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

       // this.arrows=[this.arrowPlayer,this.arrowEnemy];
        this.shootArrow= Game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        //Hace que el jugador se pinte arriba del suelo
        Game.world.swap(this.playerG,this.suelo);
       // Game.world.swap(this.enemyG,this.suelo);
        this.player =  this.playerG.getAt(0);
        this.player.health+=5;
        console.log(this.player.health);


    }
    Min_final.prototype.update = function () {

        Game.physics.arcade.collide(this.arrowPlayer,this.muro, this.col_muro, null,this);
        Game.physics.arcade.collide(this.arrowEnemy,this.muro, this.col_muro, null,this);
        Game.physics.arcade.overlap(this.arrowEnemy,this.player,this.player_damage,null,this);
        Game.physics.arcade.overlap(this.arrowPlayer,this.enemyG,this.enemy_kill,null,this);

        if(this.player.alive) {
            Game.physics.arcade.collide(this.player, this.muro);

            if (this.shootArrow.isDown && Game.time.now > this.shootTime) {
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
                    var index = Game.rnd.integerInRange(0, enemys.length - 1)
                    arrowE.reset(enemys[index].x, enemys[index].y);
                    Game.physics.arcade.moveToObject(arrowE,this.player,200);
                    this.shootEnemyTime = Game.time.now + this.dificult;
                }
            }

        }else{
            alert("Game over");
            Game.state.start('Mundo');
        }







    }
    Min_final.prototype.createWorld = function () {
        this.map=Game.add.tilemap('mapMF');
        this.map.addTilesetImage('tileMP1');
        this.map.addTilesetImage('tileMP2');
        this.map.addTilesetImage('tileMP3');
        this.suelo = this.map.createLayer('suelo');
        this.suelo.resizeWorld();
        this.muro = this.map.createLayer('muro');
        this.map.createFromObjects('object','player','player',1,true,false,this.playerG,Player_min_final);
        this.map.createFromObjects('object','enemy','mage',1,true,false,this.enemyG,Enemy_min_final);
        this.map.setCollisionBetween(1, 10000, true, this.muro);



    }

    Min_final.prototype.enemy_kill= function(a,e){
        a.kill();
        e.kill();
        this.dificult-=10;

        if(this.enemyG.countLiving()<=0){
            Game.state.start('Menu');
        }

    }

    Min_final.prototype.player_damage= function(p,a){
        a.kill();
        this.player.damage(1);


    }
    Min_final.prototype.col_muro= function(a,e){
        a.kill();
        //comprobar si gana
    }
    return Min_final;
});