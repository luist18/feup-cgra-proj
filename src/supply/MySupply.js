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

    constructor(scene, positionX = 0, positionY = 0, positionZ = 0) {
        super(scene);
        // todo replace state with inactive
        this.state = SupplyStates.LANDED;

        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;

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
        if (this.state == SupplyStates.INACTIVE) return;

        if (this.state == SupplyStates.FALLING) {
            this.material.apply();
            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0, this.positionY + 0.5, this.positionZ + 0.5);
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0.5, + this.positionY + 0.5, this.positionZ + 0);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0, this.positionY + 0.5, this.positionZ + -0.5);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + -0.5, this.positionY + 0.5, this.positionZ + 0);
            this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0, this.positionY + 1, this.positionZ + 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0);
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX, this.positionY, this.positionZ);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.plane.display();
            this.scene.popMatrix();
        } else if (this.state == SupplyStates.LANDED) {
            this.material.apply();
            this.scene.pushMatrix();
            this.scene.translate(this.positionX, this.positionY + 0.03, this.positionZ + 0.5);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0.9, this.positionY + 0.02, this.positionZ + 0.5);
            this.scene.rotate(-Math.PI / 9, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX + 0.9, this.positionY + 0.03, this.positionZ - 0.5);
            this.scene.rotate(-Math.PI / 3, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX - 0.9, this.positionY + 0.03, this.positionZ - 0.5);
            this.scene.rotate(Math.PI / 9, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX - 0.9, this.positionY + 0.02, this.positionZ + 0.5);
            this.scene.rotate(Math.PI / 3, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(this.positionX - 0.8, this.positionY + 0.03, this.positionZ + 1.5);
            this.scene.rotate(Math.PI / 6, 0, 1, 0);
            this.scene.rotate(-Math.PI / 2, 1, 0, 0)
            this.plane.display();
            this.scene.popMatrix();
        }
    }
}
