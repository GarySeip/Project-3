/**
 * 
 */
 import * as THREE from "three";

 class Card
 {
    constructor(value, suit, textures)
    {
        this.value = value;
        this.suit = suit;
        constructBox(textures);
    }

    constructBox(textures)
    {
        // 655 and 930 are respectively the width and height of the card images.
        const width = 655 / 200;
        const height = 930 / 200;
        // This will make a full deck of cards look like a square when viewed along the length of the cards.
        const depth = width / 52;
        var currTexture = 0; 
        var materials = 
        [
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture]})
        ];

        var geometry = new THREE.BoxGeometry(width, height, depth);
    }
 }

 export {Card};