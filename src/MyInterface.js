/**
 * @class Represents the interface of the application.
 */
class MyInterface extends CGFinterface {
    /**
     * Instantiates a new interface instance.
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application - the application
     */
    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        // Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        // Terrain
        this.gui.add(this.scene, 'selectedTerrain', this.scene.terrainList).name('Terrain').onChange(this.scene.onTerrainChanged.bind(this.scene));

        // Skin
        this.gui.add(this.scene, 'selectedSkin', this.scene.skinList).name('Skin').onChange(this.scene.onSkinChanged.bind(this.scene));
        
        // Supply skin
        this.gui.add(this.scene, 'selectedSupplySkin', this.scene.supplySkinList).name('Supply skin').onChange(this.scene.onSupplySkinChanged.bind(this.scene));

        // Supply skin
        this.gui.add(this.scene, 'selectedCamera', this.scene.cameraList).name('Camera').onChange(this.scene.onCameraChanged.bind(this.scene));

        this.gui.add(this.scene, 'volume', 0.0, 100.0).name('Volume');

        // a folder for grouping parameters related to the vehicle
        var f0 = this.gui.addFolder('Vehicle');
        // Vehicle custom movement
        f0.add(this.scene, 'customMovement').name('Custom mov');
        // Speed factor slider
        f0.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed');
        // Scale factor slider
        f0.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');

        this.initKeys();

        return true;
    }

    initKeys() {
        // create reference from the scene to the GUI
        this.scene.gui = this;
        // disable the processKeyboard function
        this.processKeyboard = function () { };
        // create a named array to store which keys are being pressed
        this.activeKeys = {};
        // create a named array to store one time click keys
        this.continuousActiveKeys = {};

        this.singleActiveKeys = {};
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.continuousActiveKeys[event.code] = !this.continuousActiveKeys[event.code];
        this.singleActiveKeys[event.code] = !this.singleActiveKeys[event.code];
        this.activeKeys[event.code] = true;
    }

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    }

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }

    isContinuousKeyPressed(keyCode) {
        return this.continuousActiveKeys[keyCode] || false;
    }

    isSingleKeyPressed(keyCode) {
        if (this.singleActiveKeys[keyCode]) {
            this.singleActiveKeys[keyCode] = false;
            return true;
        }

        return this.singleActiveKeys[keyCode] || false;
    }
}