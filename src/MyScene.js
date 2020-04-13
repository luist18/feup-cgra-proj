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

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(50);

        this.enableTextures(true);

        this.initCubeMap();

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.objects = [
            new MySphere(this, 16, 8),
            new MyCylinder(this, 6),
            new MyPyramid(this, 4, 16)
        ];

        // Object interface variables
        this.objectList = {
            'Sphere': 0,
            'Cylinder': 1,
            'Vehicle': 2
        };

        this.selectedObject = 0;

        //Objects connected to MyInterface
        this.displayAxis = true;
    }

    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

        // cube map light
        this.lights[1].setPosition(15, 2, 5, 1);
        this.lights[1].setAmbient(1.0, 1.0, 1.0, 1.0);
        this.lights[1].setDiffuse(0.0, 0.0, 0.0, 0.0);
        this.lights[1].setSpecular(0.0, 0.0, 0.0, 0.0);
    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    initCubeMap() {
        this.cubeMaps = [
            '../resources/cubemapgiven.png',
            '../resources/otherplanet.png',
            '../resources/vintagecar.jpg',
            '../resources/givenedited.png'
        ];

        // cube map interface variables
        this.cubeMapList = {
            'Sky (given)': 0,
            'Other planet': 1,
            'Vintage car': 2,
            'Fields (given, edited)': 3
        };

        this.selectedCubeMap = 0;

        this.cubeMap = new MyCubeMap(this, 50, new CGFtexture(this, this.cubeMaps[this.selectedCubeMap]));
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        //To be done...
    }

    onCubeMapChanged() {
        this.cubeMap.texture = new CGFtexture(this, this.cubeMaps[this.selectedCubeMap]);
        this.cubeMap.updateBuffers();
    }

    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/

        if (this.objects[this.selectedObject] instanceof MyPyramid) {
            var vehicle = this.objects[this.selectedObject];
            if (this.gui.isKeyPressed("KeyW"))
                vehicle.accelerate(0.02);
            if (this.gui.isKeyPressed("KeyS"))
                vehicle.accelerate(-0.02);
            if (this.gui.isKeyPressed("KeyA"))
                vehicle.turn(0.05);
            if (this.gui.isKeyPressed("KeyD"))
                vehicle.turn(-0.05);
            if (this.gui.isKeyPressed("Space"))
                vehicle.brake();
        }
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // Key listening
        this.checkKeys();

        // ---- BEGIN Primitive drawing section

        this.objects[this.selectedObject].display();

        // displays the cube map

        this.lights[1].enable();
        this.lights[1].update();
        this.cubeMap.display();
        this.lights[1].disable();
        this.lights[1].update();

        // ---- END Primitive drawing section
    }
}