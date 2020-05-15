/**
 * Represents a cylinder
 * @constructor
 */
class MyCylinder extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} slices - number of slices around Y axis
     */
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }

    /**
     * @method initBuffers
     * Inits the vertices, indices, normals and texture coordinates
     */
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        this.minAngle = 2 * Math.PI / this.slices;
        this.initSideBuffers();
        this.initTopBottomBuffers();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * @method initSideBuffers
     * Inits the buffers of the rounded side
     */
    initSideBuffers() {
        let currentAngle = 0;
        // makes the first edge on xx
        this.vertices.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
            Math.cos(currentAngle), 1, -Math.sin(currentAngle));
        this.normals.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
            Math.cos(currentAngle), 0, -Math.sin(currentAngle));
        this.texCoords.push(0, 1,
            0, 0);
        currentAngle += this.minAngle;

        for (var i = 0; i < this.slices; ++i) { // the first edge will be processed twice to apply textures
            // makes an edge
            this.vertices.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
                Math.cos(currentAngle), 1, -Math.sin(currentAngle));

            // makes the face immediately before the edge
            this.indices.push(2 * i, 2 * i + 2, 2 * i + 3,
                2 * i + 3, 2 * i + 1, 2 * i);

            // makes the normals for both of the vertices of the current edge                    
            this.normals.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
                Math.cos(currentAngle), 0, -Math.sin(currentAngle));

            // assigns texture coordinates for the vertices of the edges
            // is expected a rectangular horizontal image to fill the side of the cylinder 
            let texSPosition = (i + 1) / this.slices;
            this.texCoords.push(texSPosition, 1,
                texSPosition, 0);

            currentAngle += this.minAngle;
        }
    }

    /**
     * @method initTopBottomBuffers
     * Inits the top and down faces
     */
    initTopBottomBuffers() {
        let firstDown = 2 * (this.slices + 1);
        let firstUp = firstDown + 1;
        let currentAngle = 0;

        // replicates the first two edges, with another normals (facing up and down)
        let i = 0;
        for (; i < 2; ++i) {
            this.vertices.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
                Math.cos(currentAngle), 1, -Math.sin(currentAngle));
            this.normals.push(0, -1, 0,
                0, 1, 0);
            currentAngle += this.minAngle;
        }

        // replicates the rest of the edges, with another normals (facing up and down)
        for (; i <= this.slices; ++i) {
            this.vertices.push(Math.cos(currentAngle), 0, -Math.sin(currentAngle),
                Math.cos(currentAngle), 1, -Math.sin(currentAngle));

            // makes the face immediately before the edge
            this.indices.push(firstDown + 2 * i, firstDown + 2 * i - 2, firstDown,
                firstUp, firstUp + 2 * i - 2, firstUp + 2 * i);


            // makes the facing up and down normals                  
            this.normals.push(0, -1, 0,
                0, 1, 0);

            currentAngle += this.minAngle;
        }
    }
}