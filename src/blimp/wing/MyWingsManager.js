/**
 * Manages the blimp's wings
 * @constructor
 */
class MyWingsManager extends CGFobject {
    /**
     * @param constructor
     * @param {CGFscene} scene 
     * @param {CGFappearance} material  - the material to apply to the wings 
     */
    constructor(scene, material) {
        super(scene);
        this.material = material;

        this.init();
    }

    /**
     * @method init
     * Initializes the required textures, objects, and important variables
     */
    init() {
        this.wing = new MyWing(this.scene);
        this.initTextures();
        this.initMovement();
    }

    /**
     * @method initTextures
     * Initializes the required textures
     */
    initTextures() {
        var path = this.scene.skins[this.scene.selectedSkin];

        // textures
        this.top = new CGFtexture(this.scene, path.concat("blimp/top_wing.png"));
        this.right = new CGFtexture(this.scene, path.concat("blimp/right_wing.png"));
        this.bottom = new CGFtexture(this.scene, path.concat("blimp/bottom_wing.png"));
        this.left = new CGFtexture(this.scene, path.concat("blimp/left_wing.png"));
    }

    /**
     * @method initMovement
     * Initializes the movement of the wings, defining constants and relevant variables
     */
    initMovement() {
        // constants
        this.anglePerSecond = Math.PI/4; // in rads

        // movement variables
        this.angle = 0;
        this.turningValue = 0;
    }

    /**
     * @method reset
     * Resets the movement variables
     */
    reset() {
        this.angle = 0;
        this.turningValue = 0;
    }

    /**
     * @method update
     * Updates the movement variables according to the elapsed time
     * 
     * @param {integer} elapsed         - the elapsed time since the last update 
     * @param {integer} turningValue    - the turning multiplier
     */
    update(elapsed, turningValue) {
        this.turningValue = turningValue;

        var maxAngle = -turningValue * Math.PI/2;
        if (Math.abs(maxAngle - this.angle) < Math.PI/180) // no need to turn
            return

        var angleAddition = (maxAngle > this.angle) ? (this.anglePerSecond) : (-this.anglePerSecond); // smooth turning
        this.angle += elapsed * angleAddition;
    }

    /**
     * @method display
     * Displays all the wings
     */
    display() {
        // top
        this.material.setTexture(this.top);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -0.8);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // down
        this.material.setTexture(this.bottom);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -0.8);
        this.scene.rotate(this.angle, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // left
        this.material.setTexture(this.left);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();
             
        // right
        this.material.setTexture(this.right);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix(); 
    }
}