/**
 * @class Represents a faced up turbine of {@link MyVehicle}.
 */
class MyTurbine extends CGFobject {
    /**
     * Instantiates a new turbine instance.
     * @param {CGFscene} scene  - the scene 
     * @param {integer} slices  - the number slices of the curved objects 
     * @param {integer} stacks  - the number of stacks of the curved objects
     */
    constructor(scene, slices, stacks) {
        super(scene);

        this.initObjects(slices, stacks);
        this.initMovement();
    }

    /**
     * Initializes the objects of the turbine.
     * @param {integer} slices  - the number slices of the curved objects 
     * @param {integer} stacks  - the number of stacks of the curved objects
     */
    initObjects(slices, stacks) {
        this.holder = new MySphere(this.scene, slices, stacks);
        this.arm = new MySphere(this.scene, slices, stacks);
    }

    /**
     * Initializes the movement of the turbine.
     */
    initMovement() {
        this.angularSpeed = 0;
        this.angle = 0;

        this.lastTime = 0;
    }

    /**
     * Updates the movement of the turbine.
     * @param {integer} elapsed - the elapsed time since the last update
     * @param {integer} speed   - the speed of the vehicle
     */
    update(elapsed, speed) {
        this.angularSpeed = speed;

        this.angle += this.angularSpeed * elapsed * 4 + 0.05;
        this.angle %= Math.PI; // the angle doesn't get to high
    }

    /**
     * Resets the position of the turbines.
     */
    reset() {
        this.angularSpeed = 0;
        this.angle = 0;
    }

    /**
     * Displays the turbine.
     */
    display() {
        this.scene.pushMatrix();
        
        this.scene.rotate(-this.angle, 0, 1, 0); // negative to rotate clockwise

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(1, 1.2, 1);
        this.holder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(1.1, 0, 0);
        this.scene.scale(2, 0.3, 1);
        this.arm.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.1, 0, 0);
        this.scene.scale(2, 0.3, 1);
        this.arm.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}


