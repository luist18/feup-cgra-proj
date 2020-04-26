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
        // TODO
    }

    update(t) {
        // TODO
    }

    display() {
        this.scene.pushMatrix();
        // TODO movement

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


