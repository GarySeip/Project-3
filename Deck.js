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
 }

 export {Deck};