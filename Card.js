/**
 * Author: Garald Seip
 * This class implements a single playing card, storing its value, suit, and mesh.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class Card
 {
    /**
     * The constructor takes in all of the details of the card and creates the card mesh.
     * 
     * @param {Number} value The value of the card from 2 - 13.
     * @param {String} suit The suit of the card.
     * @param {[Texture, Texture, Texture, Texture, Texture, Texture]} textures The textures of the card.
     * @param {Number} width The card width.
     * @param {Number} height The card height.
     * @param {Number} depth The card depth.
     */
    constructor(value, suit, textures, width, height, depth)
    {
        this.width = width;
        this.height = height;
        this.depth = depth;

        this.value = value;
        this.suit = suit;
        this.mesh;
        this.constructBox(textures);
    }

    /**
     * This function constructs the box geometry for the card.
     * 
     * @param {[Texture, Texture, Texture, Texture, Texture, Texture]} textures The textures of the card.
     */
    constructBox(textures)
    {
        var currTexture = 0; 
        var materials = 
        [
            new THREE.MeshPhongMaterial({map: textures[currTexture++]}),
            new THREE.MeshPhongMaterial({map: textures[currTexture++]}),
            new THREE.MeshPhongMaterial({map: textures[currTexture++]}),
            new THREE.MeshPhongMaterial({map: textures[currTexture++]}),
            new THREE.MeshPhongMaterial({map: textures[currTexture++]}),
            new THREE.MeshPhongMaterial({map: textures[currTexture]})
        ];

        var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);

        this.mesh = new THREE.Mesh(geometry, materials);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }
 }

 export {Card};