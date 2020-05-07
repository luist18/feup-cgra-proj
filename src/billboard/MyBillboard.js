class MyBillboard extends CGFobject {
	constructor(scene) {
        super(scene);
        this.init();
	}

	init() {
        this.canvas = new MyUnitCube(this.scene);
        this.leg = new MyUnitCube(this.scene);
        this.counter = new MyPlane(this.scene, 10);

        this.whiteTex = new CGFtexture(this.scene, "../resources/billboard/white.png");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
    }

	display() {
        this.scene.pushMatrix();

        // draw canvas
        this.material.setTexture(this.whiteTex);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 1.5, 0);
        this.scene.scale(2, 1, 0.1);
        this.canvas.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
