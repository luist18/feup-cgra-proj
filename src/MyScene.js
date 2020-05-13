/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initSkins();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(1);
        this.last = performance.now();

        this.enableTextures(true);

        this.axis = new CGFaxis(this);
        this.vehicle = new MyVehicle(this);
        this.billboard = new MyBillboard(this);

        this.initCubeMap();

        this.terrain = new MyTerrain(this);

        this.supplyManager = new MySupplyManager(this);

        // Interface
        this.displayAxis = false;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.autoPilot = false;
        this.customMovement = false;
    }

    initLights() {
        this.lights[0].setPosition(15, 15, 5, 1);
        this.lights[0].setDiffuse(1, 1, 1, 1);
        this.lights[0].setConstantAttenuation(0.8);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(0.7, 0.1, 500, vec3.fromValues(26, 20, 26), vec3.fromValues(0, 5, 0));
    }

    initCubeMap() {
        this.cubeMaps = [
            '../resources/givenedited.png',
            '../resources/cubemapgiven.png'
        ];

        // cube map interface variables
        this.cubeMapList = {
            'Fields (given)': 0,
            'Sky (given)': 1
        };

        this.selectedCubeMap = 0;

        this.cubeMap = new MyCubeMap(this, 50, new CGFtexture(this, this.cubeMaps[this.selectedCubeMap]));
    }

    initSkins() {
        this.selectedSkin = 0;

        this.skins = [
            '../resources/textures/github/',
            '../resources/textures/google/',
            '../resources/textures/up/'
        ];

        this.skinList = {
            'GitHub': 0,
            'Google': 1,
            'U.P.': 2
        };
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.vehicle.update(t);
        this.vehicle.accelerationMultiplier = this.speedFactor;
        this.vehicle.scale = this.scaleFactor;
        this.vehicle.customMovement = this.customMovement;
        this.vehicle.autoPilot = this.autoPilot;

        this.supplyManager.update(t);
        this.billboard.update(t, this.supplyManager.numberOfSuppliesDelivered);
    }

    onCubeMapChanged() {
        this.cubeMap.texture = new CGFtexture(this, this.cubeMaps[this.selectedCubeMap]);
        this.cubeMap.updateBuffers();
    }

    onSkinChanged() {
        this.vehicle.initTextures();
        this.vehicle.wings.initTextures();
        this.vehicle.flag.initTextures();
    }

    resetAll() {
        this.gui.continuousActiveKeys["KeyP"] = false;
        this.autoPilot = false;
        this.vehicle.reset();
        this.supplyManager.reset();
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isContinuousKeyPressed("KeyP"))
            this.autoPilot = true;
        else
            this.autoPilot = false;

        if (this.gui.isKeyPressed("KeyR"))
            this.resetAll();

        if (this.autoPilot)
            return;

        if (this.gui.isKeyPressed("KeyW"))
            this.vehicle.accelerate(0.01);
        if (this.gui.isKeyPressed("KeyS"))
            if (!this.vehicle.customMovement)
                this.vehicle.brake(0.08);
            else
                this.vehicle.accelerate(-0.02);
        if (!this.gui.isKeyPressed("KeyW") && !this.gui.isKeyPressed("KeyS"))
            this.vehicle.accelerate(0.0);
        if (this.gui.isKeyPressed("KeyA"))
            this.vehicle.turn(0.25);
        if (this.gui.isKeyPressed("KeyD"))
            this.vehicle.turn(-0.25);
        if (this.gui.isKeyPressed("Space"))
            this.vehicle.brake(0.15);
        if (this.gui.isSingleKeyPressed("KeyL"))
            this.supplyManager.drop(this.vehicle);
    }

    display() {
        // Update fps in the html page
        this.now = performance.now();
        var fps = 1000 / (this.now - this.last);
        this.last = this.now;

        document.getElementById("fps-counter").firstElementChild.innerHTML = "FPS: " + Math.round(fps);

        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.lights[0].update();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // Key listening
        this.checkKeys();

        // ---- BEGIN Primitive drawing section
        this.cubeMap.display();
        this.supplyManager.display();
        this.billboard.display();
        this.vehicle.display();

        // ---- BEGIN Shader drawing section
        this.vehicle.displayWithShaders();
        this.terrain.displayWithShaders();
        this.billboard.displayWithShaders();

        this.setActiveShader(this.defaultShader);

        // ---- END Primitive drawing section
    }
}