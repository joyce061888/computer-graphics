/**
 * Created by: Joyce Chung
 * Date: 04/05/2023
 * 
 * Creates a Heart Bezier Surface Frame Object 
 * using top to bottom control points.
 */

// params for the box scene
var sceneParams = {
    boxWidth: 50, 
    boxHeight: 50, 
    boxDepth: 50, 
    specularColor: new THREE.Color("gray"), 
    wallShininess: 5,
    // wall colors
    sideWallColor: 0x2496c7,
    topWallColor: 0x32964d, 
    floorColor: 0xfac9a0,
    // lighting
    spotlightX: 0,
    spotlightY: 0,
    spotlightZ: 0,
    spotlightColor: 0xaba9a9,
    ambLightColor: "grey", 
    dirLightColor: "grey"  
}

// control points for right half of the heart
var topToBottom = [
    [ [0,2,0],  [0,3,0],  [1,3,0],  [1,2,0] ],
    [ [0,2,1], [1,2,1],  [2,2,1],  [2,2,0] ],
    [ [0,1,1], [0,1,1],  [1,1,1],  [1,1,0] ],
    [ [0,0,0],  [0,0,0], [0,0,0], [0,0,0] ],
];

var heartMaterial = new THREE.MeshPhongMaterial({color: 0xEA9D9D, // light red
                                                specular: 0xE9E9E9, // light gray
                                                shininess: 5,
                                                flatShading: THREE.SmoothShading})

function createHeart() {
    /* Creates a bezier surface heart and adds the Mesh to a frame */
    var heartFrame = new THREE.Object3D();
    var surfGeom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );

    // the four half hearts for the front and back side
    //right front side of half the heart
    var surfRightMesh = new THREE.Mesh(surfGeom, heartMaterial);
    // left front side of half the heart
    var surfLeftMesh = surfRightMesh.clone();
    surfLeftMesh.scale.x = -1;
    // right back side of half the heart
    var surfBackRightMesh = surfRightMesh.clone();
    surfBackRightMesh.scale.x = -1;
    surfBackRightMesh.scale.z = -1;
    // left back side of half the heart
    var surfBackLeftMesh = surfRightMesh.clone();
    surfBackLeftMesh.scale.z = -1;

    heartFrame.add(surfRightMesh);
    heartFrame.add(surfLeftMesh);
    heartFrame.add(surfBackRightMesh);
    heartFrame.add(surfBackLeftMesh);

    return heartFrame;
}



