/**
 * 
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class Card
 {
    constructor(value, suit, textures)
    {
        // 655 and 930 are respectively the width and height of the card images.
        this.width = 655 / 200;
        this.height = 930 / 200;
        // This will make a full deck of cards look like a square when viewed along the length of the cards.
        this.depth = this.width / 52;

        this.value = value;
        this.suit = suit;
        this.mesh;
        this.constructBox(textures);
    }

    constructBox(textures)
    {
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

        var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

        this.mesh = new THREE.Mesh(geometry, materials);

    }
 }

 export {Card};