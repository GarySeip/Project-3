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
     * @param {[AnimationHelper, AnimationHelper, ...]} animationArray array of AnimationHelpers.
     * @param {[Player, Player, Player]} players The array of players.
     * @param {Deck} deck The initial deck to split between players.
     * @param {Number} width The width of a card.
     * @param {Number} height The height of a card.
     * @param {Number} depth The depth of a card.
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
        // animationArray holds the animation array.
        this.animationArray = animationArray;
        // deck holds the initial deck of cards.
        this.deck = deck;
        // stillIn holds which players remain in the game.
        this.stillIn = [true, true, true];
        // Boolean tracks if there is an active war.
        this.warActive = false;
        // How many rounds into a war it has been.
        this.roundCount = 0;
        // If the deck has been shuffled yet.
        this.deckShuff = false;
        // If each player has received their cards yet.
        this.deckSplit = false;
        // If the cards have been drawn this turn.
        this.cardsDrawn = false;
        // The width of a card.
        this.width = width;
        // The height of a card
        this.height = height;
        // The depth of a card.
        this.depth = depth;
    }

    /**
     * This function handles progressing the game forward after each press of the "n" key.
     */
    advanceGameStep(scene)
    {
        if(!this.deckShuff)
        {
            this.deck.shuffle();
            this.deckShuff = true;
        }
        else if(!this.deckSplit)
        {
            var deckArray = this.deck.split(scene, 3);

            // Creates the deck objects for the players.
            this.players[0].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            this.players[1].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            this.players[2].deck = new Deck(this.width, this.height, this.depth, this.animationArray); 
            // Sets the actual cards in each deck to what was split off.
            this.players[0].deck.cards = deckArray[0];
            this.players[1].deck.cards = deckArray[1];
            this.players[2].deck.cards = deckArray[2];

            // For loops give set each card to move to the proper location.
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
        else if(!this.cardsDrawn)
            this.drawCards();
        else
        {
            if(!this.warActive)
                this.roundCount = 0;

            this.warActive = false;
            this.cardsDrawn = false;
            
            var highestResult = this.findHighest();
            
            // If there is a war, sets warActive to true. Otherwise handles the appropriate player's victory.
            if(highestResult == -1)
            {
                this.warActive = true;
                this.roundCount++;
                this.advanceGameStep();
            }
            else
                this.handleVictory(highestResult);
        }

    }

    /**
     * This function handles drawing the cards for each turn.
     */
    drawCards()
    {
        // flipRot is the amount to rotate cards to flip them over.
        var flipRot = Math.PI;
        // rotEuler will store the Euler to flip cards over.
        var rotEuler;

        for(var i = 0; i < this.players.length; i++)
        {
            // If a war is active, draws a face down card and a face up card for each player.
            if(this.warActive)
            {
                // If there are cards remaining | Draw face-down Card
                if(this.players[i].deck.cards.length != 0)
                {
                    this.playerCards[i] = this.players[i].deck.cards.pop();
                    this.warCards.push(this.playerCards[i]);

                    this.animationArray.push(new AnimationHelper(this.playerCards[i].mesh, 
                                                                 this.players[i].calcCardPos(this.roundCount * 2 - 1), 
                                                                 this.players[i].cardDownRot, false, null, null));
                }

                // If There are cards remaining | Draw face-up Card
                if(this.players[i].deck.cards.length != 0)
                {
                    this.playerCards[i] = this.players[i].deck.cards.pop();
                    this.warCards.push(this.playerCards[i]);

                    this.animationArray.push(new AnimationHelper(this.playerCards[i].mesh,
                                                                 this.players[i].calcCardPos(this.roundCount * 2),
                                                                 this.players[i].cardUpRot, false, null, null));
                }
                // Needs to check if player card is face-up
                else if(this.playerCards[i].value != 0 && !this.playerCards[i].mesh.rotation.equals(this.players[i].cardUpRot))
                {
                    this.animationArray.push(new AnimationHelper(this.playerCards[i].mesh, null, 
                                                                 this.players[i].cardUpRot, false, null, null));
                }
            }
            // If a war is not active, draws a face up card for each player.
            else
            {
                if(this.players[i].deck.cards.length != 0)
                {
                    this.playerCards[i] = this.players[i].deck.cards.pop();
                    this.warCards.push(this.playerCards[i]);
                    
                    this.animationArray.push(new AnimationHelper(this.playerCards[i].mesh, this.players[i].cardPos, 
                                                                 this.players[i].cardUpRot, false, null, null));
                }
                else if(this.stillIn[i])
                {
                    this.stillIn[i] = false;
                    this.playerCards[i].value = 0;
                }
                
            }
        }

        this.cardsDrawn = true;
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
 }

 export {War};