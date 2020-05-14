const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {

    constructor(scene, material, texts, scaleFactor = 0.18, positionX = 0, positionY = 0, positionZ = 0) {
        super(scene);
        this.state = SupplyStates.INACTIVE;

        this.positionX = positionX;
        this.positionY = positionY;
        this.positionZ = positionZ;
        this.texts = texts;
        this.scaleFactor = scaleFactor;

        this.plane = new MyPlane(this.scene, 8);

        this.material = material;
        this.texts = texts;
        this.velocity = 0;

        this.airResistance = -0.02;
    }

    drop(dropPosition) {
        this.positionX = dropPosition[0];
        this.positionY = dropPosition[1];
        this.positionZ = dropPosition[2];

        this.yyangle = dropPosition[3];

        this.vehicleVelocity = dropPosition[4];

        this.constAcceleration = -2 * dropPosition[1] / 9;

        this.state = SupplyStates.FALLING;
    }

    land() {
        this.state = SupplyStates.LANDED;
        playSound("fallbig", {volume: this.scene.volume / 100});
    }

    update(t) {
        if (this.state == SupplyStates.LANDED) return;
        else if (this.state == SupplyStates.INACTIVE) {
            this.lastTime = t;
            return;
        }

        var elapsed = t - this.lastTime;
        this.lastTime = t;

        elapsed /= 1000;

        this.velocity += this.constAcceleration * elapsed;

        this.positionY += this.velocity * elapsed;

        this.vehicleVelocity += this.airResistance * this.vehicleVelocity;

        this.positionX += this.vehicleVelocity * Math.sin(this.yyangle) * elapsed;
        this.positionZ += this.vehicleVelocity * Math.cos(this.yyangle) * elapsed;

        var i = Math.floor((this.positionX + 25) * this.scene.canvas.width / 50);
        var j = Math.floor((this.positionZ + 25) * this.scene.canvas.height / 50);

        var pixelData = this.scene.canvas.getContext('2d').getImageData(i, j, 1, 1).data;

        var height = 8 * pixelData[0] / 255;

        if (this.positionY <= height || this.positionY == 0) {
            this.positionY = height || 0;
            this.land();
            return;
        }
    }

    display() {
        if (this.state == SupplyStates.INACTIVE) return;

        this.material.apply();

        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.pushMatrix();


        this.scene.translate(this.positionX, this.positionY, this.positionZ);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        if (this.state == SupplyStates.FALLING)
            this.displayFalling();
        else if (this.state == SupplyStates.LANDED)
            this.displayLanded();

        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);

        this.scene.popMatrix();
    }

    displayFalling() {
        this.material.setTexture(this.texts[0]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0.5);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[1]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[2]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[3]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(-0.5, + 0.5, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[4]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[5]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
    }

    displayLanded() {
        this.material.setTexture(this.texts[0]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.03, 0.5);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[1]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.02, 0.5);
        this.scene.rotate(-Math.PI / 9, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[2]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(0.9, 0.03, - 0.5);
        this.scene.rotate(-Math.PI / 3, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[3]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(- 0.9, 0.03, - 0.5);
        this.scene.rotate(Math.PI / 9, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[4]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(- 0.9, 0.02, 0.5);
        this.scene.rotate(Math.PI / 3, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.material.setTexture(this.texts[5]);
        this.material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.pushMatrix();
        this.scene.translate(- 0.8, 0.03, 1.5);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();
    }
}