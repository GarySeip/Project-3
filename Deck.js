/**
 * 
 */
 import * as THREE from "three";

 class Deck
 {
    constructor()
    {
        this.cards = new Array();
        this.score;
    }

    /**
     * This function shuffles the order of the cards in the array.
     * Uses code taken and modified from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array.
     */
    shuffle() 
    {
        let currentIndex = this.cards.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) 
        {    
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    }

    /**
     * This function plays an animation to visually indicate the shuffling of the cards.
     * 
     * @param {Number} delta The difference in time between the current frame and the previosu frame.
     */
    shuffleAnimation(delta)
    {
        // Not yet implemented.
    }
 }

 export {Deck};