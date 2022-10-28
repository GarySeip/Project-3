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
        // Ensures the rotations are less than tau.
        this.object.rotation.x = this.object.rotation.x % (Math.PI * 2);
        this.object.rotation.y = this.object.rotation.y % (Math.PI * 2);
        this.object.rotation.z = this.object.rotation.z % (Math.PI * 2);

        this.endPos = endPos;

        this.endRot = endRot;
        // Ensures the desired end rotation is less than tau.
        this.endRot.x = this.endRot.x % (Math.PI * 2);
        this.endRot.y = this.endRot.y % (Math.PI * 2);
        this.endRot.z = this.endRot.z % (Math.PI * 2);

        // Records if this isntance is to use an animation function.
        this.useAniFunc = useAniFunc;
        this.aniFunc() = aniFunc;

        // How fast objects move or rotate by default.
        this.speedFactor = 10;

        // If an animation function is not to be used, sets up variables for use in linear movement.
        if(!useAniFunc)
        {
            this.moveVector = endPos.clone().sub(object.position);
            // This ensures that all movement take the same amount of time.
            this.moveSpeed = this.moveVector.length() / this.speedFactor;
            this.moveVector.normalize();

            // The rotation speeds along each axis.
            this.rotXSpeed;
            this.rotYSpeed;
            this.rotZSpeed;
            
            // If the object is not already in the appropriate location and orientation, these variables
            // record if the movement and rotation are done.
            this.moveDone = this.moveSpeed == 0;
            this.rotXDone = this.object.rotation.x == this.endRot.x;
            this.rotYDone = this.object.rotation.y == this.endRot.y;
            this.rotZDone = this.object.rotation.z == this.endRot.z;

            // Gets the appropriate rotation speed in the appropriate direction for the x axis.
            if(!this.rotXDone)
            {
                if((this.endRot.x - this.object.rotation.x) % (Math.PI * 2) <= Math.PI)
                    this.rotXSpeed = (this.endRot.x - this.object.rotation.x) / this.speedFactor;
                else
                    this.rotXSpeed = (this.object.rotation.x - this.endRot.x) / -this.speedFactor;
            }

            // Gets the appropriate rotation speed in the appropriate direction for the y axis.
            if(!this.rotYDone)
            {
                if((this.endRot.y - this.object.rotation.y) % (Math.PI * 2) <= Math.PI)
                    this.rotYSpeed = (this.endRot.y - this.object.rotation.y) / this.speedFactor;
                else
                    this.rotYSpeed = (this.object.rotation.y - this.endRot.y) / -this.speedFactor;
            }

            // Gets the appropriate rotation speed in the appropriate direction for the z axis.
            if(!this.rotZDone)
            {
                if((this.endRot.z - this.object.rotation.z) % (Math.PI * 2) <= Math.PI)
                    this.rotZSpeed = (this.endRot.z - this.object.rotation.z) / this.speedFactor;
                else
                    this.rotZSpeed = (this.object.rotation.z - this.endRot.z) / -this.speedFactor;
            }
        }
    }

    /**
     * 
     * 
     * @param {*} delta 
     * @returns 
     */
    animate(delta)
    {
        if(this.useAniFunc)
            return this.aniFunc();
        else
        {
            // If the movement is not finished, moves the object in the appropriate direction.
            if(!moveDone)
            {
                var newPos = this.object.position.clone().add(this.moveVector.multiplyScalar(this.moveSpeed * delta));
                var currDist = this.endPos.clone().sub(object.position).length();
                var newDist = this.newPos.clone().sub(object.position).length();

                // If the object will have moved past the end position, then it is set to the end position.
                if(newDist >= currDist)
                {
                    this.object.position.set(this.endPos.x, this.endPos.y, this.endPos.z);
                    this.moveDone = true;
                }
                // Updates the object's position.
                else
                    this.object.position.set(newPos.x, newPos.y, newPos.z);
            }

            // If the x-axis rotation is not completed, rotates the object about the x-axis.
            if(!this.rotXDone)
            {
                var newRotX = this.object.rotation.x + this.rotXSpeed * delta;

                // If the rotation would rotate the object past the desired x-axis orientation, the object is set
                // to the desired end rotation.
                if(this.rotXSpeed > 0 && newRotX > this.endRot.x || this.rotXSpeed < 0 && newRotX < this.endRot.x)
                {
                    newRotX = this.endRot.x;
                    this.rotXDone = true;
                }

                this.object.rotation.x = newRotX;
            }

            // If the x-axis rotation is not completed, rotates the object about the y-axis.
            if(!this.rotYDone)
            {
                var newRotY = this.object.rotation.y + this.rotYSpeed * delta;

                // If the rotation would rotate the object past the desired y-axis orientation, the object is set
                // to the desired end rotation.
                if(this.rotYSpeed > 0 && newRotY > this.endRot.y || this.rotYSpeed < 0 && newRotY < this.endRot.y)
                {
                    newRotY = this.endRot.y;
                    this.rotYDone = true;
                }

                this.object.rotation.y = newRotY;
            }

            // If the x-axis rotation is not completed, rotates the object about the z-axis.
            if(!this.rotZDone)
            {
                var newRotZ = this.object.rotation.z + this.rotZSpeed * delta;

                // If the rotation would rotate the object past the desired z-axis orientation, the object is set
                // to the desired end rotation.
                if(this.rotZSpeed > 0 && newRotZ > this.endRot.z || this.rotZSpeed < 0 && newRotZ < this.endRot.z)
                {
                    newRotZ = this.endRot.z;
                    this.rotZDone = true;
                }

                this.object.rotation.z = newRotZ;
            }

            // Returns true if all movement and rotation has completed.
            return this.moveDone && this.rotXDone && this.rotYDone && this.rotZDone;
        }
    }

 }

 export {AnimationHelper};