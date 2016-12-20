define(['Phaser','Game','sprites/cuadrado','estados/mundo'], function(Phaser,Game,Cuadrado,Mundo){
     
    function Puzzle(){
        Phaser.State.call(this);
        this.listSprites = [];
    }
    
    //Inheritance
    Puzzle.prototype = Object.create(Phaser.State.prototype);
    Puzzle.prototype.constructor = Puzzle;
    
    Puzzle.prototype.preload = function(){
        this.cuadrado1 = new Cuadrado(Game,0,0,'cuadrado1');
        this.cuadrado2 = new Cuadrado(Game,30,30,'cuadrado2');
        this.cuadrado3 = new Cuadrado(Game,0,0,'cuadrado3');
        this.cuadrado4 = new Cuadrado(Game,0,0,'cuadrado4');
        //this.cuadrado5 = new Cuadrado(Game,0,0,'cuadrado5');
        this.cuadrado6 = new Cuadrado(Game,0,0,'cuadrado6');
        this.cuadrado7 = new Cuadrado(Game,0,0,'cuadrado7');
        this.cuadrado8 = new Cuadrado(Game,0,0,'cuadrado8');
        this.cuadrado9 = new Cuadrado(Game,0,0,'cuadrado9');
        
        this.listSprites.push(this.cuadrado1);
        this.listSprites.push(this.cuadrado2);
        this.listSprites.push(this.cuadrado3);
        this.listSprites.push(this.cuadrado4);
        //this.listSprites.push(this.cuadrado5);
        this.listSprites.push(this.cuadrado6);
        this.listSprites.push(this.cuadrado7);
        this.listSprites.push(this.cuadrado8);
        this.listSprites.push(this.cuadrado9);
        Game.physics.arcade.enable(this.cuadrado1);
        Game.physics.arcade.enable(this.cuadrado2);
        Game.physics.arcade.enable(this.cuadrado3);
        Game.physics.arcade.enable(this.cuadrado4);
        //Game.physics.arcade.enable(this.cuadrado5);
        Game.physics.arcade.enable(this.cuadrado6);
        Game.physics.arcade.enable(this.cuadrado7);
        Game.physics.arcade.enable(this.cuadrado8);
        Game.physics.arcade.enable(this.cuadrado9);
    }
    
    Puzzle.prototype.create = function(){
        this.cuadrado1.position.x = Game.width-Game.width+37.5;
        this.cuadrado1.position.y = Game.height-Game.height+35;
        this.cuadrado8.position.x = Game.width-Game.width+112.5;
        this.cuadrado8.position.y = Game.height-Game.height+35;
        this.cuadrado7.position.x = Game.width-Game.width+187.5;
        this.cuadrado7.position.y = Game.height-Game.height+35;
        this.cuadrado9.position.x = Game.width-Game.width+112.5;
        this.cuadrado9.position.y = Game.height-Game.height+105;
        this.cuadrado3.position.x = Game.width-Game.width+187.5;
        this.cuadrado3.position.y = Game.height-Game.height+105;
        this.cuadrado4.position.x = Game.width-Game.width+37.5;
        this.cuadrado4.position.y = Game.height-Game.height+175;
        this.cuadrado2.position.x = Game.width-Game.width+112.5;
        this.cuadrado2.position.y = Game.height-Game.height+175;
        this.cuadrado6.position.x = Game.width-Game.width+187.5;
        this.cuadrado6.position.y = Game.height-Game.height+175;
        //this.cuadrado5.position.x = Game.width-Game.width+37.5;
        //this.cuadrado5.position.y = Game.height-Game.height+105;
    }
    
    
    return Puzzle;
});