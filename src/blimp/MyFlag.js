/**
* @class Represents the flag of {@link MyVehicle}.
*/
class MyFlag extends CGFobject {
    /**
     * Instantiates a new flag instance.
     * @param {CGFscene} scene  - the scene
     * @param {integer} divs    - the number of divisions of the plane 
     */
    constructor(scene, divs = 100) {
        super(scene);
        this.divs = divs;

        this.material = new CGFappearance(this.scene);
        this.initTextures();
        this.initMaterial();

        this.plane = new MyPlane(scene, this.divs);

        this.initShader();

        this.initMovement();

        this.timeFactor = 0;
    }

    /**
     * Initializes the required textures.
     */
    initTextures() {
        var path = this.scene.skins[this.scene.selectedSkin];

        this.flagTex = new CGFtexture(this.scene, path.concat("blimp/flag.png"));
        this.flagInvTex = new CGFtexture(this.scene, path.concat("blimp/flag_inv.png"));
        this.material.setTexture(this.flagTex);
        this.flagTex.bind(0);
    }

    /**
     * Initializes the material.
     */
    initMaterial() {
        this.material.setTextureWrap('REPEAT', 'REPEAT');
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
    }

    /**
     * Initializes the shader.
     */
    initShader() {
        this.shader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");

        this.shader.setUniformsValues({ texture: 0 });
        this.shader.setUniformsValues({ timeFactor: 0 });
    }

    /**
     * Initializes the movement of the wings, defining constants and relevant variables.
     */
    initMovement() {
        this.anglePerSecond = Math.PI / 8; // in rads
        this.angle = 0;
        this.turningValue = 0;
    }

    /**
     * Updates the flag in terms of movement and shaders.
     * @param {integer} t               - the current time 
     * @param {number} turningValue     - turning multiplier
     * @param {number} speed            - the speed of the flag
     * @param {number} angle            - the angle of rotation of the flag
     * @param {number} speedMultiplier  - speed multiplier
     */
    update(t, turningValue, speed, angle, speedMultiplier) {
        this.timeFactor += (t % (2 * Math.PI));
        this.shader.setUniformsValues({
            timeFactor: this.timeFactor * 5,
            speed: speed,
            angle: angle * 10,
            speedMultiplier: speedMultiplier
        });

        if (Math.abs(speed) < 0.25) return;

        this.turningValue = turningValue;

        var maxAngle = -turningValue * Math.PI / 2;
        if (Math.abs(maxAngle - this.angle) < Math.PI / 180)
            return

        var angleAddition = (maxAngle > this.angle) ? (this.anglePerSecond) : (-this.anglePerSecond);
        this.angle += t * angleAddition;
    }

	/**
	 * Displays the flag.
	 */
    displayWithShaders() {
        this.scene.setActiveShader(this.shader);

        this.scene.pushMatrix();

        this.scene.scale(1.5, 0.75, 1);
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.translate(0.5, 0, 0);

        this.material.setTexture(this.flagInvTex);
        this.material.apply();
        this.scene.gl.frontFace(this.scene.gl.CW);
        this.plane.display();

        this.material.setTexture(this.flagTex);
        this.material.apply();
        this.scene.gl.frontFace(this.scene.gl.CCW);
        this.plane.display();

        this.scene.popMatrix();
    }
}