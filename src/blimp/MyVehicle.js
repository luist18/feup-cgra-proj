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
        this.blue = new CGFtexture(this.scene, "../resources/blimp/wing_texture.png");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);

        this.balloon = new MySphere(this.scene, 20, 10);
        this.mainCockpit = new MyCylinder(this.scene, 20);
        this.cockpitSide = new MySphere(this.scene, 10, 10);
        this.wings = new MyWingsManager(this.scene, this.material);
        this.turbineHolder = new MySphere(this.scene, 10, 10);
        this.turbine = new MyTurbine(this.scene, 10, 10);

        this.scale = 1;
    }

    // Movement method
    initMovement() {
        this.customMovement = false;

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
        console.log(value);
        value *= this.accelerationMultiplier;

        this.acceleration = value;
        this.speed += this.acceleration;

        let maxSpeed = 0.2 * this.accelerationMultiplier;
        if (this.speed > maxSpeed)
            this.speed = maxSpeed;
        if (this.speed < -maxSpeed)
            this.speed = -maxSpeed;
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

        this.turbine.reset();
        this.wings.reset();
    }

    update(t) {
        var elapsed = t - this.lastTime;
        this.lastTime = t;

        this.wings.update(elapsed, this.turningValue);
        this.turbine.update(elapsed, this.speed);

        // this.yyangle += this.turningValue * this.speed * 15 / elapsed;
        this.yyangle -= this.wings.angle * this.speed * 15 / elapsed; // TEST use this one instead of the one before for a more realistic movement, this depends on the wings, the one before does not
        
        if (this.customMovement) {
            this.friction = this.speed * -0.009;
            this.speed += this.friction;
        }
        this.positionX += this.speed * Math.sin(this.yyangle) * 15 / elapsed;
        this.positionZ += this.speed * Math.cos(this.yyangle) * 15 / elapsed;
        
        this.turningValue = 0;
    }

    display() {
        /* movement */
        this.scene.pushMatrix();

        this.scene.translate(this.positionX, this.positionY, this.positionZ);
        this.scene.rotate(this.yyangle, 0, 1, 0);

        this.displayObject();

        this.scene.popMatrix();
    }

    displayObject() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        /* central balloon */
        this.material.setTexture(this.google);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.balloon.display();
        this.scene.popMatrix();

        /* cockpit */
        this.material.setTexture(this.blue);
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
        this.wings.display();

        /* turbine holders */
        // left
        this.material.setTexture(this.google);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix(); 

        // right
        this.material.setTexture(this.google);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix(); 

        /* turbines */
        this.material.setTexture(this.blue);
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

        this.scene.popMatrix();
    }
}


