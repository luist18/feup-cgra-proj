/**
 * Shows the percentage of supplies delivered
 * @constructor
 */
class MyBillboard extends CGFobject {
	/**
	 * @method constructor
	 * @param {CGFscene} scene		- the scene 
	 * @param {integer} maxSupplies	- the max supplies
	 */
	constructor(scene, maxSupplies = 5) {
		super(scene);
		this.maxSupplies = maxSupplies;
		this.init();
	}

	/**
	 * @method init
	 * Initializes the objects, shaders and positions
	 */
	init() {
		this.cube = new MyUnitCube(this.scene);
		this.counter = new MyPlane(this.scene, 20);

		this.canvasTex = new CGFtexture(
			this.scene,
			"../resources/textures/billboard/canvas.png"
		);
		this.greyTex = new CGFtexture(
			this.scene,
			"../resources/textures/billboard/leg.png"
		);

		this.material = new CGFappearance(this.scene);
		this.material.setDiffuse(1, 1, 1, 1);
		this.material.setSpecular(1, 1, 1, 1);
		this.material.setAmbient(0.8, 0.8, 0.8, 1);

        // shaders
		this.shader = new CGFshader(
			this.scene.gl,
			"shaders/billboard.vert",
			"shaders/billboard.frag"
		);

        this.shader.setUniformsValues({ percentage: 0 });
        
        // fill settings
        this.percFilled = 0;
        this.lastTime = 0;

        // positions
        this.xPos = 14;
        this.zPos = -17;
		this.rotation = (2 * Math.PI) / 30;
		this.updateHeight();
	}

	/**
	 * @method updateHeight
	 * Updates the height of the billboard given the height of the terrain
	 */
	updateHeight() {
		this.yPos = this.scene.terrain.getHeight(this.xPos, this.zPos);
	}

	/**
	 * @method update
	 * Updates the percentage filler shader
	 * 
	 * @param {integer} t	- the current time
	 * @param {*} supplies	- the number of supplies delivered
	 */
	update(t, supplies) {
        var elapsed = t - this.lastTime;
        this.lastTime = t;

		// filled bar
        var percentage = supplies / this.maxSupplies;
        
        if (this.percFilled < percentage)
            this.percFilled += elapsed / 2000;

        if (this.percFilled > percentage && percentage != 1)
			this.percFilled -= elapsed / 2000;
			
        this.shader.setUniformsValues({ percentage: this.percFilled });
        this.shader.setUniformsValues({ random: (t / 1000 ) % (2 * Math.PI) });
    }

	/**
	 * @method display
	 * Displays the static part of billboard
	 */
	display() {
		this.scene.pushMatrix();

		// move to the right place
		this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.rotate(this.rotation, 0, 1, 0);

		// draw canvas
		this.material.setTexture(this.canvasTex);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0, 1.5, 0);
		this.scene.scale(2, 1, 0.1);
		this.cube.display();
		this.scene.popMatrix();

		// draw legs
		// left
		this.material.setTexture(this.greyTex);
		this.material.apply();
		this.scene.pushMatrix();
		this.scene.translate(0.9, 0.5, 0);
		this.scene.scale(0.05, 1, 0.05);
		this.cube.display();
		this.scene.popMatrix();

		// right
		this.scene.pushMatrix();
		this.scene.translate(-0.9, 0.5, 0);
		this.scene.scale(0.05, 1, 0.05);
		this.cube.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}

	/**
	 * @method displayWithShaders
	 * Displays the part of the billboard that requires shaders
	 */
	displayWithShaders() {
		this.scene.setActiveShader(this.shader);

		// place
		this.scene.pushMatrix();
		this.scene.translate(this.xPos, this.yPos, this.zPos);
		this.scene.rotate(this.rotation, 0, 1, 0);

		// draw counter
		this.scene.pushMatrix();
		this.scene.translate(0, 1.2, 0.06);
		this.scene.scale(1.5, 0.2, 1);
		this.counter.display();
		this.scene.popMatrix();

		this.scene.popMatrix();
	}
}
