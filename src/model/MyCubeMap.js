/**
 * Represents a cube that is only seen by the inside
 * @constructor
 */
class MyCubeMap extends CGFobject {
    /**
     * @constructor
     * @param {*} scene     - the scene in which the cube map will be shown 
     * @param {*} side      - the length of a side of the cube
     * @param {*} texture   - the cubemap texture
     */
    constructor(scene, side, texture) {
        super(scene);

        this.texture = texture;
        this.halfSide = side / 2;

        this.initAppearance();
        this.initBuffers();
    }

    /**
     * @method initAppearance
     * Initializes the appearance of the cube
     */
    initAppearance() {
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setEmission(1, 1, 1, 1);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }

    /**
     * @method initBuffers
     * Initializes the cube buffers
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        // related with the composition of the texture
        var sunit = 1/4;
        var tunit = 1/3;
        var x = (1/1025)/2;
        var y = (1/769)/2;

        // -y face
        this.vertices.push(this.halfSide, -this.halfSide, this.halfSide,
            this.halfSide, -this.halfSide, -this.halfSide,
            -this.halfSide, -this.halfSide, -this.halfSide,
            -this.halfSide, -this.halfSide, this.halfSide);
        this.indices.push(0, 1, 2,
            2, 3, 0);
        this.texCoords.push(2*sunit -x, 3*tunit,
            2*sunit -x, 2*tunit,
            1*sunit +x, 2*tunit,
            1*sunit +x, 3*tunit);

        // side +x face
        this.vertices.push(this.halfSide, -this.halfSide, this.halfSide,
            this.halfSide, -this.halfSide, -this.halfSide,
            this.halfSide, this.halfSide, -this.halfSide,
            this.halfSide, this.halfSide, this.halfSide);
        this.indices.push(6, 5, 4,
            4, 7, 6);
        this.texCoords.push(3*sunit, 2*tunit -y,
            2*sunit, 2*tunit -y,
            2*sunit, 1*tunit +y,
            3*sunit, 1*tunit +y);

        // side -z face
        this.vertices.push(this.halfSide, -this.halfSide, -this.halfSide,
            -this.halfSide, -this.halfSide, -this.halfSide,
            -this.halfSide, this.halfSide, -this.halfSide,
            this.halfSide, this.halfSide, -this.halfSide);
        this.indices.push(10, 9, 8,
            8, 11, 10);
        this.texCoords.push(2*sunit, 2*tunit,
            1*sunit, 2*tunit,
            1*sunit, 1*tunit,
            2*sunit, 1*tunit);

        // side -x face
        this.vertices.push(-this.halfSide, -this.halfSide, -this.halfSide,
            -this.halfSide, -this.halfSide, this.halfSide,
            -this.halfSide, this.halfSide, this.halfSide,
            -this.halfSide, this.halfSide, -this.halfSide);
        this.indices.push(14, 13, 12,
            12, 15, 14);
        this.texCoords.push(1*sunit, 2*tunit -y,
            0*sunit, 2*tunit -y,
            0*sunit, 1*tunit +y,
            1*sunit, 1*tunit +y);

        // side +z face
        this.vertices.push(this.halfSide, -this.halfSide, this.halfSide,
            this.halfSide, this.halfSide, this.halfSide,
            -this.halfSide, this.halfSide, this.halfSide,
            -this.halfSide, -this.halfSide, this.halfSide);
        this.indices.push(18, 17, 16,
            16, 19, 18);
        this.texCoords.push(3*sunit, 2*tunit -y,
            3*sunit, 1*tunit +y,
            4*sunit, 1*tunit +y,
            4*sunit, 2*tunit -y);

        // +y face
        this.vertices.push(this.halfSide, this.halfSide, this.halfSide,
            this.halfSide, this.halfSide, -this.halfSide,
            -this.halfSide, this.halfSide, -this.halfSide,
            -this.halfSide, this.halfSide, this.halfSide);
        this.indices.push(22, 21, 20,
            20, 23, 22);
        this.texCoords.push(2*sunit -x, 0*tunit +y,
            2*sunit -x, 1*tunit,
            1*sunit +x, 1*tunit,
            1*sunit +x, 0*tunit +y);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method updateBuffers
     * Reinitializes buffers 
     */
    updateBuffers() {
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    /**
     * @method display
     * Displays the cube
     */
    display() {
        this.appearance.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 10, 0);
        super.display();
        this.scene.popMatrix();
        this.scene.setDefaultAppearance();
    }
}