class MyCubeMap extends CGFobject {
    /**
     * @constructor
     * @param {*} scene     the scene in which the cube map will be shown 
     * @param {*} side      the length of a side of the cube
     * @param {*} texture   the cubemap texture
     */
    constructor(scene, side, texture) {
        super(scene);

        this.texture = texture;
        this.haldSide = side / 2;

        this.initBuffers();
    }

    initBuffers() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(0, 0, 0, 1);
        this.appearance.setSpecular(0, 0, 0, 1);
        this.appearance.setShininess(0);
        this.appearance.setTexture(this.texture);

        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        // related with the compostion of the texture
        var sunit = 1/4;
        var tunit = 1/3;

        // -y face
        this.vertices.push(this.haldSide, -this.haldSide, this.haldSide,
            this.haldSide, -this.haldSide, -this.haldSide,
            -this.haldSide, -this.haldSide, -this.haldSide,
            -this.haldSide, -this.haldSide, this.haldSide);
        this.indices.push(0, 1, 2,
            2, 3, 0);
        this.texCoords.push(2*sunit, 3*tunit,
            2*sunit, 2*tunit,
            1*sunit, 2*tunit,
            1*sunit, 3*tunit);

        // side +x face
        this.vertices.push(this.haldSide, -this.haldSide, this.haldSide,
            this.haldSide, -this.haldSide, -this.haldSide,
            this.haldSide, this.haldSide, -this.haldSide,
            this.haldSide, this.haldSide, this.haldSide);
        this.indices.push(6, 5, 4,
            4, 7, 6);
        this.texCoords.push(3*sunit, 2*tunit,
            2*sunit, 2*tunit,
            2*sunit, 1*tunit,
            3*sunit, 1*tunit);

        // side -z face
        this.vertices.push(this.haldSide, -this.haldSide, -this.haldSide,
            -this.haldSide, -this.haldSide, -this.haldSide,
            -this.haldSide, this.haldSide, -this.haldSide,
            this.haldSide, this.haldSide, -this.haldSide);
        this.indices.push(10, 9, 8,
            8, 11, 10);
        this.texCoords.push(2*sunit, 2*tunit,
            1*sunit, 2*tunit,
            1*sunit, 1*tunit,
            2*sunit, 1*tunit);

        // side -x face
        this.vertices.push(-this.haldSide, -this.haldSide, -this.haldSide,
            -this.haldSide, -this.haldSide, this.haldSide,
            -this.haldSide, this.haldSide, this.haldSide,
            -this.haldSide, this.haldSide, -this.haldSide);
        this.indices.push(14, 13, 12,
            12, 15, 14);
        this.texCoords.push(1*sunit, 2*tunit,
            0*sunit, 2*tunit,
            0*sunit, 1*tunit,
            1*sunit, 1*tunit);

        // side +z face
        this.vertices.push(this.haldSide, -this.haldSide, this.haldSide,
            this.haldSide, this.haldSide, this.haldSide,
            -this.haldSide, this.haldSide, this.haldSide,
            -this.haldSide, -this.haldSide, this.haldSide);
        this.indices.push(18, 17, 16,
            16, 19, 18);
        this.texCoords.push(3*sunit, 2*tunit,
            3*sunit, 1*tunit,
            4*sunit, 1*tunit,
            4*sunit, 2*tunit);

        // +y face
        this.vertices.push(this.haldSide, this.haldSide, this.haldSide,
            this.haldSide, this.haldSide, -this.haldSide,
            -this.haldSide, this.haldSide, -this.haldSide,
            -this.haldSide, this.haldSide, this.haldSide);
        this.indices.push(22, 21, 20,
            20, 23, 22);
        this.texCoords.push(2*sunit, 0*tunit,
            2*sunit, 1*tunit,
            1*sunit, 1*tunit,
            1*sunit, 0*tunit);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateBuffers() {
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    display() {
        this.appearance.apply();
        super.display();
    }
}