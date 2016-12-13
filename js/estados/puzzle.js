define(['Phaser','Game','sprites/cuadrado','estados/mundo'], function(Phaser,Game,Cuadrado,Mundo){
     
    function Puzzle(){
        Phaser.State.call(this);
        this.listSprites = [];
    }
    
    Puzzle.prototype = Object.create(Phaser.State.prototype);
    Puzzle.prototype.constructor = Puzzle;
    
    Laberinto.prototype.preload = function(){
        this.cuadrado1 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado1.png');
        this.cuadrado2 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado2.png');
        this.cuadrado3 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado3.png');
        this.cuadrado4 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado4.png');
        this.cuadrado5 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado5.png');
        this.cuadrado6 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado6.png');
        this.cuadrado7 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado7.png');
        this.cuadrado8 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado8.png');
        this.cuadrado9 = new Cuadrado(Game,0,0,'media/sprite/Cuadrado9.png');
    }

}