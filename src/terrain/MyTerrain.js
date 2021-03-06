/**
 * @class Represents a terrain, based in {@link MyPlane} class. 
 */
class MyTerrain extends CGFobject {
    /**
     * Instantiates a new terrain instance.
     * @param {number} scene        - the scene
     * @param {integer} divs        - the number of division of the terrain
     * @param {number} size         - the size of the terrain
     * @param {number} maxHeight    - the max height of the terrain
     */
    constructor(scene, divs = 100, size = 50, maxHeight = 8) {
        super(scene);
        this.divs = divs;
        this.size = size;
        this.maxHeight = maxHeight;

        this.material = new CGFappearance(this.scene);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.plane = new MyPlane(scene, divs);

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // The first sampler is the texture and the second is the map
        this.shader.setUniformsValues({ uSampler: 1 });
        this.shader.setUniformsValues({ uSampler2: 2 });
        this.shader.setUniformsValues({ maxHeight: maxHeight });
        //this.shader.setUniformsValues({maxHeight: this.maxHeight});
    }

    /**
     * Gets the height for a specific position.
     * @param {number} positionX    - the X position
     * @param {number} positionZ    - the Y position
     */
    getHeight(positionX, positionZ) {
        var i = Math.floor((positionX + this.size / 2) * this.scene.canvas[this.scene.selectedTerrain].width / this.size);
        var j = Math.floor((positionZ + this.size / 2) * this.scene.canvas[this.scene.selectedTerrain].height / this.size);

        var pixelData = this.scene.canvas[this.scene.selectedTerrain].getContext('2d').getImageData(i, j, 1, 1).data;

        return this.maxHeight * pixelData[0] / 255;
    }

    /**
     * Displays the terrain.
     * @param {CGFtexture} terrainTex - the texture of the terrain
     * @param {CGFtexture} terrainMap - the texture of the height map
     */
    displayWithShaders(terrainTex, terrainMap) {
        this.scene.setActiveShader(this.shader);

        this.material.apply();

        this.scene.pushMatrix();

        terrainTex.bind(1);
        terrainMap.bind(2);

        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();
    }
}