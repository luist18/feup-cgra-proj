/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene, divs = 100, size = 50, maxHeight = 8) {
        super(scene);
        this.divs = divs;
        this.size = size;
        this.maxHeight = maxHeight;

        this.terrainTex = new CGFtexture(this.scene, "../resources/textures/terrain/t-min.png");
        this.terrainMap = new CGFtexture(this.scene, "../resources/textures/terrain/h-min.png");
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.terrainTex);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.plane = new MyPlane(scene, divs);

        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        // The first sampler is the texture and the second is the map
        this.shader.setUniformsValues({uSampler: 1});
        this.shader.setUniformsValues({uSampler2: 2});
        this.shader.setUniformsValues({maxHeight: maxHeight});
        //this.shader.setUniformsValues({maxHeight: this.maxHeight});
    }

    display() {
        this.scene.setActiveShader(this.shader);

        this.material.apply();

        this.scene.pushMatrix();

        this.terrainTex.bind(1);
        this.terrainMap.bind(2);

        this.scene.scale(this.size, 1, this.size);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);

        this.plane.display();

        this.scene.popMatrix();
    }
}