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

    construcBox(textures)
    {
        var currTexture = 0; 
        var materials = 
        [
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]}),
            new THREE.MeshBasicMaterial({map: textures[currTexture++]})
        ];

        var geometry = new THREE.BoxGeometry()
    }
 }

 export {Card};