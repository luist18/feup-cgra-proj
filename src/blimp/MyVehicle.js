class MyVehicle extends CGFobject {
    constructor(scene, positionY = 10) {
        super(scene);
        this.init();
        this.initMovement();
        
        this.positionY = positionY;
    }

    init() {
        this.google = new CGFtexture(this.scene, "../resources/blimp/google_texture.png");
        this.cockpitFront = new CGFtexture(this.scene, "../resources/blimp/cockpit_front_texture.png");
        this.wing_texture = new CGFtexture(this.scene, "../resources/blimp/wing_texture.png");
        this.yellow = new CGFtexture(this.scene, "../resources/blimp/yellow.png");
        this.green = new CGFtexture(this.scene, "../resources/blimp/green.png");
        this.red = new CGFtexture(this.scene, "../resources/blimp/red.png");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.5, 0.5, 0.5, 1);

        this.balloon = new MySphere(this.scene, 20, 10);
        this.mainCockpit = new MyCylinder(this.scene, 20);
        this.cockpitSide = new MySphere(this.scene, 10, 10);
        this.wing = new MyWing(this.scene);
        this.turbineHolder = new MySphere(this.scene, 10, 10);
        this.turbine = new MyTurbine(this.scene, 10, 10);
    }

    // Movement method
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

        if (this.speed > 0.2)
            this.speed = 0.2;
        if (this.speed < -0.2)
            this.speed = -0.2;
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
            this.friction = this.speed * -0.009;
            this.speed += this.friction;
        }

        this.positionX += this.speed * Math.sin(this.yyangle) * 15/elapsed;
        this.positionZ += this.speed * Math.cos(this.yyangle) * 15/elapsed;
    }

    display() {
        this.scene.setDefaultAppearance();

        /* movement */
        this.scene.pushMatrix();

        this.scene.translate(this.positionX, this.positionY, this.positionZ);
        this.scene.rotate(this.yyangle, 0, 1, 0);

        this.displayObject();

        this.scene.popMatrix();
    }

    displayObject() {

        /* central balloon */
        this.material.setTexture(this.google);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.balloon.display();
        this.scene.popMatrix();

        /* cockpit */
        this.material.setTexture(this.wing_texture);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.1, 0.45, 0.1);
        this.scene.translate(0, -0.5, 0);
        this.mainCockpit.display();
        this.scene.popMatrix();

        this.material.setTexture(this.cockpitFront);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.225);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cockpitSide.display();
        this.scene.popMatrix();

        this.material.setTexture(this.cockpitFront);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.225);
        this.scene.scale(0.1, 0.1, 0.1);
        this.cockpitSide.display();
        this.scene.popMatrix();

        /* wings */
        // top
        this.material.setTexture(this.wing_texture);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // down
        this.material.setTexture(this.green);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();

        // left
        this.material.setTexture(this.red);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix();
             
        // right
        this.material.setTexture(this.yellow);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -0.8);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.scale(0.4, 0.4, 0.4);
        this.wing.display();
        this.scene.popMatrix(); 

        /* turbine holders */
        this.material.setTexture(this.google);
        this.material.apply();
        // left
        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix(); 

        // right
        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix(); 

        /* turbines */
        this.material.setTexture(this.wing_texture);
        this.material.apply();
        // left
        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.54, -0.30);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.01);
        this.turbine.display();
        this.scene.popMatrix(); 

        // right
        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.54, -0.3);
        this.scene.rotate(-Math.PI/2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.01);
        this.turbine.display();
        this.scene.popMatrix(); 
    }
}


