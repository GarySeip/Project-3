/**
 * Author: Garald Seip
 * This class allows for the data of a player to be stored.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class Player
 {
    /**
     * The constructor creates a deck object to store a player's cards and stores their index in the player array.
     * 
     * @param {Number} idNum The player's index in the player array. 0 - 2.
     */
    constructor(idNum)
    {
        this.playerId = idNum;
        this.deckPos;
        this.deckRot;
        this.cardPos;
        this.cardRot;
        this.deck;

        this.calcPosAndRot();
    }

    calcPosAndRot()
    {
        var 
    }
 }

 export {Player};