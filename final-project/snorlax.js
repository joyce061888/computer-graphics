/**
 * Created by: Joyce Chung
 * Date: 04/09/2023
 * 
 * Creates a Snorlax Pokemon Frame 
 */

// parameters that specify the geometrical structure of snorlax
var snorlaxParams = {
    earHeight: 1.5,
    earRadius: 1.5,
    earAngle: -Math.PI/4,  // along z-axis

    faceRadius: 5,
    facePhi: 4.7,  
    faceTheta: 0.5,

    armRadius: 1.2,
    armLengthScale: 2,
    
    footRadius: 1.5,
    footScaleZ: 0.5,
    footSoleRadius: 1.6,
    footSoleTheta: 1,
    hipWidth: 3.5,

    headRadius: 3,

    bodyScaleX: 1.15,
    bodyRadius: 5,
    innerBodyRadius: 7,
    innerBodyTheta: 0.5,

    // colors
    bodyColor: 0x50A5AD, // dark turquoise
    blackColor: 0x000000, 
    whiteColor: 0xFFFFFF,
    innerBodyColor: 0xE4DDDA, // beige
    footColor: 0xA7948D, // brown

    shininess: 5,
    specularColor: new THREE.Color("gray")
};

// materials for Snorlax
var snorlaxBodyMat = new THREE.MeshPhongMaterial({color: snorlaxParams.bodyColor, 
                                      specular: snorlaxParams.specularColor,
                                      shininess: snorlaxParams.shininess,
                                      flatShading: THREE.SmoothShading})
var snorlaxInnerBodyMat = new THREE.MeshPhongMaterial({color: snorlaxParams.innerBodyColor, 
                                      specular: snorlaxParams.specularColor,
                                      shininess: snorlaxParams.shininess,
                                      flatShading: THREE.SmoothShading})
var snorlaxFootMat = new THREE.MeshPhongMaterial({color: snorlaxParams.footColor, 
                                      specular: snorlaxParams.specularColor,
                                      shininess: snorlaxParams.shininess,
                                      flatShading: THREE.SmoothShading}) 

function createSnorlaxEar(snorlaxParams) {
    /* create and return a Mesh for an ear  */
    var r = snorlaxParams.earRadius;
    var h = snorlaxParams.earHeight;
    var earGeometry = new THREE.ConeGeometry(r, h, 20, 20, true, 0);
    var ear = new THREE.Mesh(earGeometry, snorlaxBodyMat);
    return ear;
}

function addSnorlaxEar(head,snorlaxParams,side) {
    /* adds an ear to the head on the right (side=1) or left (side=-1).
     * The center of the ear is flush with the surface of the head by
     * moving it out by the radius, and rotating it around the Z axis
     * to get it to the desired height */
    var earFrame = new THREE.Object3D();
    var ear = createSnorlaxEar(snorlaxParams);

    var radius = snorlaxParams.headRadius;
    earFrame.add(ear);
    // position ear frame on top of body
    earFrame.position.x = side * radius/1.3; 
    earFrame.position.y = radius/1.3;
    // rotate ear frame towards body 
    earFrame.rotation.z = snorlaxParams.earAngle * side;

    head.add(earFrame);
    return head;
}

var eyeSnorlaxControlPoints = [ [0,0,0],
                      [0,0.5,0],
                      [0,0.7,0],
                      [0,0.9,0] ];

function createSnorlaxEye(snorlaxParams) {
    /* creates an eye, which is a line and returns the line */
    var curveGeom = TW.createBezierCurve(eyeSnorlaxControlPoints, 20);
    var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
                                              linewidth: 1 } );
    var eyeCurve = new THREE.Line( curveGeom, curveMat );
    return eyeCurve;
}

function addSnorlaxEye(face, snorlaxParams, side) {
    /* adds an eye to the given side of the face and adds
    the eye Mesh to the face frame */
    var eye = createSnorlaxEye(snorlaxParams);
    // position the eye depending on side of y-axis
    if (side == 1) {
        eye.position.set(snorlaxParams.headRadius/2, snorlaxParams.headRadius+2, 0)
    } else {
        eye.position.set(-snorlaxParams.headRadius/4, snorlaxParams.headRadius+2, 0)
    }
    // rotate the line object so that it's parallel to the x-axis
    eye.rotation.z = Math.PI/2;
    face.add(eye);
    return face;
}

var mouthSnorlaxControlPoints = [ [0,0,-0.2],
                      [0,0.5,0],
                      [0,1,0],
                      [0,1.5,-0.2] ];

function createSnorlaxMouth() {
    /* creates an mouth, which is a line and returns the line */
    var curveGeom = TW.createBezierCurve(mouthSnorlaxControlPoints, 20);
    var curveMat = new THREE.LineBasicMaterial( { color: THREE.ColorKeywords.black,
                                              linewidth: 1 } );
    var mouthCurve = new THREE.Line( curveGeom, curveMat );
    return mouthCurve;
}

function addSnorlaxMouth(face, snorlaxParams) {
    /* adds a mouth to the front of face and adds
    the mouth Mesh to the face frame */
    var mouth = createSnorlaxMouth();
    // position the mouth below the eyes on the face
    var moveX = snorlaxParams.headRadius/4;
    var moveY = snorlaxParams.headRadius*1.7 - 0.3;
    var moveZ = snorlaxParams.headRadius/2;
    mouth.position.set(moveX, moveY, moveZ);
    // rotate the line object so that it's parallel to the x-axis
    mouth.rotation.z = Math.PI/2;
    face.add(mouth);
    return face;
}

function createSnorlaxFace(snorlaxParams) {
    /* create and return a Mesh for the face  */
    var r = snorlaxParams.faceRadius;
    var t = snorlaxParams.faceTheta;
    var faceGeometry = new THREE.SphereGeometry(r, 20, 20, 5.5, snorlaxParams.facePhi, 0, t);
    var face = new THREE.Mesh(faceGeometry, snorlaxInnerBodyMat);
    return face;
}

function addSnorlaxFace(head, snorlaxParams) {
    var faceFrame = new THREE.Object3D();
    var face = createSnorlaxFace(snorlaxParams);
    faceFrame.add(face);
    // position face in front of head
    faceFrame.position.set(0, 0, -snorlaxParams.headRadius/1.5);
    // rotate face to front 
    faceFrame.rotation.x = Math.PI/2;
    // add eyes to face frame
    addSnorlaxEye(faceFrame, snorlaxParams, 1);
    addSnorlaxEye(faceFrame, snorlaxParams, -1);
    // add mouth to face frame
    addSnorlaxMouth(faceFrame, snorlaxParams);
    head.add(faceFrame);
    return head;
}

function createSnorlaxHead(snorlaxParams) {
    /* creates and returns a head for snorlax */
    var head = new THREE.Object3D();
    var radius = snorlaxParams.headRadius;
    var headGeom = new THREE.SphereGeometry(radius,100,100);
    var headMesh = new THREE.Mesh(headGeom, snorlaxBodyMat);
    head.add(headMesh);
    addSnorlaxEar(head, snorlaxParams, 1);
    addSnorlaxEar(head, snorlaxParams, -1);
    addSnorlaxFace(head, snorlaxParams);
    return head;
}

function createSnorlaxArm(snorlaxParams) {
    /* creates and returns an arm for snorlax
     depending on the side */
    var radius = snorlaxParams.armRadius;
    var armGeometry = new THREE.SphereGeometry(radius,100,100);
    var armMesh = new THREE.Mesh(armGeometry, snorlaxBodyMat);
    // strectches the arm along y-axis
    armMesh.scale.y = snorlaxParams.armLengthScale;  
    return armMesh;
}

function addSnorlaxArm(body, snorlaxParams, side) {
    /* adds an arm to snorlax on the right (side=1) or left (side=-1) */
    var arm = createSnorlaxArm(snorlaxParams);
    var radius = snorlaxParams.bodyRadius;
    // position arm on sides of body relative to x and y axis
    var sx = radius;
    var sy = radius - (radius/1.5); 
    arm.position.set(side * sx, sy, 0);
    // rotate arm to point up, slanted
    arm.rotation.z = side * Math.PI/4; 
    body.add(arm);
    return body;
}

function createSnorlaxFoot(snorlaxParams) {
    /* creates and returns a foot for snorlax
     depending on the side */
    var footFrame = new THREE.Object3D();

    // create the foot
    var radius = snorlaxParams.footRadius;
    var footGeometry = new THREE.SphereGeometry(radius,100,100);
    var footMesh = new THREE.Mesh(footGeometry, snorlaxInnerBodyMat); 
    // shrinks the foot along x-axis
    footMesh.scale.z = snorlaxParams.footScaleZ;  
    footFrame.add(footMesh);

    // create the foot sole 
    var r = snorlaxParams.footSoleRadius;
    var t = snorlaxParams.footSoleTheta;
    var footSoleGeometry = new THREE.SphereGeometry(r, 20, 20, 0, Math.PI*2, 0, t);
    var footSoleMesh = new THREE.Mesh(footSoleGeometry, snorlaxFootMat);
    // position foot sole in front of foot
    footSoleMesh.position.set(0, 0, snorlaxParams.bodyRadius/10 - 1.2);
    // rotate foot sole in front of foot
    footSoleMesh.rotation.x = Math.PI/2;
    footFrame.add(footSoleMesh);

    return footFrame;
}

function addSnorlaxFoot(body, snorlaxParams, side) {
    /* adds a foot to snorlax on the right (side=1) or left (side=-1) */
    var foot = createSnorlaxFoot(snorlaxParams);
    // give width between legs
    var hx = snorlaxParams.hipWidth;
    var hy = -snorlaxParams.bodyRadius/1.5;
    var hz = snorlaxParams.bodyRadius/1.5;
    foot.position.set(side * hx, hy, hz);
    // rotate leg to horizontal
    foot.rotation.x = Math.PI/6; 
    body.add(foot);
    return body;
}

function createSnorlaxBody(snorlaxParams) {
    var body = new THREE.Object3D();
    var radius = snorlaxParams.bodyRadius;
    var bodyGeom = new THREE.SphereGeometry(radius,100,100);
    var bodyMesh = new THREE.Mesh(bodyGeom, snorlaxBodyMat);
    // strectches the body along x-axis
    var scale = snorlaxParams.bodyScaleX;
    bodyMesh.scale.x = scale;  
    body.add(bodyMesh);
    // inner beige body 
    var r = snorlaxParams.innerBodyRadius;
    var t = snorlaxParams.innerBodyTheta;
    var innerBodyGeometry = new THREE.SphereGeometry(r, 20, 20, 0, Math.PI*2, 0, t);
    var innerBodyMesh = new THREE.Mesh(innerBodyGeometry, snorlaxInnerBodyMat);
    // position inner body in front of body
    innerBodyMesh.position.set(0, 0, snorlaxParams.bodyRadius/2 - 4.5);
    // rotate inner body to front of body
    innerBodyMesh.rotation.x = Math.PI/2;
    body.add(innerBodyMesh);
    // add arms and feet
    addSnorlaxArm(body, snorlaxParams, 1);
    addSnorlaxArm(body, snorlaxParams, -1);
    addSnorlaxFoot(body, snorlaxParams, 1);
    addSnorlaxFoot(body, snorlaxParams, -1);
    return body;
}

function createSnorlax(snorlaxParams) {
    var snorlaxAboveOrigin = new THREE.Object3D();
    var snorlax = new THREE.Object3D();
    var head = createSnorlaxHead(snorlaxParams);
    var body = createSnorlaxBody(snorlaxParams);
    // position body below head
    body.position.y = -snorlaxParams.headRadius*2.2;
    snorlax.add(body);
    snorlax.add(head);
    // position snorlax on top of origin
    snorlax.position.y = snorlaxParams.headRadius 
    + snorlaxParams.bodyRadius*2/snorlaxParams.bodyScaleX;
    snorlaxAboveOrigin.add(snorlax);
    return snorlaxAboveOrigin;
}
