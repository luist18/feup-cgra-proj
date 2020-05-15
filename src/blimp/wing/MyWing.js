/**
 * @class Represents a {@link MyVehicle} wing.
 */
class MyWing extends CGFobject {
    /**
     * Instantiates a new wing instance.
     * @param {CGFscene} scene 
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    /**
     * Initializes the wing buffers.
     */
    initBuffers() {
        this.vertices = [
            -0.5, 0, 0,     // 0
            -0.5, -1, 0,  // 1
            0.5, -1, 0,   // 2
            0.5, 0, 0,      // 3
            0, 0.5, 0,      // 4
            // repetition
            -0.5, 0, 0,     // 5
            -0.5, -1, 0,  // 6
            0.5, -1, 0,   // 7
            0.5, 0, 0,      // 8
            0, 0.5, 0       // 9
        ];

        this.indices = [
            0, 1, 2,
            2, 3, 0,
            3, 4, 0,
            // backface
            7, 6, 5,
            5, 8, 7,
            5, 9, 8
        ];

        this.normals = [];
        for (let i = 0; i < 5; ++i)
            this.normals.push(0, 0, 1);

        for (let i = 0; i < 5; ++i)
            this.normals.push(0, 0, -1); 

        this.texCoords = [
            0, 1/3,
            0, 1,
            1, 1,
            1, 1/3,
            1/2, 0,
            // backside
            0, 1/3,
            0, 1,
            1, 1,
            1, 1/3,
            1/2, 0
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
