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
        // Dropbox of object
        this.gui.add(this.scene, 'selectedObject', this.scene.objectList).name('Object Type');
        // Dropbox of cube map
        this.gui.add(this.scene, 'selectedCubeMap', this.scene.cubeMapList).name('Cube Map').onChange(this.scene.onCubeMapChanged.bind(this.scene));
        // Speed factor slider
        this.gui.add(this.scene, 'speedFactor', 0.1, 3.0).name('Speed');
        // Scale factor slider
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3.0).name('Scale');

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
    }

    processKeyDown(event) {
        // called when a key is pressed down
        // mark it as active in the array
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        // called when a key is released, mark it as inactive in the array
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        // returns true if a key is marked as pressed, false otherwise
        return this.activeKeys[keyCode] || false;
    }
}