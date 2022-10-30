/**
 * Author: Garald Seip
 * This class implements the functionality of the War card game for three players.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";
 import { Deck } from "./Deck.js";
 import { AnimationHelper } from "./AnimationHelper.js";

 class War
 {
    /**
     * The constructor takes in the player objects and sets up variables for War.
     * 
     * @param {[Player, Player, Player]} players The array of players.
     */
    constructor(animationArray, players, deck, width, height, depth)
    {
        // playerCards will hold up to 3 Card objects, one for each player. These are the cards
        // currently being compared.
        // Indices correspond to player number - 1.
        this.playerCards = new Array();
        // warCards is an array of all the cards in the current war. If no war is happening, it
        // will only hold the cards in playerCards.
        this.warCards = new Array();
        // players holds the array of Player objects.
        this.players = players;
        //
        this.animationArray = animationArray;
        this.deck = deck;
        // stillIn holds which players remain in the game.
        this.stillIn = [true, true, true];
        // Boolean tracks if there is an active war.
        this.warActive = false;
        // 
        this.roundCount = 0;
        //
        this.deckShuff = false;
        //
        this.deckSplit = false;
        //
        this.width = width;
        //
        this.height = height;
        //
        this.depth = depth;
    }

    /**
     * This function handles progressing the game forward after each press of the "n" key.
     */
    advanceGameStep()
    {
        if(this.warActive)
            this.doWar();
        else if(!this.deckShuff)
        {
            this.deck.shuffle();
            this.deckShuff = true;
        }
        else if(!this.deckSplit)
        {
            var deckArray = this.deck.split(3);

            this.players[0].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            this.players[1].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            this.players[2].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            
            this.players[0].deck.cards = deckArray[0];
            this.players[1].deck.cards = deckArray[1];
            this.players[2].deck.cards = deckArray[2];

            for(var o = 0; o < this.players.length; o++)
            {
                var newPos = this.players[o].deckPos.clone().setY(0 - this.depth);

                for(var i = 0; i < this.players[o].deck.cards.length; i++)
                {
                    newPos.y += this.depth;
                    this.animationArray.push(new AnimationHelper(this.players[o].deck.cards[i].mesh, newPos.clone(), 
                                                                 this.players[o].deckRot, false, null, null));
                }
            }

            this.deckSplit = true;
            
        }
        else
        {
            this.roundCount = 0;
            // Gets the top card of each player's deck.
            // There needs to be different code for updating the cards during a war.
            for(var i = 0; i < this.players.length; i++)
            {
                if(this.players[i].deck.length != 0)
                {
                    this.playerCards[i] = this.players[i].deck.cards.pop();
                    this.warCards.push(this.playerCards[i]);
                }
                else if(this.stillIn[i])
                {
                    this.stillIn[i] = false;
                    this.playerCards[i].value = 0;
                }
                
            }

            // To-do: Code to move cards into place.
            
            var highestResult = this.findHighest();
            
            // If there is a war, sets warActive to true. Otherwise handles the appropriate player's victory.
            if(highestResult == -1)
                warActive = true;
            else
                this.handleVictory(highestResult);
                
        }

    }

    /**
     * This function handles finding the highest value card in play or if there is a tie for highest.
     * 
     * @returns -1 if there is a tie for the highest, 0 if player 1 has the highest, 1 if player 2 has the highest,
     *           2 if player 3 has the highest.
     */
    findHighest()
    {
        // The value of each player's current card.
        var val0 = this.playerCards[0].value;
        var val1 = this.playerCards[1].value;
        var val2 = this.playerCards[2].value;

        // Checks for ties.
        if
        (
            val0 == val1 && val0 >= val2 ||
            val0 == val2 && val0 >= val1 ||
            val1 == val2 && val1 >= val0
        )
            return -1;
        // Checks for player 1 having the highest valued card.
        else if(val0 > val1 && val0 > val2)
            return 0;
        // Checks for player 2 having the highest valued card.
        else if(val1 > val0 && val1 > val2)
            return 1;
        // Player 3 has the highest valued card.
        else
            return 2;
    }

    /**
     * This function handles a given player winning the current round or war.
     * 
     * @param {Number} playerId The id of the player who has won.
     */
    handleVictory(playerId)
    {
        // Give the appropriate player the new cards.
        this.players[playerId].deck.addToBottom(this.warCards);

        // Resets the warCards arrays.
        this.warCards = new Array();
    }

    /**
     * This function handles an occurence of War.
     */
    doWar()
    {
        this.roundCount++;
        // Gets the top card of each player's deck.
        // There needs to be different code for updating the cards during a war.
        for(var i = 0; i < this.players.length; i++)
        {
            // If there are cards remaining | Draw face-down Card
            if(this.players[i].deck.length != 0)
            {
                this.playerCards[i] = this.players[i].deck.cards.pop();
                this.warCards.push(this.playerCards[i]);
            }

            // If There are cards remaining | Draw face-up Card
            if(this.players[i].deck.length != 0)
            {
                this.playerCards[i] = this.players[i].deck.cards.pop();
                this.warCards.push(this.playerCards[i]);
            }

            else if(this.playersCards[i].value != 0) // Needs to check if player card is face-up
            {


            }
            
        }

        // To-do: Code to move cards into place.
        
        var highestResult = this.findHighest();
        this.warActive = false;
        
        // If there is a war, sets warActive to true. Otherwise handles the appropriate player's victory.
        if(highestResult == -1)
            warActive = true;
        else
            this.handleVictory(highestResult);
    }
 }

 export {War};