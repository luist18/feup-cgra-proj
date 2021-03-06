//From https://github.com/EvanHahn/ScriptInclude
include = function () { function f() { var a = this.readyState; (!a || /ded|te/.test(a)) && (c--, !c && e && d()) } var a = arguments, b = document, c = a.length, d = a[c - 1], e = d.call; e && c--; for (var g, h = 0; c > h; h++)g = b.createElement("script"), g.src = arguments[h], g.async = !0, g.onload = g.onerror = g.onreadystatechange = f, (b.head || b.getElementsByTagName("head")[0]).appendChild(g) };
serialInclude = function (a) { var b = console, c = serialInclude.l; if (a.length > 0) c.splice(0, 0, a); else b.log("Done!"); if (c.length > 0) { if (c[0].length > 1) { var d = c[0].splice(0, 1); b.log("Loading " + d + "..."); include(d, function () { serialInclude([]); }); } else { var e = c[0][0]; c.splice(0, 1); e.call(); }; } else b.log("Finished."); }; serialInclude.l = new Array();

serialInclude(['../lib/CGF.js',
    'MyScene.js',
    'MyInterface.js',
    'model/MySphere.js',
    'model/MyCylinder.js',
    'model/MyCubeMap.js',
    'model/MyPlane.js',
    'model/MyUnitCube.js',
    'terrain/MyTerrain.js',
    'blimp/MyVehicle.js',
    'blimp/MyTurbine.js',
    'blimp/MyFlag.js',
    'blimp/wing/MyWing.js',
    'blimp/wing/MyWingsManager.js',
    'supply/MySupply.js',
    'supply/MySupplyManager.js',
    'billboard/MyBillboard.js',
    'util/sound.js',

    main = function () {
        var app = new CGFapplication(document.body);
        var myScene = new MyScene();
        var myInterface = new MyInterface();
        
        var img = document.getElementById('lake1');
        myScene.canvas.push(document.createElement('canvas'));
        myScene.canvas[0].width = img.width;
        myScene.canvas[0].height = img.height;
        myScene.canvas[0].getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        var img = document.getElementById('lake2');
        myScene.canvas.push(document.createElement('canvas'));
        myScene.canvas[1].width = img.width;
        myScene.canvas[1].height = img.height;
        myScene.canvas[1].getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        var img = document.getElementById('canyon');
        myScene.canvas.push(document.createElement('canvas'));
        myScene.canvas[2].width = img.width;
        myScene.canvas[2].height = img.height;
        myScene.canvas[2].getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        var img = document.getElementById('given');
        myScene.canvas.push(document.createElement('canvas'));
        myScene.canvas[3].width = img.width;
        myScene.canvas[3].height = img.height;
        myScene.canvas[3].getContext('2d').drawImage(img, 0, 0, img.width, img.height);

        setTimeout(() => {
            app.init();
            app.setScene(myScene);
            app.setInterface(myInterface);
    
            myInterface.setActiveCamera(myScene.camera);
    
            app.run();
        }, 300);
    }

]);