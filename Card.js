/**
 * 
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class Card
 {
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