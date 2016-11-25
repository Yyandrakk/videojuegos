/**
 * Created by oscar on 13/11/16.
 */
define(['Phaser'], function (Phaser) {
    var g= new Phaser.Game(640, 340, Phaser.AUTO, 'game');
    g.global = {
        control: {laberinto: {haGanado:false,primeraEntrada:false}


        }
    };
    return g;
});
