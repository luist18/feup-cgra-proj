/**
 * @class Represents the {@link CGFapplication} scene. 
 */
class MyScene extends CGFscene {
    /**
     * Instantiates a new scene instance.
     */
    constructor() {
        super();
        this.canvas = []
    }

    /**
     * Initializes the scene.
     * @param {CGFapplication} application - the application
     */
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

        this.initSuppliesSkins();
        this.initTerrains();
        this.initCubeMap();

        this.axis = new CGFaxis(this);
        this.vehicle = new MyVehicle(this);
        this.supplyManager = new MySupplyManager(this, 100);
        this.billboard = new MyBillboard(this, this.supplyManager.numberOfSupplies);

        // Interface
        this.displayAxis = false;
        this.speedFactor = 1;
        this.scaleFactor = 1;
        this.autoPilot = false;
        this.customMovement = false;
        this.volume = 20.0;
    }

    /**
     * Initializes the scene lights.
     */
    initLights() {
        this.lights[0].setPosition(15, 15, 5, 1);
        this.lights[0].setDiffuse(1, 1, 1, 1);
        this.lights[0].setConstantAttenuation(0.8);
        this.lights[0].enable();
        this.lights[0].update();
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
        this.camera = new CGFcamera(0.7, 0.1, 500, vec3.fromValues(26, 20, 26), vec3.fromValues(0, 5, 0));
    }

    /**
     * Initializes the scene terrains.
     */
    initTerrains() {
        this.terrains = [
            '../resources/textures/terrain/lake1.png',
            '../resources/textures/terrain/lake2.png',
            '../resources/textures/terrain/canyon.png',
            '../resources/textures/terrain/given.png'
        ];

        this.heightMaps = [
            '../resources/textures/terrain/lake1_h.png',
            '../resources/textures/terrain/lake2_h.png',
            '../resources/textures/terrain/canyon_h.png',
            '../resources/textures/terrain/given_h.png'
        ];

        this.terrainsTex = [];
        this.heightMapsTex = [];

        for (var value in this.terrains) {
            this.terrainsTex.push(new CGFtexture(this, this.terrains[value]));
        }

        for (var value in this.heightMaps) {
            this.heightMapsTex.push(new CGFtexture(this, this.heightMaps[value]));
        }

        // cube map interface variables
        this.terrainList = {
            'Lake 1': 0,
            'Lake 2': 1,
            'Canyon': 2,
            'Given': 3
        };

        this.selectedTerrain = 0;

        this.terrain = new MyTerrain(this);

        this.terrain.material.setTexture(this.terrainsTex[this.selectedTerrain]);
    }

    /**
     * Initializes the scene cube maps.
     */
    initCubeMap() {
        this.cubeMaps = [
            new CGFtexture(this, '../resources/textures/cubemap/lake1.png'),
            new CGFtexture(this, '../resources/textures/cubemap/lake2.png'),
            new CGFtexture(this, '../resources/textures/cubemap/canyon.png'),
            new CGFtexture(this, '../resources/textures/cubemap/given.png')
        ];

        this.cubeMap = new MyCubeMap(this, 50, this.cubeMaps[this.selectedTerrain]);
    }

    /**
     * Initializes the scene blimp skins.
     */
    initSkins() {
        this.selectedSkin = 0;

        this.skins = [
            '../resources/textures/up/',
            '../resources/textures/github/',
            '../resources/textures/google/'
        ];

        this.skinList = {
            'U.P.': 0,
            'GitHub': 1,
            'Google': 2
        };
    }

    /**
     * Initializes the scene supply skins.
     */
    initSuppliesSkins() {
        this.selectedSupplySkin = 0;

        this.supplySkin = [
            '../resources/textures/supply/crate1',
            '../resources/textures/supply/pig',
            '../resources/textures/supply/steve'
        ];

        this.supplySkinList = {
            'Crate 1': 0,
            'Pig': 1,
            'Steve': 2
        };
    }

    /**
     * Sets the default scene appearance.
     */
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setEmission(0, 0, 0, 0);
        this.setShininess(10.0);
    }

    /**
     * Updates periodically each object in the scene (as per setUpdatePeriod() in init())
     * 
     * @param t {number}    - the current time
     */
    update(t) {
        this.vehicle.update(t);
        this.vehicle.accelerationMultiplier = this.speedFactor;
        this.vehicle.scale = this.scaleFactor;
        this.vehicle.customMovement = this.customMovement;
        this.vehicle.autoPilot = this.autoPilot;

        this.supplyManager.update(t);
        this.billboard.update(t, this.supplyManager.numberOfSuppliesDelivered);
    }

    /**
     * Event called when a terrain is changed in the interface.
     */
    onTerrainChanged() {
        // document.getElementById('heightmap').src = this.heightMaps[this.selectedTerrain];
        this.terrain.material.setTexture(this.terrainsTex[this.selectedTerrain]);
        this.cubeMap.setTexture(this.cubeMaps[this.selectedTerrain]);
    
        this.supplyManager.reset();
        this.billboard.updateHeight();
    }

    /**
     * Event called when a blimp skin is changed in the interface.
     */
    onSkinChanged() {
        this.vehicle.initTextures();
        this.vehicle.wings.initTextures();
        this.vehicle.flag.initTextures();
    }

    /**
     * Event called when a supply skin is changed in the interface.
     */
    onSupplySkinChanged(){
        this.supplyManager.initTextures();
        this.supplyManager.reset();
    }

    /**
     * Resets all scene objects.
     */
    resetAll() {
        this.gui.continuousActiveKeys["KeyP"] = false;
        this.autoPilot = false;
        this.vehicle.reset();
        this.supplyManager.reset();
    }

    /**
     * Method responsible for key handling.
     */
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

    /**
     * Displays the objects in the scene.
     */
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
        this.terrain.displayWithShaders(this.terrainsTex[this.selectedTerrain], this.heightMapsTex[this.selectedTerrain]);
        this.billboard.displayWithShaders();

        this.setActiveShader(this.defaultShader);

        // ---- END Primitive drawing section
    }
}