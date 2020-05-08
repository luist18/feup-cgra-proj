/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        var obj = this;

        // Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

        // Dropbox of cube map
        this.gui.add(this.scene, 'selectedCubeMap', this.scene.cubeMapList).name('Cube Map').onChange(this.scene.onCubeMapChanged.bind(this.scene));

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