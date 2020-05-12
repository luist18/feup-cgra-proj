class MyVehicle extends CGFobject {
    constructor(scene, positionY = 10) {
        super(scene);
        this.initTextures();
        this.init();
        this.initMovement();

        this.positionY = positionY;
    }

    init() {
        this.balloon = new MySphere(this.scene, 20, 10);
        this.mainCockpit = new MyCylinder(this.scene, 20);
        this.cockpitSide = new MySphere(this.scene, 10, 10);
        this.wings = new MyWingsManager(this.scene, this.material);
        this.turbineHolder = new MySphere(this.scene, 10, 10);
        this.turbine = new MyTurbine(this.scene, 10, 10);
        this.flag = new MyFlag(this.scene, 20);
        this.flagHolder = new MyCylinder(this.scene, 8);

        this.scale = 1;
        this.autoPilot = false;
    }

    initTextures() {
        var path = this.scene.skins[this.scene.selectedSkin];

        this.blimp = new CGFtexture(this.scene, path.concat("blimp/blimp.png"));
        this.cockpitFront = new CGFtexture(this.scene, path.concat("blimp/cockpit_front_texture.png"));
        this.cockpit = new CGFtexture(this.scene, path.concat("blimp/cockpit.png"));
        this.rope = new CGFtexture(this.scene, "../resources/textures/rope.png");
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
    }

    // Movement method
    initMovement() {
        this.customMovement = false;

        this.speed = 0; // units/second
        this.acceleration = 0; // not counting friction
        this.yyangle = 0;
        this.accelerationMultiplier = 1; // speed factor slider, units/second

        this.turningValue = 0;

        this.positionX = 0;
        this.positionZ = 0;

        this.lastTime = 0;
    }

    accelerate(value) {
        value *= this.accelerationMultiplier * 5; // default max speed 5 units/second

        this.acceleration = value;
        this.speed += this.acceleration;

        let maxSpeed = this.accelerationMultiplier * 5; // default max speed 5 units/second
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

    /**
     * Makes rotations automatically. :(
     * @param {*} radius        the radius of the rotation 
     * @param {*} time          the time the rotation takes
     * @param {*} timeElapsed   the elapsed time
     */
    applyAutoPilot(radius, time, timeElapsed) {
        this.speed = radius * 2 * Math.PI / time; // perimeter / time <=> 2 * PI * radius / time
        this.apangle = 2 * Math.PI * timeElapsed / time;
        this.turningValue = this.apangle / (Math.PI / 2);
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

        elapsed /= 1000; // seconds

        if (this.autoPilot)
            this.applyAutoPilot(5, 5, elapsed);

        this.wings.update(elapsed, this.turningValue);
        this.turbine.update(elapsed, this.speed);
        this.flag.update(elapsed, this.turningValue, this.speed, this.wings.angle * this.speed / 50, this.accelerationMultiplier);

        if (this.autoPilot) // completely ignore wing input
            this.yyangle += this.apangle;
        else
            this.yyangle -= this.wings.angle * this.speed / 50; // 50 smooths
        // this.yyangle += this.turningValue * this.speed * 15 / elapsed; // deprecated

        if (this.customMovement) {
            this.friction = this.speed * -0.009;
            this.speed += this.friction;
        }
        this.positionX += this.speed * Math.sin(this.yyangle) * elapsed;
        this.positionZ += this.speed * Math.cos(this.yyangle) * elapsed;

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

    displayWithShaders() {
        // flag
        this.scene.pushMatrix();

        this.scene.translate(this.positionX, this.positionY, this.positionZ);
        this.scene.rotate(this.yyangle, 0, 1, 0);
        this.scene.scale(this.scale, this.scale, this.scale);

        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.flag.displayWithShaders();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayObject() {
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

        /* central balloon */
        this.material.setTexture(this.blimp);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.balloon.display();
        this.scene.popMatrix();

        /* cockpit */
        this.material.setTexture(this.cockpit);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
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
        this.material.setTexture(this.blimp);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix();

        // right
        this.material.setTexture(this.blimp);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.54, -0.25);
        this.scene.scale(0.04, 0.02, 0.07);
        this.turbineHolder.display();
        this.scene.popMatrix();

        /* turbines */
        this.material.setTexture(this.cockpit);
        this.material.apply();
        // left
        this.scene.pushMatrix();
        this.scene.translate(0.11, -0.54, -0.30);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.01);
        this.turbine.display();
        this.scene.popMatrix();

        // right
        this.scene.pushMatrix();
        this.scene.translate(-0.11, -0.54, -0.3);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.02, 0.02, 0.01);
        this.turbine.display();
        this.scene.popMatrix();

        // flag holders
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -1.75);
        this.scene.scale(0.02, 0.8, 0.02);
        this.scene.translate(0, -0.5, 0);
        this.flagHolder.display();
        this.scene.popMatrix();

        this.material.setTexture(this.rope);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, 0.2, -1.35);
        this.scene.rotate(Math.PI / 2 + 0.38995733, 1, 0, 0);
        this.scene.scale(0.0075, 0.85, 0.0075);
        this.scene.translate(0, -0.5, 0);
        this.flagHolder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, -0.2, -1.35);
        this.scene.rotate(Math.PI / 2 - 0.38995733, 1, 0, 0);
        this.scene.scale(0.0075, 0.85, 0.0075);
        this.scene.translate(0, -0.5, 0);
        this.flagHolder.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}


