/**
 * @class Represents the {@link MySupply} manager, responsible for handling the {@link MyVehicle} supplies.
 */
class MySupplyManager extends CGFobject {
    /**
     * Instantiates a new supply manager instance.
     * @param {CGFscene} scene              - the scene
     * @param {integer} numberOfSupplies    - the number of supplies
     */
    constructor(scene, numberOfSupplies = 5) {
        super(scene);
        this.numberOfSupplies = numberOfSupplies;

        this.init();
    }

    /**
     * Initializes the supplies buffers.
     */
    init() {
        this.initMaterials();

        this.supplies = [];

        for (var i = 0; i < this.numberOfSupplies; ++i)
            this.supplies.push(new MySupply(this.scene, this.material, this.textures));

        this.numberOfSuppliesLaunched = 0;
        this.numberOfSuppliesDelivered = 0;
    }

    /**
     * Initializes the supplies materials.
     */
    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.initTextures();
    }
    
    /**
     * Initializes the supplies textures.
     */
    initTextures(){
        var path = this.scene.supplySkin[this.scene.selectedSupplySkin];

        this.textures = [new CGFtexture(this.scene, path.concat("/f.png")),
        new CGFtexture(this.scene, path.concat("/r.png")),
        new CGFtexture(this.scene, path.concat("/b.png")),
        new CGFtexture(this.scene, path.concat("/l.png")),
        new CGFtexture(this.scene, path.concat("/t.png")),
        new CGFtexture(this.scene, path.concat("/bt.png"))];
    }

    /**
     * Resets the supplies.
     */
    reset() {
        this.supplies = [];

        for (var i = 0; i < this.numberOfSupplies; ++i)
            this.supplies.push(new MySupply(this.scene, this.material, this.textures));

        this.numberOfSuppliesLaunched = 0;
        this.numberOfSuppliesDelivered = 0;
    }

    /**
     * Updates each supply in the array and the number of supplies delivered.
     * @param {number} t    - the current time
     */
    update(t) {
        var delivered = 0;
        this.supplies.forEach(supply => {
            if (supply.state == SupplyStates.LANDED) delivered++
            supply.update(t);
        });

        this.numberOfSuppliesDelivered = delivered;
    }

    /**
     * Drops a supply, if possible, in the vehicle position.
     * @param {MyVehicle} vehicle - the MyVehicle class
     */
    drop(vehicle) {
        if (this.numberOfSuppliesLaunched == this.numberOfSupplies) return;
        this.supplies[this.numberOfSuppliesLaunched++].drop([vehicle.positionX, vehicle.positionY - 0.55 * this.scene.scaleFactor,
        vehicle.positionZ, vehicle.yyangle,
        vehicle.speed]);
    }

    /**
     * Diplays each supply in the manager.
     */
    display() {
        this.supplies.forEach(supply => supply.display());
    }
}