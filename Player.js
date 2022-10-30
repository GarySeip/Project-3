/**
 * Author: Garald Seip
 * This class allows for the data of a player to be stored.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class Player
 {
    /**
     * The constructor creates a deck object to store a player's cards and stores their index in the player array.
     * It also calculates the position for each player's deck and active cards during a war.
     * 
     * @param {Number} idNum The player's index in the player array. 0 - 2.
     */
    constructor(idNum)
    {
        this.playerId = idNum;
        // deckPos stores the position of the player's deck.
        this.deckPos;
        // dekcRot stores the rotation of the player's deck.
        this.deckRot;
        // cardPos stores the location of the player's FIRST card during a war.
        // The location of additional cards must be calculated with calcCardPos.
        this.cardPos;
        // cardUpRot stores rotation of the player's cards face up during a war.
        this.cardUpRot;
        // cardDownRot stores the rotation of the player's cards face down during a war.
        this.cardDownRot;
        // deck stores the deck of Card objects.
        this.deck;

        var posCalc = new THREE.Vector3(0, 0, 12);
        // axis stores the a normalize y-axis.
        var axis = new THREE.Vector3(0, 1, 0);
        var rotCalc = Math.PI / 3;
        var initXRot = Math.PI / 2;
        var initZRot = Math.PI;
        // A temporary object to apply rotations to.
        var tempObj = new THREE.Mesh(new THREE.BufferGeometry(), THREE.MeshBasicMaterial);
        // The rotation so that the cards are face down.
        tempObj.rotation.set(initXRot, 0, initZRot);

        // Determines the proper rotation for the deck for this player.
        this.deckRot = rotCalc * this.playerId * 2;
        // Determines the deck position for this player.
        this.deckPos = posCalc.clone().applyAxisAngle(axis, this.deckRot);
        // Determines the actual Euler rotation for this player's deck.
        tempObj.rotateOnWorldAxis(axis, this.deckRot);
        this.deckRot = tempObj.rotation.clone();
        // Resets the rotation.
        tempObj.rotation.set(initXRot, 0, initZRot);

        // Determines the proper rotation for the active cards for this player.
        this.cardDownRot = rotCalc * (this.playerId * 2 + 1);
        // Determines the active card position for this player.
        this.cardPos = posCalc.applyAxisAngle(axis, this.cardDownRot);
        // Determines the actual Euler rotation for this player's face down, cards.
        tempObj.rotateOnWorldAxis(axis, this.cardDownRot);
        this.cardDownRot = tempObj.rotation.clone();
        // Determines the actual Euler rotation for this player's face up cards.
        tempObj.rotateOnWorldAxis(this.cardPos.clone().normalize(), Math.PI);
        this.cardUpRot = tempObj.rotation.clone();
    }

    /**
     * This function calculates the position where additional cards drawn during a War should be placed.
     * 
     * @param {Number} cardNum Represents which step of the War this card was drawn for. If it is the first facedown
     *                         card drawn for the War, cardNum should be 1. If it is the first faceup card drawn
     *                         for the War cardNum should be 2. If it is the second facedown card drawn for the
     *                         cardNum should be 3. So on and so forth.
     * @returns A Vector3 containing the new position of the card is returned.
     */
    calcCardPos(cardNum)
    {
        var newPos = this.cardPos.clone().normalize();

        newPos.multiplyScalar(this.cardPos.length() + (this.deck.height / 2) * cardNum);
        newPos.y += this.deck.depth;

        return newPos;
    }
 }

 export {Player};