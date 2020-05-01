const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {

    constructor(scene) {
        super(scene);
        this.state = SupplyStates.FALLING;

        this.faceTexture = new CGFtexture(this.scene, "../resources/box.png");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
        this.material.setTexture(this.faceTexture);

        this.plane = new MyPlane(this.scene, 8);
    }

    drop(dropPosition) {

    }

    land() {

    }

    update(t) {

    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(0, 0.5, 0);

        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
 // TODO