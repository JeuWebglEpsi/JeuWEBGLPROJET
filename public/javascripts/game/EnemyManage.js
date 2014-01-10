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
        EnemyManage.addInEnemy(mechant);

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
                if (this.life === 0) {
                    var luck = Math.floor((Math.random() * 100));
                    if (luck > 60)
                        window.game.map.createLoot(other_object, "ammo");
                    else if (luck > 30)
                        window.game.map.createLoot(other_object, "life");


                    scene.remove(this);
                }
            }

        });

        robotCollider.rotation.set(0, 0, 0);
        robotCollider.add(mechant);
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
<<<<<<< HEAD
<<<<<<< HEAD
EnemyManage.prototype.createSuperEnemy = function (x, y, z, mechantCount) { 
=======
EnemyManage.prototype.createSuperEnemy = function (x, y, z) {
>>>>>>> f799550cfd00319c2e2eee9e144b3ea668f335ac
=======
EnemyManage.prototype.createSuperEnemy = function (x, y, z) {
>>>>>>> 71d2a40280fd3957643df2f830ba6204a42dfb62
    var EnemyManage = this;
    var loader = new THREE.JSONLoader();
    loader.load("/javascripts/Objects/robot.js", function (geometry, materials) {
        var mechant = new Physijs.BoxMesh(geometry, new THREE.MeshLambertMaterial(materials), 0);
        mechant.id = mechantCount;
        mechant.name = "super_mechant_robot";
        mechant.__dirtyposition = true;
        mechant.__dirtyrotation = true;
         EnemyManage.addInEnemy(mechant);

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

        scene.add(robotCollider);
    });

}



EnemyManage.prototype.init = function (x, y, z) {
<<<<<<< HEAD
<<<<<<< HEAD
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

EnemyManage.prototype.update = function(arguments) {
    // body...
=======
=======
>>>>>>> 71d2a40280fd3957643df2f830ba6204a42dfb62

    //ajouter un enemy
    EnemyManage.prototype.addInEnemy = function (mechant) {
        var EenemyManage = this;
        biome.enemy.push({
            id: mechant.id,
            mechant: mechant
        });
    }
<<<<<<< HEAD
>>>>>>> f799550cfd00319c2e2eee9e144b3ea668f335ac
=======
>>>>>>> 71d2a40280fd3957643df2f830ba6204a42dfb62
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = EnemyManage;
else
    window.EnemyManage = EnemyManage;
