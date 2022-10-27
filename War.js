/**
 * Author: Garald Seip
 * This class implements the functionality of the War card game for three players.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class War
 {
    /**
     * The constructor takes in the player objects and sets up variables for War.
     * 
     * @param {[Player, Player, Player]} players The array of players.
     */
    constructor(players)
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
        // Boolean tracks if there is an active war.
        this.warActive = false;
    }

    /**
     * This function handles progressing the game forward after each press of the "n" key.
     */
    advanceGameStep()
    {
        if(this.warActive)
            this.doWar();

        // Gets the top car of each player's deck.
        // There needs to be different code for updating the cards during a war.
        // There needs to be code for handling when a player does not have any cards. When a player is out of cards, their
        //      card's value should permanently be set to 0.
        for(var i = 0; i < this.players.length; i++)
            this.playerCards[i] = this.players[i].deck.pop();

        // Puts the current cards of each player into the warCards array.
        this.warCards = this.playerCards.slice();

        // To-do: Code to move cards into place.
         
        var highestResult = this.findHighest();
        
        // If there is a war, sets warActive to true. Otherwise handles the appropriate player's victory.
        if(highestResult == -1)
            warActive = true;
        else
            this.handleVictory(highestResult);
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
        // Checks for player 3 having the highest valued card.
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

        // Resets the player and war cards arrays.
        this.playerCards = new Array();
        this.warCards = new Array();
    }

    /**
     * This function handles an occurence of War.
     */
    doWar()
    {

    }
 }

 export {War};