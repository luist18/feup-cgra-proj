/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
        this.initMovement();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        this.initSideBuffers();
        this.initBottomBuffers();

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    initSideBuffers() {
        var size = this.indices.length;

        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0, 0, 1);
            this.vertices.push(ca, -sa, -1);
            this.vertices.push(caa, -saa, -1);

            //this.vertices.push(0, 1, 0);
            //this.vertices.push(ca, 0, -sa);
            //this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal = [
                saa - sa,
                caa - ca,
                ca * saa - sa * caa
            ];

            // normalization
            var nsize = Math.sqrt(
                normal[0] * normal[0] +
                normal[1] * normal[1] +
                normal[2] * normal[2]
            );
            normal[0] /= nsize;
            normal[1] /= nsize;
            normal[2] /= nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3 * i + size, (3 * i + 2) + size, (3 * i + 1) + size);

            ang += alphaAng;
        }
    }

    initBottomBuffers() {
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;

        var size = this.indices.length;
        for (var i = 0; i < this.slices; i++) {
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa = Math.sin(ang);
            var saa = Math.sin(ang + alphaAng);
            var ca = Math.cos(ang);
            var caa = Math.cos(ang + alphaAng);

            this.vertices.push(0, 0, -1);
            this.vertices.push(ca, -sa, -1);
            this.vertices.push(caa, -saa, -1);

            //this.vertices.push(0, 1, 0);
            //this.vertices.push(ca, 0, -sa);
            //this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal = [
                0, 0, -1,
            ];

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push((3 * i + 1) + size, (3 * i + 2) + size, 3 * i + size);

            ang += alphaAng;
        }
    }

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    // Movement methods

    initMovement() {
        this.yyangle = 0;

        this.positionX = 0;
        this.positionZ = 0;

        this.velocityX = 0;
        this.velocityZ = 0;
    }

    accelerate(value) {
        this.velocityX += Math.sin(this.yyangle) * value;
        this.velocityZ += Math.cos(this.yyangle) * value;

        if (this.velocityX > 1)
            this.velocityX = 1;
        else if (this.velocityX < -1)
            this.velocityX = -1;

        if (this.velocityZ > 1)
            this.velocityZ = 1;
        else if (this.velocityZ < -1)
            this.velocityZ = -1;
    }

    turn(value) {
        this.yyangle += value;
    }

    brake() {
        this.velocityX += this.velocityX * -0.15;
        this.velocityZ += this.velocityZ * -0.15;
    }

    update() {
        this.velocityX += this.velocityX * -0.08;
        this.velocityZ += this.velocityZ * -0.08;
        this.positionX += this.velocityX;
        this.positionZ += this.velocityZ;
    }

    display() {
        this.update();
        this.scene.pushMatrix();

        this.scene.translate(this.positionX, 0, this.positionZ);
        this.scene.rotate(this.yyangle, 0, 1, 0);
        super.display();

        this.scene.popMatrix();
    }
}


