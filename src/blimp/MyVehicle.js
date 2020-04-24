/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;

        this.init();
        //this.initBuffers();
        this.initMovement();
    }

    init() {
        this.balloon = new MySphere(this.scene, 20, 10);
        this.mainCockpit = new MyCylinder(this.scene, 20);
        this.cockpitSide = new MySphere(this.scene, 10, 10);
        this.wing = new Wing(this.scene);
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
        this.speed = 0;
        this.acceleration = 0; // not counting friction
        this.yyangle = 0;
        this.accelerationMultiplier = 1; // speed factor slider

        this.turningValue = 0;

        this.positionX = 0;
        this.positionZ = 0;

        this.lastTime = 0;
    }

    accelerate(value) {
        value *= this.accelerationMultiplier;

        this.acceleration = value;
        this.speed += this.acceleration;

        if (this.speed > 0.5)
            this.speed = 0.5;
        if (this.speed < -0.5)
            this.speed = -0.5;
    }

    turn(value) {
        this.turningValue = value;
    }

    brake(amount) {
        this.speed += this.speed * -amount;
    }

    reset() {
        this.speed = 0;
        this.acceleration = 0;
        this.yyangle = 0;
        this.positionX = 0;
        this.positionZ = 0;
    }

    update(t) {
        var elapsed = t - this.lastTime;
        this.lastTime = t;

        this.yyangle += this.turningValue * this.speed;
        this.turningValue = 0;

        if (this.scene.customMovement) {
            this.friction = this.speed * -0.08;
            this.speed += this.friction;
        }

        this.positionX += this.speed * Math.sin(this.yyangle) * 15/elapsed;
        this.positionZ += this.speed * Math.cos(this.yyangle) * 15/elapsed;
    }

    display() {
        this.scene.setDefaultAppearance();

        /* movement */
        this.scene.pushMatrix();

        this.scene.translate(this.positionX, 0, this.positionZ);
        this.scene.rotate(this.yyangle, 0, 1, 0);

        /* cockpit */
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.1, 0.45, 0.1);
        this.scene.translate(0, -0.5, 0);
        this.mainCockpit.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.225);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cockpitSide.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.225);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cockpitSide.display();
        this.scene.popMatrix();

        /* wings */
        // top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // down
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // left
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();
             
        // right
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix(); 

        /* central balloon */
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.balloon.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}


