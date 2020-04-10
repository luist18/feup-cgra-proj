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
        // Dropbox of cubemap
        this.gui.add(this.scene, 'selectedCubeMap', this.scene.cubeMapList).name('Cube Map').onChange(this.scene.onCubeMapChanged.bind(this.scene));

        return true;
    }
}