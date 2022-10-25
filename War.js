/**
 * 
 */
 import * as THREE from "three";

 class War
 {
    constructor(players)
    {
        // playerCards will hold up to 3 Card objects, one for each player. These are the cards
        // currently being compared.
        // Indices correspond to player number - 1.
        this.playerCards = new Array();
        // totalCards is an array of all the cards in the current war. If no war is happening, it
        // will only hold the cards in playerCards.
        this.totalCards = new Array();
        // players holds the array of Player objects.
        this.players = players;
    }


 }

 export {War};