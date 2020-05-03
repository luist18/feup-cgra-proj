/**
 * Turbine faced up with the middle between the arms
 * --^--
 *  / \
 */
class MyTurbine extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);

        this.init(slices, stacks);
        this.initMovement();
    }

    init(slices, stacks) {
        this.holder = new MySphere(this.scene, slices, stacks);
        this.arm = new MySphere(this.scene, slices, stacks);
    }

    // Movement method
    initMovement() {
        this.angularSpeed = 0;
        this.angle = 0;

        this.lastTime = 0;
    }

    /**
     * Updates the movement of the turbine.
     * @param {*} elapsed   The elapsed time
     * @param {*} speed     The speed of the vehicle
     */
    update(elapsed, speed) {
        this.angularSpeed = speed;

        this.angle += this.angularSpeed * elapsed * 4 + 0.05;
        this.angle %= Math.PI; // the angle doesn't get to high
    }

    reset() {
        this.angularSpeed = 0;
        this.angle = 0;
    }

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


