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
     * @param {*} t     The current timestamp
     * @param {*} speed The speed of the vehicle
     */
    update(t, speed) {
        var elapsed = t - this.lastTime;
        this.lastTime = t;

        this.angularSpeed = speed;

        this.angle += this.angularSpeed * elapsed/10; // elapsed divided by 10 to be more smooth
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


