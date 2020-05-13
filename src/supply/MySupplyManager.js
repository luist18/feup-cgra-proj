
class MySupplyManager extends CGFobject {
    constructor(scene, numberOfSupplies = 5) {
        super(scene);
        this.numberOfSupplies = numberOfSupplies;

        this.init();
    }

    init() {
        this.initMaterials();

        this.supplies = [];

        for (var i = 0; i < this.numberOfSupplies; ++i)
            this.supplies.push(new MySupply(this.scene, this.material, this.textures));

        this.numberOfSuppliesLaunched = 0;
        this.numberOfSuppliesDelivered = 0;
    }

    initMaterials() {
        this.material = new CGFappearance(this.scene);
        this.material.setDiffuse(1, 1, 1, 1);
        this.material.setSpecular(1, 1, 1, 1);
        this.material.setAmbient(0.8, 0.8, 0.8, 1);
        this.material.setTextureWrap('REPEAT', 'REPEAT');

        this.textures = [new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_f.png"),
        new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_r.png"),
        new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_b.png"),
        new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_l.png"),
        new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_t.png"),
        new CGFtexture(this.scene, "../../resources/textures/supply/pig/pig_bt.png")];
    }

    reset() {
        this.supplies = [];

        for (var i = 0; i < this.numberOfSupplies; ++i)
            this.supplies.push(new MySupply(this.scene, this.material, this.textures));

        this.numberOfSuppliesLaunched = 0;
        this.numberOfSuppliesDelivered = 0;
    }

    update(t) {
        this.supplies.forEach(supply => supply.update(t));
    }
    
    drop(vehicle) {
        if (this.numberOfSuppliesDelivered == this.numberOfSupplies) return;
        this.supplies[this.numberOfSuppliesLaunched++].drop([vehicle.positionX, vehicle.positionY - 0.55,
        vehicle.positionZ, vehicle.yyangle,
        vehicle.speed]);
        setTimeout(() => {
            this.numberOfSuppliesDelivered++;
        }, 3000);
    }

    display() {
        this.supplies.forEach(supply => supply.display());
    }
}