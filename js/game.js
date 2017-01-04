define(['Phaser'], function (Phaser) {
    var g= new Phaser.Game(640, 352, Phaser.AUTO, 'game',null,true);
    g.global = {
        control: {laberinto: {haGanado:false,primeraEntrada:false,vidas:3},
                  puzzle: {haGanado:false,primeraEntrada:false},
                  rushhour: {haGanado:false,primeraEntrada:false}
        },
        rush: {tablero:[
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ],
         tamanoSprite:32

        }
    };

    return g;
});
