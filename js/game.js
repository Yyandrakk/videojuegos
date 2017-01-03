define(['Phaser'], function (Phaser) {
    var g= new Phaser.Game(640, 340, Phaser.AUTO, 'game',null,true);
    g.global = {
        control: {laberinto: {haGanado:false,primeraEntrada:false,vidas:3}, puzzle: {haGanado:false}

        }
    };
    return g;
});
