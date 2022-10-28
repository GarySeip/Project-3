/**
 * Author: Garald Seip
 * This class implements a helper for animating object movement.
 */
 import * as THREE from "http://cs.merrimack.edu/~stuetzlec/three.js-master/build/three.module.js";

 class AnimationHelper
 {
    /**
     * The constructor takes in the scene, the object, and whether to move the object in a linear path toward
     * its destination or use an animation function. 
     * 
     * @param {Scene} scene The scene.
     * @param {Object3D} object The object to animate.
     * @param {Vector3} endPos The desired end position of the object.
     * @param {Euler} endRot The desired end rotation of the object.
     * @param {Boolean} useAniFunc Whether or not to use a provided animation function.
     * @param {function} aniFunc An animation function to use instead of moving along a linear path. Must return "true" when 
     *                           completed.
     */
    constructor(scene, object, endPos, endRot, useAniFunc, aniFunc)
    {
        this.scene = scene;
        this.object = object;
        this.object.rotation.x = this.object.rotation.x % (Math.PI * 2);
        this.object.rotation.x = this.object.rotation.y % (Math.PI * 2);
        this.object.rotation.x = this.object.rotation.y % (Math.PI * 2);

        this.endPos = endPos;

        this.endRot = endRot;
        this.endRot.x = this.endRot.x % (Math.PI * 2);
        this.endRot.x = this.endRot.y % (Math.PI * 2);
        this.endRot.x = this.endRot.y % (Math.PI * 2);

        this.useAniFunc = useAniFunc;
        this.aniFunc() = aniFunc;

        // How fast objects move or rotate by default.
        this.speedFactor = 10;

        if(!useAniFunc)
        {
            this.moveVector = object.position.clone().sub(endPos);
            // This ensures that all movement take the same amount of time.
            this.moveSpeed = this.moveVector.length() / this.speedFactor;
            this.moveVector.normalize();

            // The rotation speeds along each axis.
            this.rotXSpeed;
            this.rotYSpeed;
            this.rotZSpeed;

            if((this.endRot.x - this.object.rotation.x) % (Math.PI * 2) <= Math.PI)
                this.rotXSpeed = (this.endRot.x - this.object.rotation.x) / this.speedFactor;
            else
                this.rotXSpeed = (this.object.rotation.x - this.endRot.x) / -this.speedFactor;

            if((this.endRot.y - this.object.rotation.y) % (Math.PI * 2) <= Math.PI)
                this.rotYSpeed = (this.endRot.y - this.object.rotation.y) / this.speedFactor;
            else
                this.rotYSpeed = (this.object.rotation.y - this.endRot.y) / -this.speedFactor;

            if((this.endRot.z - this.object.rotation.z) % (Math.PI * 2) <= Math.PI)
                this.rotZSpeed = (this.endRot.z - this.object.rotation.z) / this.speedFactor;
            else
                this.rotZSpeed = (this.object.rotation.z - this.endRot.z) / -this.speedFactor;

            this.moveDone = this.moveSpeed == 0;
            this.rotXDone = this.object.rotation.x == this.endRot.x;
            this.rotYDone = this.object.rotation.y == this.endRot.y;
            this.rotZDone = this.object.rotation.z == this.endRot.z;
        }
    }

    animate(delta)
    {
        if(this.useAniFunc)
            this.aniFunc();
        else
        {
            if(!moveDone)
            {
                var newPos = this.object.position.clone().add(this.moveVector.multiplyScalar(this.moveSpeed * delta));
                var currDist = object.position.clone().sub(endPos).length();
                var newDist = newPos.clone().sub(endPos).length();

                if(newDist >= currDist)
                {
                    this.object.position.set(this.endPos.x, this.endPos.y, this.endPos.z);
                    this.moveDone = true;
                }
            }

            if(!this.rotXDone)
            {
                var newRotX = this.object.rotation.x + this.rotXSpeed * delta;

                if(this.rotXSpeed > 0 && newRotX > this.endRot.x || this.rotXSpeed < 0 && newRotX < this.endRot.x)
                {
                    newRotX = this.endRot.x;
                    this.rotXDone = true;
                }

                this.object.rotation.x = newRotX;
            }

            if(!this.rotYDone)
            {
                var newRotY = this.object.rotation.y + this.rotYSpeed * delta;

                if(this.rotYSpeed > 0 && newRotY > this.endRot.y || this.rotYSpeed < 0 && newRotY < this.endRot.y)
                {
                    newRotY = this.endRot.y;
                    this.rotYDone = true;
                }

                this.object.rotation.x = newRotX;
            }

            if(!this.rotZDone)
            {
                var newRotZ = this.object.rotation.z + this.rotZSpeed * delta;

                if(this.rotZSpeed > 0 && newRotZ > this.endRot.z || this.rotZSpeed < 0 && newRotZ < this.endRot.z)
                {
                    newRotZ = this.endRot.z;
                    this.rotZDone = true;
                }

                this.object.rotation.z = newRotZ;
            }
        }
    }

 }

 export {AnimationHelper};