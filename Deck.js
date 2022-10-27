/**
 * Author: Garald Seip
 * This class implements functionality for manipulating a deck of cards. It is responsible for loading in the appropriate
 * textures for the face of each card.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";
 import { Card } from "./Card.js";

 class Deck
 {
    /**
     * The constructor takes in the dimensions of the cards and creates an array to hold the cards.
     * 
     * @param {Number} width The card width.
     * @param {Number} height The card height.
     * @param {Number} depth The card depth.
     */
    constructor(width, height, depth)
    {
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.cards = new Array();
    }

    /**
     * This function loads the textures for each card and creates them. Afterward, they are put into the cards array.
     */
    constructCards()
    {
        // The possible values as recorded in the file names.
        var values =
        [
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "Jack",
            "Queen",
            "King",
            "A"          
        ];

        // The card suits.
        var suits =
        [
            "Clovers",
            "Hearts",
            "Pikes",
            "Tiles"
        ];

        var loader = new THREE.TextureLoader();
        // The texture for the sides of the cards.
        var paperTexture = loader.load("./Textures/paper.jpg");
        // The texture for the back of the cards.
        var backTexture = loader.load("./Textures/back.png");
        // The textures for each card.
        var cardTextures = new Array(6);

        // Sets the sides of the card to the paper texture.
        cardTextures[0] = paperTexture;
        cardTextures[1] = paperTexture;
        cardTextures[2] = paperTexture;
        cardTextures[3] = paperTexture;
        // Sets the back of the card to the back texture.
        cardTextures[5] = backTexture;
        
        // Loads the appropriate face textures and creates the cards.
        for(var s = 0; s < suits.length; s++)
        {
            for(var v = 0; v < values.length; v++)
            {
                cardTextures[4] = loader.load("./Textures/" + suits[s] + "_" + values[v] + "_black.png");

                this.cards.push(new Card(v + 2, suits[s], cardTextures.slice(), this.width, this.height, this.depth));
            }
        }
    }

    /**
     * This is a testing function meant to be used with OrbitalControls to ensures that the textures for
     * all of the cards have been properly input and rendered.
     * 
     * @param {Scene} scene 
     */
    cardRenderTest(scene)
    {
        // depMov is the depth horizontal distance to move the cards before placement.
        const depMov = 1.0 * this.depth;
        
        var toMov = new THREE.Vector3(0, depMov, 0);

        var currLoc = new THREE.Vector3(0.0, 0.0, 0.0);

        for(var i = 0; i < this.cards.length; i++)
        {
            scene.add(this.cards[i].mesh);

            this.cards[i].mesh.position.set(currLoc.x, currLoc.y, currLoc.z);
            this.cards[i].mesh.rotation.x = Math.PI / 2;
            this.cards[i].mesh.rotation.z = Math.PI;

            currLoc.add(toMov);
        }
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
        this.translateY(this.depth * newCards.length);

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