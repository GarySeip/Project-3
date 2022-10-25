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

    /**
     * This function takes an aray of cards to add the bottom of the deck.
     * 
     * @param {[Card, Card, ...]} newCards 
     */
    addToBottom(newCards)
    {
        for(var i = 0; i < newCards.length; i++)
            this.deck.push(newCards[i]);

        // To-do: Update following code so it is not instant.
        this.translateY(this.cards[0].depth * newCards.length);

        // To-do: Code to visually move the cards into this position;
    }

    /**
     * This functions allows for moving all cards in the deck along the y-axis.
     * 
     * @param {Number} dist The distance to move along the y-axis.
     */
    translateY(dist)
    {
        for(var i = 0; i < this.cards.length; i++)
            this.cards[i].mesh.translateY(dist);
    }
 }

 export {Deck};