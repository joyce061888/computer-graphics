/**
 * Created by: Joyce Chung
 * Date: 04/10/2023
 * 
 * Creates a 'Z' Frame
 */

// a straight line in +y-dir. of len 1
var zStraightControlPoints = [ [0,0,0],
                      [0,0.5,0],
                      [0,0.7,0],
                      [0,1,0] ]; 

// a straight line in +y-dir. of len radical 2 ~ 1.414                 
var zMidControlPoints = [ [0,0,0],
                      [0,0.5,0],
                      [0,0.7,0],
                      [0,1.414,0] ]; 
        

function createZ() {
    /* creates z in a frame, to show snorlax sleeping */
    var zFrame = new THREE.Object3D();
    // straight lines of Z
    var lineGeom = TW.createBezierCurve(zStraightControlPoints, 20);
    var lineMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
                                              linewidth: 1 } );
    var line1 = new THREE.Line( lineGeom, lineMat );
    var line2 = line1.clone();
    // middle line of Z
    var lineMidGeom = TW.createBezierCurve(zMidControlPoints, 20);
    var lineMidMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
                                              linewidth: 1 } );
    var line3 = new THREE.Line( lineMidGeom, lineMidMat );
    // position and rotate lines to make a 'Z'
    line1.rotation.z = Math.PI/2; // rotate line so parallel to x-axis
    line2.position.z = 1;
    line2.rotation.z = Math.PI/2;
    line3.rotation.set(0, Math.PI/4, Math.PI/2);
    
    zFrame.add(line1);
    zFrame.add(line2);
    zFrame.add(line3);

    // rotate zFrame to face forward
    zFrame.rotation.x = Math.PI/2;

    return zFrame;
}

function createZZZ() {
    /* creates zzz in a frame, to show snorlax sleeping */
    var zzzFrame = new THREE.Object3D();
    var z1 = createZ();
    var z2 = createZ();
    var z3 = createZ();
    // position the z's relative to each other (2 units up & right)
    z2.position.set(2, 2, 0);
    z3.position.set(4, 4, 0);
    // add z's to a frame
    zzzFrame.add(z1);
    zzzFrame.add(z2);
    zzzFrame.add(z3);
    return zzzFrame;
}