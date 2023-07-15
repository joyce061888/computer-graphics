/**
 * Created by: Joyce Chung
 * Date: 04/01/2023
 * 
 * Creates a Jigglypuff Pokemon Frame
 */

// parameters that specify the geometrical structure of jigglypuff
var jigglypuffParams = {
    earHeight: 1.5,
    earRadius: 1.5,
    earOuterTheta: 4.4, 
    earInnerTheta: 2*Math.PI - 4.4,
    earAngle: -Math.PI/4,  // along z-axis

    eyeWhiteRadius: 0.8,
    outerIrisRadius: 0.7,
    innerIrisRadius: 0.6,
    eyeSpotRadius: 0.2,
    eyeAngleX: -Math.PI/24,
    eyeAngleY: +Math.PI/8, 

    mouthRadius: 0.5,
    // mouth below middle of face
    mouthAngleZ: 4, 
    // mouth on front of face (increase to move up)
    mouthAngleX: Math.PI/14,

    limbRadius: 0.4,
    limbLengthScale: 2,
    hipWidth: 1.5,

    hairRadius: 2,

    bodyRadius: 3,

    // colors
    bodyColor: 0xFAD9DC, // light pink
    mouthColor: 0xF08886, // light red
    eyeWhiteColor: 0xFFFFFF,
    outerIrisColor: 0x99DFE9, // light blue
    innerIrisColor: 0x64CAD7, // turquoise
    innerEarColor: 0x534845, // dark brown

    shininess: 5,
    specularColor: new THREE.Color("gray"),

    // mic params
    micRadius: 1,
    micStickRadius: 0.5,
    micStickHeight: 4,
    micColor: 0x669869, // dark green
    micStickColor: "black"
};

// materials for Jigglypuff and its mic
var jigglyBodyMat = new THREE.MeshPhongMaterial({color: jigglypuffParams.bodyColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading})
var jigglyMouthMat = new THREE.MeshPhongMaterial({color: jigglypuffParams.mouthColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading})
var eyeWhiteMaterial = new THREE.MeshPhongMaterial({color: jigglypuffParams.eyeWhiteColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading})
var outerIrisMaterial = new THREE.MeshPhongMaterial({color: jigglypuffParams.outerIrisColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading})
var innerIrisMaterial = new THREE.MeshPhongMaterial({color: jigglypuffParams.innerIrisColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading})
var innerEarMaterial = new THREE.MeshPhongMaterial({color: jigglypuffParams.innerEarColor, 
                                      specular: jigglypuffParams.specularColor,
                                      shininess: jigglypuffParams.shininess,
                                      flatShading: THREE.SmoothShading}) 
var micMat = new THREE.MeshPhongMaterial({color: jigglypuffParams.micColor, 
                                        specular: jigglypuffParams.specularColor,
                                        shininess: jigglypuffParams.wallShininess,
                                        flatShading: THREE.SmoothShading});
var micStickMat = new THREE.MeshPhongMaterial({color: jigglypuffParams.micStickColor, 
                                        specular: jigglypuffParams.specularColor,
                                        shininess: jigglypuffParams.wallShininess,
                                        flatShading: THREE.SmoothShading});


function createJigglyOuterEar(jigglypuffParams) {
    /* create and return a Mesh for an outer ear  */
    var r = jigglypuffParams.earRadius;
    var h = jigglypuffParams.earHeight;
    var t = jigglypuffParams.earOuterTheta;
    var earGeometry = new THREE.ConeGeometry(r,h,10,10, true, 0, t);
    var ear = new THREE.Mesh(earGeometry, jigglyBodyMat);
    return ear;
}

function createJigglyInnerEar(jigglypuffParams) {
    /* create and return a Mesh for an inner ear  */
    var r = jigglypuffParams.earRadius;
    var h = jigglypuffParams.earHeight;
    var t = jigglypuffParams.earInnerTheta;
    var earGeometry = new THREE.ConeGeometry(r,h,10,10, true, 4.4, t);
    var ear = new THREE.Mesh(earGeometry, innerEarMaterial);
    return ear;
}

function addJigglyEar(body,jigglypuffParams,side) {
    /* adds an ear to the head on the right (side=1) or left (side=-1).
     * The center of the ear is flush with the surface of the head by
     * moving it out by the radius, and rotating it around the Z axis
     * to get it to the desired height */
    var earFrame = new THREE.Object3D();
    var earOuter = createJigglyOuterEar(jigglypuffParams);
    var earInner = createJigglyInnerEar(jigglypuffParams);

    // rotate ears so inner ear faces front
    earOuter.rotation.y = Math.PI/4;
    earInner.rotation.y = Math.PI/4;

    var radius = jigglypuffParams.bodyRadius;

    earFrame.add(earOuter);
    earFrame.add(earInner);
    // position ear frame on top of body
    earFrame.position.x = side * radius/1.3; 
    earFrame.position.y = radius/1.3;
    // rotate ear frame towards body 
    earFrame.rotation.z = jigglypuffParams.earAngle * side;

    body.add(earFrame);
    return body;
}

function createJigglyEyeLayer(jigglypuffParams, type) {
    /*create and return a Mesh for an eye layer based on type*/
    var eyeGeometry;
    var eyeMesh;
    if (type == "eyeWhite") {
        eyeGeometry = new THREE.CircleGeometry(jigglypuffParams.eyeWhiteRadius,30,30);
        eyeMesh = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    } else if (type == "outerIris") {
        eyeGeometry = new THREE.CircleGeometry(jigglypuffParams.outerIrisRadius,30,30);
        eyeMesh = new THREE.Mesh(eyeGeometry, outerIrisMaterial);
    } else if (type == "innerIris") {
        eyeGeometry = new THREE.CircleGeometry(jigglypuffParams.innerIrisRadius,30,30);
        eyeMesh = new THREE.Mesh(eyeGeometry, innerIrisMaterial);
    } else if (type == "eyeSpot") {
        eyeGeometry = new THREE.CircleGeometry(jigglypuffParams.eyeSpotRadius,30,30);
        eyeMesh = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    } 
    return eyeMesh;
}

function addJigglyEye(body, jigglypuffParams, side) {
    /* adds an eye to the head on the right (side=1) or left (side=-1).
     * The center of the eye is flush with the surface of the head by
     * moving it out along the Z axis by the radius, and rotating it
     * around the X and then Y axes to get it to the desired height */
    var eyeFrame = new THREE.Object3D();
    var eyeWhite = createJigglyEyeLayer(jigglypuffParams, "eyeWhite");
    var outerIris = createJigglyEyeLayer(jigglypuffParams, "outerIris");
    var innerIris = createJigglyEyeLayer(jigglypuffParams, "innerIris");
    var eyeSpot = createJigglyEyeLayer(jigglypuffParams, "eyeSpot");

    // position eye frame on front of body
    var r = jigglypuffParams.bodyRadius;
    eyeWhite.position.z = r;
    outerIris.position.z = r + 0.01;
    innerIris.position.z = r + 0.02;
    // position eye spot in eye corners
    var eyeSpotMove = jigglypuffParams.innerIrisRadius - jigglypuffParams.eyeSpotRadius*2;
    eyeSpot.position.set(eyeSpotMove, eyeSpotMove, r + 0.03);

    eyeFrame.add(eyeWhite);
    eyeFrame.add(outerIris);
    eyeFrame.add(innerIris);
    eyeFrame.add(eyeSpot);

    var angleX = jigglypuffParams.eyeAngleX;  
    var angleY = jigglypuffParams.eyeAngleY; 
     // positions eyes above the nose about x-axis 
    eyeFrame.rotation.x = angleX;
    // positions eyes on each side of y-axis  
    eyeFrame.rotation.y = side * angleY; 

    body.add(eyeFrame);
    return body;
}

function createJigglyMouth(jigglypuffParams) {
    /* create and returns a Mesh for the mouth */
    var radius = jigglypuffParams.mouthRadius;
    var mouthGeometry = new THREE.CircleGeometry(radius, 30, 30, Math.PI);
    var mouthMesh = new THREE.Mesh(mouthGeometry, jigglyMouthMat);
    return mouthMesh;
}

function addJigglyMouth(body, jigglypuffParams) {
    /*
     * adds a mouth to the body frame along 
     * the z-axis and returns the body frame with the mouth
     */
    var mouthFrame = new THREE.Object3D();
    var mouth = createJigglyMouth(jigglypuffParams);
    // position mouth on front of face
    var radius = jigglypuffParams.bodyRadius;
    mouth.position.z = radius;   
    // rotate mouth to be straight smile
    mouth.rotation.z = Math.PI/6;  
    // rotate mouth frame to be at bottom/front face
    var angleX = jigglypuffParams.mouthAngleX;
    var angleZ = jigglypuffParams.mouthAngleZ;
    mouthFrame.rotation.x = angleX;
    mouthFrame.rotation.z = angleZ;
    mouthFrame.add(mouth);
    body.add(mouthFrame);
    return body;
}

function createJigglyLimb(jigglypuffParams) {
    /* creates and returns an arm Mesh */
    var radius = jigglypuffParams.limbRadius;
    var limbGeometry = new THREE.SphereGeometry(radius,100,100);
    var limbMesh = new THREE.Mesh(limbGeometry, jigglyBodyMat);
    // strectches the arm along y-axis
    limbMesh.scale.y = jigglypuffParams.limbLengthScale;  
    return limbMesh;
}

function addJigglyArm(body, jigglypuffParams, side) {
    /* adds an arm to jigglypuff on the right (side=1) or left (side=-1) */
    var arm = createJigglyLimb(jigglypuffParams);
    var radius = jigglypuffParams.bodyRadius;
    // position arm on sides of body relative to x and y axis
    var sx = radius + 0.2;
    var sy = radius - (jigglypuffParams.bodyRadius + 1); 
    arm.position.set(side * sx, sy, 0);
    // rotate arm to point up, slanted
    arm.rotation.z = side * -Math.PI/3; 
    body.add(arm);
    return body;
}

function addJigglyLeg(body, jigglypuffParams, side) {
    /* adds a leg to jigglypuff on the right (side=1) or left (side=-1) */
    var leg = createJigglyLimb(jigglypuffParams);
    // give width between legs
    var hx = jigglypuffParams.hipWidth;
    var hy = -jigglypuffParams.bodyRadius;
    leg.position.set(side * hx, hy, 0);
    // rotate leg to horizontal
    leg.rotation.z = side * Math.PI/2; 
    body.add(leg);
    return body;
}

// control points for the hair
var topToBottomControlPoints = [
    [ [0,2,0],  [0,3,0],  [1,3,0],  [1,2,0] ],
    [ [0.5,1,0], [1,1,1],  [2,2,1],  [2,2,0] ],
    [ [0.5,1,0], [1,1,1],  [1,1,1],  [1,1,0] ],
    [ [0,1,0],  [0.5,0.8,0], [0.5,0.8,0], [0.3,0.8,0] ],
];
   
function createJigglyHair() {
    /* creates and returns hair Mesh using bezier curves */
    var hairGeom = new THREE.BezierSurfaceGeometry( topToBottomControlPoints.reverse(), 10, 10 );;
    var hairMesh = new THREE.Mesh(hairGeom, jigglyBodyMat);
    return hairMesh;
}

function addJigglyHair(body, jigglypuffParams) {
    /* adds the hair Mesh to jigglypuff on the top, front of its body */
    var hair = createJigglyHair();
    hair.position.set(-jigglypuffParams.bodyRadius/5, jigglypuffParams.bodyRadius/3, jigglypuffParams.bodyRadius);
    hair.rotation.x = -Math.PI/4;
    body.add(hair);
    return body;
}

function createJigglypuff(jigglypuffParams) {
    /*creates and returns a jigglypuff Object for the clown*/
    var jigglypuff = new THREE.Object3D();
    var radius = jigglypuffParams.bodyRadius;
    var jigglypuffGeom = new THREE.SphereGeometry(radius,100,100);
    var jigglypuffMesh = new THREE.Mesh(jigglypuffGeom, jigglyBodyMat);
    jigglypuff.add(jigglypuffMesh);
    addJigglyEar(jigglypuff, jigglypuffParams, 1);
    addJigglyEar(jigglypuff, jigglypuffParams, -1);
    addJigglyEye(jigglypuff, jigglypuffParams, 1);
    addJigglyEye(jigglypuff, jigglypuffParams, -1);
    addJigglyMouth(jigglypuff, jigglypuffParams);
    addJigglyArm(jigglypuff, jigglypuffParams, 1);
    addJigglyArm(jigglypuff, jigglypuffParams, -1);
    addJigglyLeg(jigglypuff, jigglypuffParams, 1);
    addJigglyLeg(jigglypuff, jigglypuffParams, -1);
    addJigglyHair(jigglypuff, jigglypuffParams);
    // position jigglypuff above origin
    var jigglypuffHalfHeight = jigglypuffParams.bodyRadius 
    + jigglypuffParams.limbRadius*2/jigglypuffParams.limbLengthScale;
    jigglypuff.position.y = jigglypuffHalfHeight;
    return jigglypuff;
}

function createMic(jigglypuffParams) {
    /* creates microphone in a frame for jigglypuff */
    var micFrame = new THREE.Object3D();
    // create the top part of mic
    var micR = jigglypuffParams.micRadius;
    var micGeom = new THREE.SphereGeometry(micR, 20, 20);
    var micMesh = new THREE.Mesh(micGeom, micMat);
    micMesh.scale.y = 1.2;
    micFrame.add(micMesh);
    // create the stick of the mic
    var micStickR = jigglypuffParams.micStickRadius;
    var micStickH = jigglypuffParams.micStickHeight;
    var micStickGeom = new THREE.CylinderGeometry(micStickR, micStickR, micStickH, 20, 20);
    var micStickMesh = new THREE.Mesh(micStickGeom, micStickMat);
    micStickMesh.position.y = -(micStickH - micR*1.2);
    micFrame.add(micStickMesh);
    // position micFrame above origin
    micFrame.position.y = micStickH + micR/1.2;
    return micFrame;
}

function createJigglypuffWithMic(jigglypuffParams) {
    var jigglyWithMic = new THREE.Object3D();
    var jigglypuff = createJigglypuff(jigglypuffParams);
    var mic = createMic(jigglypuffParams);
    // position the mic relative the jigglypuff's left hand
    var micX = -(jigglypuffParams.bodyRadius + jigglypuffParams.limbRadius);
    mic.position.x = micX;
    mic.scale.set(0.5,0.5,0.5);
    // add jigglypuff and mic to same frame
    jigglyWithMic.add(jigglypuff);
    jigglyWithMic.add(mic);
    return jigglyWithMic;
}