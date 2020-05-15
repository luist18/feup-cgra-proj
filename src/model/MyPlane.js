/**
 * @class Represents a plane.
 */
class MyPlane extends CGFobject {
	/**
	 * Instantiates a new plane instance.
	 * @param {CGFscene} scene 	- the scene in which the plane is going to be shown
	 * @param {integer} nrDivs  - the number of divisions of the plane
	 * @param {number} minS 	- the min s value of the texture (UV-mapping)
	 * @param {number} maxS		- the max s value of the texture (UV-mapping)
	 * @param {number} minT 	- the min t value of the texture (UV-mapping)
	 * @param {number} maxT 	- the max s value of the texture (UV-mapping)
	 */
	constructor(scene, nrDivs, minS, maxS, minT, maxT) {
		super(scene);
		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;
		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.minS = minS || 0;
		this.maxS = maxS || 1;
		this.minT = minT || 0;
		this.maxT = maxT || 1;
		this.q = (this.maxS - this.minS) / this.nrDivs;
		this.w = (this.maxT - this.minT) / this.nrDivs;
		this.initBuffers();
	}

	/**
	 * Initializes the plane buffers.
	 */
	initBuffers() {
		// Generate vertices, normals, and texCoords
		this.vertices = [];
		this.normals = [];
		this.texCoords = [];
		var yCoord = 0.5;
		for (var j = 0; j <= this.nrDivs; j++) {
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) {
				this.vertices.push(xCoord, yCoord, 0);
				this.normals.push(0, 0, 1);

				this.texCoords.push(this.minS + i * this.q, this.minT + j * this.w);
				xCoord += this.patchLength;
			}
			yCoord -= this.patchLength;
		}
		// Generating indices
		this.indices = [];

		var ind = 0;
		for (var j = 0; j < this.nrDivs; j++) {
			for (var i = 0; i <= this.nrDivs; i++) {
				this.indices.push(ind);
				this.indices.push(ind + this.nrDivs + 1);
				ind++;
			}
			if (j + 1 < this.nrDivs) {
				this.indices.push(ind + this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	}

	/**
	 * Sets the WebGL primitive type fill mode to TRIANGLE_STRIP.
	 */
	setFillMode() {
		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
	}

	/**
 	* Sets the WebGL primitive type line mode to LINES.
 	*/
	setLineMode() {
		this.primitiveType = this.scene.gl.LINES;
	};

}