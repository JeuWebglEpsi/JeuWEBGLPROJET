/**
 * Classe de gestion des énemis
 */
var EnemyManage = function () {
    var EnemyManage = this;
    this.enemy = [];
    this.perso = new Personnage();
}

/**
 * Fonction de création
 * @param  {number} x
 * @param  {number} y
 * @param  {number} z
 * @return {[nothing]}
 */
EnemyManage.prototype.createEnemy = function (x, y, z, mechantCount) {
    var EnemyManage = this;
    var cameraRobot = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    var cameraViewProjectionMatrix = new THREE.Matrix4();
    var frustum = new THREE.Frustum();

    cameraRobot.updateMatrixWorld() // = window.camera.updateMatrixWorld();
    cameraRobot.matrixWorldInverse.getInverse(cameraRobot.matrixWorld);
    cameraViewProjectionMatrix.multiplyMatrices(cameraRobot.projectionMatrix, cameraRobot.matrixWorldInverse);
    frustum.setFromMatrix(cameraViewProjectionMatrix);

    var loader = new THREE.JSONLoader();
    loader.load("/javascripts/Objects/robot.js", function (geometry, materials) {

        materials.push(new THREE.MeshPhongMaterial({
            emissive: 0x111111,
            map: cameraRobot.renderTarget
        }))
        var mechant = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial(materials), 0);


        mechant.id = mechantCount;
        mechant.name = "mechant_robot";
        mechant.__dirtyposition = true;
        mechant.__dirtyrotation = true;
       // EnemyManage.addInEnemy(mechant);

        mechant.scale.x = mechant.scale.y = mechant.scale.z = 15;

        var cube = new THREE.CylinderGeometry(20, 20, 90);

        var robotCollider = new Physijs.BoxMesh(cube,
            new THREE.MeshBasicMaterial({
                color: 0x888888,
                transparent: true,
                opacity: 0
            }), 0
        );
        robotCollider.life = 5;
        robotCollider.id = mechantCount;
        robotCollider.position.x = x;
        robotCollider.position.y = y;
        robotCollider.position.z = z;
        robotCollider.rotation.set(0, 0, 0);
        robotCollider.__dirtyposition = true;
        robotCollider.__dirtyrotation = true;
        robotCollider.name = "robotCollider";
        robotCollider.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            //window.game.localPlayer.set('_life', window.game.localPlayer.get('_life') - 20);
            console.log('robotCollider colliding with ' + other_object.name + ' ' + other_object.id + ' on ' + JSON.stringify(this.position));
            if (other_object.name === "bullet") {
                this.life--;
                if (this.life === 0) {
                    var luck = Math.floor((Math.random() * 100));
                    if (luck > 60)
                        window.game.map.createLoot(other_object, "ammo");
                    else if (luck > 30)
                        window.game.map.createLoot(other_object, "life");


                    scene.remove(this);
                }
            }

            if (other_object.name === "cameraCollider") {
                console.log("shoot");
                EnemyManage.shoot(robotCollider, other_object.position);
            }

        });

        // var cube_detect = new THREE.SphereGeometry(300);

        // var robotDetector = new THREE.Mesh(cube_detect,
        //     new THREE.MeshBasicMaterial({
        //         color: 0x888888,
        //         transparent: true,
        //         opacity: 0.5
        //     }), 0
        // );
        // robotDetector.rotation.set(0, 0, 0);
        // robotDetector.__dirtyposition = true;
        // robotDetector.__dirtyrotation = true;
        // robotDetector.name = "robotDetector";
        // robotDetector.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
        //     //window.game.localPlayer.set('_life', window.game.localPlayer.get('_life') - 20);
        //     console.log('robotDetector colliding with ' + other_object.name + ' ' + other_object.id + ' on ' + JSON.stringify(this.position));
        //     if (other_object.name === "cameraCollider") {
        //         console.log('robotDetector colliding with ' + other_object.name + ' ' + other_object.id + ' on ' + JSON.stringify(this.position));
            
        //     }

        // });

        // robotCollider.add(robotDetector);
        robotCollider.add(mechant);
        EnemyManage.addInEnemy(robotCollider);
        scene.add(robotCollider);
    });
}

/**
 * Fonction de création
 * @param  {number} x
 * @param  {number} y
 * @param  {number} z
 * @return {[nothing]}
 */

EnemyManage.prototype.createSuperEnemy = function (x, y, z, mechantCount) { 
    var EnemyManage = this;
    var loader = new THREE.JSONLoader();
    loader.load("/javascripts/Objects/robot.js", function (geometry, materials) {
        var mechant = new Physijs.BoxMesh(geometry, new THREE.MeshLambertMaterial(materials), 0);
        mechant.id = mechantCount;
        mechant.name = "super_mechant_robot";
        mechant.__dirtyposition = true;
        mechant.__dirtyrotation = true;
     //    EnemyManage.addInEnemy(mechant);

        mechant.scale.x = mechant.scale.y = mechant.scale.z = 20;
        var cube = new THREE.CylinderGeometry(30, 30, 120);
        var robotCollider = new Physijs.BoxMesh(cube,
            new THREE.MeshBasicMaterial({
                color: 0x888888,
                transparent: true,
                opacity: 0
            }), 0
        );
        robotCollider.life = 20;
        robotCollider.id = mechantCount;
        robotCollider.position.x = x;
        robotCollider.position.y = y;
        robotCollider.position.z = z;

        robotCollider.__dirtyposition = true;
        robotCollider.__dirtyrotation = true;
        robotCollider.name = "robotCollider";
        robotCollider.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            


            //window.game.localPlayer.set('_life', window.game.localPlayer.get('_life') - 20);
            console.log('robotCollider colliding with ' + other_object.name + ' ' + other_object.id + ' on ' + JSON.stringify(this.position));
            if (other_object.name === "bullet") {
                this.life--;
                console.log(this.life);
                if (this.life === 0) {
                    var luck = Math.floor((Math.random() * 100));
                    if (luck > 60)
                        window.game.map.createLoot(other_object, "ammo");
                    if (luck > 30)
                        window.game.map.createLoot(other_object, "life");


                    scene.remove(this);
                }
            }

        });

        robotCollider.rotation.set(0, 0, 0);
        robotCollider.add(mechant);
        EnemyManage.addInEnemy(robotCollider);
        scene.add(robotCollider);
    });

}

EnemyManage.prototype.shoot = function(robotCollider, vector) {

    var loader = new THREE.JSONLoader();

        var bulletCamera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1e7);
        var balle = new Physijs.BoxMesh(new THREE.SphereGeometry(1),
            new THREE.ShaderMaterial({
                uniforms: {
                    color: 0xFF0000
                },
                vertexShader: document.getElementById('vertexShaderBullet').textContent,
                fragmentShader: document.getElementById('fragmentShaderBullet').textContent,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending,
                transparent: true
            }), 1
        );
        balle.add(bulletCamera);
        balle.__dirtyPosition = true;

        // var vector = new THREE.Vector3(0, 0, -1);
        var pw = vector.applyMatrix4(robotCollider.matrixWorld);
         var dir = pw.sub(robotCollider.position).normalize();

        balle.name = 'mechant_bullet';
        balle.position.x = robotCollider.position.x + (1.20 * dir.x) + robotCollider.scale.x * dir.x;
        balle.position.y = robotCollider.position.y + (1.20 * dir.y) + robotCollider.scale.y * dir.y;
        balle.position.z = robotCollider.position.z + (1.20 * dir.z) + robotCollider.scale.z * dir.z;


        balle.movementSpeed = 50;


        balle.addEventListener('collision', function (other_object, relative_velocity, relative_rotation, contact_normal) {
            console.log('mechant bullet ' + this.id + ' in collision with ' + other_object.id + ' ' + other_object.name);
            if (other_object.name === "cameraCollider")
                window.game.localPlayer.set("_life", window.game.localPlayer.get('_life')-10);

            scene.remove(this);

        });
        console.log("create balle mechant");    
        scene.add(balle);

        balle.setLinearVelocity({
            x: balle.movementSpeed * dir.x,
            y: balle.movementSpeed * dir.y,
            z: balle.movementSpeed * dir.z
        });
    
};

EnemyManage.prototype.init = function (x,y,z) {

 }  
//ajouter un enemy
EnemyManage.prototype.addInEnemy = function (mechant) {
    var EenemyManage = this;
    EenemyManage.enemy.push({
        id: mechant.id,
        mechant: mechant
    });
    console.log("mechant added : " + mechant.id)
}

EnemyManage.prototype.update = function() {
     var EnemyManage = this;

    //  console.log('Biome updating...');
    var i = EnemyManage.enemy.length;
    while (i--) {
        var x = EnemyManage.enemy[i].robotCollider.position.x;
        var xx = x +1;
        EnemyManage.enemy[i].robotCollider.position.x = xx;
        // var test = EnemyManage.enemy[i].robotCollider.position;
        // test.y += 10;
        // EnemyManage.shoot(EnemyManage.enemy[i].robotCollider, test);



            
        }
    

}
    //ajouter un enemy
    EnemyManage.prototype.addInEnemy = function (robotCollider) {
        var EnemyManage = this;
        EnemyManage.enemy.push({
            id: robotCollider.id,
            robotCollider: robotCollider
        });
    }


setInterval(function() {
    var mechant = new EnemyManage();
    var i = mechant.enemy.length;
    while (i--) {
        var distance = mechant.enemy[i].robotCollider.position.distanceTo(window.cameraCollider_position);
         if ( distance <= 300) {
                    console.log(distance);
                    mechant.shoot(mechant.enemy[length].robotCollider, window.cameraCollider_position);
            }
    }


}, 1000);



if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = EnemyManage;
else
    window.EnemyManage = EnemyManage;
