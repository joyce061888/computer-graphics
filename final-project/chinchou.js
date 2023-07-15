/**
 * Author: Emily Lu
 * Date: 04/14/2023
 * 
 * Creates a Chinchou Pokemon object nested inside of a frame
 */

// parameters that specify the dimensions and colors
//  of the geometric structures that make up chinchou
chinchouParams = {
    // torso
    torsoRadius: 2.5,
    torsoScaleX: 1.9,
    torsoScaleY: 1.205,
    torsoScaleZ: 1.55,
    torsoColor: 0x7598c8, // blue
    // eye
    eyeRadius: 0.35,
    eyeCrossRadius: 0.3,
    eyeCrossTube: 0.07,
    eyeAngleX: -Math.PI/12,
    eyeAngleY: Math.PI/8,
    eyeColor: 0xfde64b, // eye socket: yellow
    eyeCrossColor: 0x000000, // eye cross: black
    // mouth
    mouthRadius: 0.65,
    mouthTube: 0.06,
    mouthArc: Math.PI/3,
    mouthColor: 0x000000, // black

    // fin
    finColor: 0xb2bfc2, // light blue grey
    finScale: 0.5,

    // antenna
    antennaScale: 0.55,
    antennaRadius: 12,
    antennaTube: 0.15,
    antennaArc: 5 * Math.PI/6,
    antennaColor: 0x7598c8, // blue
    // bulb
    bulbScale: 1,
    bulbColor: 0xfde64b,
    bulbShininess: 10,
    // lightbulb
    lightbulbRotateY: Math.PI/6, 

    // foot
    footRadius: 0.75,
    footScaleZ: 1.5,
    footScaleY: 0.2,
    footColor: 0x7598c8,

    // reflectivity
    shininess: 3,
    specularColor: new THREE.Color("gray") 
}

// materials for chinchou's body parts
chinchouMaterials = {
    torsoMat: new THREE.MeshPhongMaterial({color: chinchouParams.torsoColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
    eyeMat: new THREE.MeshPhongMaterial({color: chinchouParams.eyeColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
    eyeCrossMat: new THREE.MeshPhongMaterial({color: chinchouParams.eyeCrossColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
    mouthMat: new THREE.MeshPhongMaterial({color: chinchouParams.mouthColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
    finMat: new THREE.MeshPhongMaterial({color: chinchouParams.finColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),                           
    antennaMat: new THREE.MeshPhongMaterial({color: chinchouParams.antennaColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
    bulbMat: new THREE.MeshPhongMaterial({color: chinchouParams.bulbColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.bulbShininess,
                                        flatShading: THREE.SmoothShading}),                                
    footMat: new THREE.MeshPhongMaterial({color: chinchouParams.footColor,
                                        specular: chinchouParams.specularColor,
                                        shininess: chinchouParams.shininess,
                                        flatShading: THREE.SmoothShading}),
                                    }

function createChinchouTorso(){
    /** 
     * Creates chinchou's torso.
    */

    // create frame
    var torsoFrame = new THREE.Object3D();
   
    var radius = chinchouParams.torsoRadius;
    var torsoGeom = new THREE.SphereGeometry(radius, 64, 32);
    var mat = chinchouMaterials.torsoMat;
    var torsoMesh = new THREE.Mesh(torsoGeom, mat);

    // scale torso in x, y, z
    var scaleZ = chinchouParams.torsoScaleZ;
    torsoMesh.scale.z = scaleZ;
    var scaleX = chinchouParams.torsoScaleX;
    torsoMesh.scale.x = scaleX;
    var scaleY = chinchouParams.torsoScaleY;
    torsoMesh.scale.y = scaleY;
    torsoFrame.add(torsoMesh);
    return torsoFrame;
}

function createChinchouEye(){
    /** 
     * creates an eye for chinchou
    */
    // create eye frame
    var frame = new THREE.Object3D();
    var scaleX = chinchouParams.torsoScaleX;
    var scaleY = chinchouParams.torsoScaleY;
    var scaleZ = chinchouParams.torsoScaleZ;

    // make the eye "socket"
    var radius = chinchouParams.eyeRadius;
    var eyeGeom = new THREE.SphereGeometry(radius, 64, 32);
    var eyeMat = chinchouMaterials.eyeMat;
    var eyeMesh = new THREE.Mesh(eyeGeom, eyeMat);
    // scale the socket wrt torso
    eyeMesh.scale.x = scaleX*1.85;
    eyeMesh.scale.y = scaleY*2.5;
    eyeMesh.scale.z = scaleZ/2;
    frame.add(eyeMesh);

    // make the eye "lines"
    var crossRadius = chinchouParams.eyeCrossRadius;
    var crossTube = chinchouParams.eyeCrossTube;

    // make the horizontal eye "line"
    var crossGeom = new THREE.TorusGeometry(crossRadius, crossTube, 
                                            30, 64, Math.PI);
    var crossMat = chinchouMaterials.eyeCrossMat;
    var crossMesh = new THREE.Mesh(crossGeom, crossMat);
    // move eye "line" to edge of eye "socket"
    crossMesh.position.z = radius/24;
    // flip eye "line" out so it's visible
    crossMesh.rotation.x = Math.PI/2;
    // scale the cross wrt socket(/torso)
    crossMesh.scale.x = scaleX * 1.15;
    crossMesh.scale.y = crossMesh.scale.z = scaleZ;
    frame.add(crossMesh);

    // make the vertical eye "line"
    var crossGeom2 = new THREE.TorusGeometry(crossRadius, crossTube*1.5, 
                                            30, 64, Math.PI/1.5);
    var crossMesh2 = new THREE.Mesh(crossGeom2, crossMat);
    // move eye "line" to edge of eye "socket"
    crossMesh2.position.z = radius/24;
    // flip eye "line" out so it's visible
    crossMesh2.rotation.x = Math.PI/2;
    // rotate eye "line" so that it is vertical
    crossMesh2.rotation.y = Math.PI/2;
    crossMesh2.rotation.z = Math.PI/6;
    // scale the cross wrt socket(/torso)
    crossMesh2.scale.x = scaleX * 1.15;
    crossMesh2.scale.y = crossMesh.scale.z = scaleZ;
    frame.add(crossMesh2);

    return frame;
}

function addChinchouEye(torso, side){
    /** 
     * given chinchou's torso and the side to add
     * an eye to (-1 for left, 1 for right), adds
     * an eye to the torso on the given side.
    */
    // create frame
    var eyeFrame = new THREE.Object3D();
    // create an eye
    var eye = createChinchouEye();
    // move eye to edge of torso
    var eyeZ = chinchouParams.torsoRadius * chinchouParams.torsoScaleZ * 0.85;
    eye.position.z = eyeZ;
    // tweak eye position
    var eyeX = chinchouParams.eyeRadius * chinchouParams.torsoScaleX * 3;
    eye.position.x = eyeX * side;
    var eyeY = chinchouParams.torsoRadius * 0.25;
    eye.position.y = eyeY;
    // rotate eye outwards
    eye.rotation.y = side * chinchouParams.eyeAngleY;
    eye.rotation.x = chinchouParams.eyeAngleX;
    eyeFrame.add(eye);
    torso.add(eyeFrame);
}

function createChinchouMouth(){
    /** 
     * creates chinchou's mouth
    */
    // create frame
    var frame = new THREE.Object3D();

    // create mouth
    var radius = chinchouParams.mouthRadius;
    var tube = chinchouParams.mouthTube;
    var arc = chinchouParams.mouthArc;
    var mouthGeom = new THREE.TorusGeometry(radius, tube, 30, 64, arc);
    var mat = chinchouMaterials.mouthMat;
    var mouthMesh = new THREE.Mesh(mouthGeom, mat);

    // turn that frown upside down!
    mouthMesh.scale.y = -1;
    mouthMesh.rotation.z = -1;
    // move mouth up a little
    mouthMesh.position.y = radius * 1.75;
    frame.add(mouthMesh);
    return frame;
}

function addChinchouMouth(torso){
    /** 
     * given chinchou's torso, adds a mouth to it
    */

    // create mouth
    var mouth = createChinchouMouth();

    var mouthZ = chinchouParams.torsoRadius * chinchouParams.torsoScaleZ;
    mouth.position.z = mouthZ;
    torso.add(mouth);
}

function createFin(){
    /** 
     * creates chinchou's fin.
    */
    // create frame
    var frame = new THREE.Object3D();

    // create points
    var topToBottom = [
    [ [-1.5,3,0.5],  [2,4,-1],  [4,4,-1],  [6, 3, -0.5] ],
    [ [-1,2,0], [2,2,-1],  [4,2,-1],  [7.5, 2, 0] ],
    [ [-1,1,0], [2,1,-1],  [4,1,-1],  [7.5, 1, 0] ],
    [ [-1.5,0,0.5],  [2,-1,0], [4,-1,0], [6, 0, 0] ],
    ];
    var surfGeom = new THREE.BezierSurfaceGeometry( topToBottom.reverse(), 10, 10 );
    var mat = chinchouMaterials.finMat;
    var surf = new THREE.Mesh(surfGeom, mat);
    // scale fin
    var scale = chinchouParams.finScale;
    surf.scale.x = scale;
    surf.scale.y = scale;
    surf.scale.z = scale;
    // re-position surf so that fin's origin is
    // its "joint": the middle vertical of where it
    // would be attached to the torso
    surf.rotation.x = -Math.PI/2;
    surf.position.z = 1.5 * scale;
    surf.position.x = 1 * scale;

    frame.add(surf);
    return frame;
}


function addChinchouFin(torso, side){
    /** 
     * takes chinchou's torso and adds a fin to the specified
     * side (-1 for left, 1 for right)
    */
    // create and scale fin
    var fin = createFin();

    // position fin at side of torso
    var torsoRadius = chinchouParams.torsoRadius;
    var torsoScaleX = chinchouParams.torsoScaleX;
    fin.position.x = side * torsoRadius * torsoScaleX;
    fin.scale.x = side;

    torso.add(fin);
}

function createChinchouLightbulb(){
    /** 
     * creates chinchou's light bulb
    */
    // create var for pi
    var pi = Math.PI;
    // ANTENNA
    // create antenna frames
    var antFrame1 = new THREE.Object3D();
    var antFrame2 = new THREE.Object3D();
    // create antenna
    var antennaRadius = chinchouParams.antennaRadius;
    var halfAntennaRadius = antennaRadius/2;
    var antennaTube = chinchouParams.antennaTube;
    var antennaArc = chinchouParams.antennaArc;
    var antennaGeom = new THREE.TorusGeometry(antennaRadius, antennaTube,
                                        30, 64, antennaArc);
    var antennaMat = chinchouMaterials.antennaMat;
    var antenna = new THREE.Mesh(antennaGeom, antennaMat);
    // scale antenna
    var antennaScale = chinchouParams.antennaScale;
    antenna.scale.x = antennaScale;
    antenna.scale.y = antennaScale;
    antenna.scale.z = antennaScale;
    var scaledAntRadius = antennaRadius * antennaScale;
    var halfScaledAntRadius = scaledAntRadius;
    // position antenna with "full" end at frame1's origin
    antenna.position.x = -halfScaledAntRadius;
    // add antenna to frame 1
    antFrame1.add(antenna);
    // re-orient antenna in frame 1 so that 
    // the "shorter" end faces towards us in the z-direction
    // with the "full" end at the origin
    antFrame1.rotation.y = -pi/2;
    antFrame1.scale.x = -1;
    antFrame2.add(antFrame1);

    // BULB
    // create bulb frames
    var bulbFrame1 = new THREE.Object3D();
    var bulbFrame2 = new THREE.Object3D();
    // create bulb
    var controlPoints = [ [0,0,0],
                      [-2,0.5,0],
                      [-1,2,0],
                      [0,3,0] ];
    var curveGeom = TW.createBezierCurve(controlPoints,50);
    var bulbGeom = new THREE.LatheGeometry(curveGeom.vertices);
    var bulbMat = chinchouMaterials.bulbMat;
    var bulb = new THREE.Mesh(bulbGeom, bulbMat);
    // scale bulb
    var bulbScale = chinchouParams.bulbScale;
    bulb.scale.x = bulbScale;
    bulb.scale.y = bulbScale;
    bulb.scale.z = bulbScale;
    bulb.position.y = -bulbScale * 3; // bulb's original height is 3
    bulbFrame1.add(bulb);
    // re-orient bulb in frame 1 to be at the tip of the
    // "shorter" end of antenna
    bulbFrame1.position.z = scaledAntRadius + (scaledAntRadius * Math.cos(pi - antennaArc));
    bulbFrame1.position.y = scaledAntRadius * Math.sin(pi - antennaArc);
    bulbFrame2.add(bulbFrame1);

    // create frame for entire thing
    var lightbulbFrame = new THREE.Object3D();
    lightbulbFrame.add(antFrame2);
    lightbulbFrame.add(bulbFrame2);

    return lightbulbFrame;
}

function addChinchouLightbulb(torso, side){
    /** 
     * given chinchou's torso, adds a lightbulb
     * on the specified side (-1 for left, 1 for right)
    */
    // create lightbulb
    var lightbulb = createChinchouLightbulb();
    // position lightbulb
    var torsoDepth = chinchouParams.torsoRadius * chinchouParams.torsoScaleZ;
    lightbulb.position.z = -torsoDepth; // attach at back of body
    var angleY = chinchouParams.lightbulbRotateY;
    lightbulb.rotation.y = side * angleY; // angle outwards
    var offsetX = chinchouParams.torsoRadius * 0.2;
    lightbulb.position.x = side * offsetX;
    torso.add(lightbulb);
}

function createChinchouFoot(){
    /** 
     * creates chinchou's foot
    */
    // create frame
    var frame = new THREE.Object3D();
    // create foot
    var radius = chinchouParams.footRadius;
    var footGeom = new THREE.SphereGeometry(radius, 64, 32);
    var mat = chinchouMaterials.footMat;
    var foot = new THREE.Mesh(footGeom, mat);
    // stretch sphere into foot
    var scaleZ = chinchouParams.footScaleZ;
    foot.scale.z = scaleZ;
    var scaleY = chinchouParams.footScaleY;
    foot.position.z = radius * scaleZ;
    frame.add(foot)
    return frame;
}

function addChinchouFoot(torso, side){
    /** 
     * given chinchou's torso, adds a foot to it
     * on the specified side (-1 for left, 1 for right)
    */
    // create foot
    var foot = createChinchouFoot();
    var torsoRadius = chinchouParams.torsoRadius;
    var torsoScaleX = chinchouParams.torsoScaleX;
    var torsoScaleY = chinchouParams.torsoScaleY;
    foot.position.x = side * torsoRadius * torsoScaleX / 2;
    foot.position.y = -1 * torsoRadius * torsoScaleY;
    torso.add(foot);
}

function createChinchou(chinchouParams){
    /** 
     * creates chinchou!
    */
    // create frame
    var frame = new THREE.Object3D();
    // make a torso
    var torso = createChinchouTorso();
    // add everything symmetrically (except mouth)
    for (let func = 0; func < 4; func++){
        for (let side = -1; side < 2; side += 2){
            switch(func){
                case 0: addChinchouEye(torso, side);
                case 1: addChinchouFin(torso, side);
                case 2: addChinchouLightbulb(torso, side);
                case 3: addChinchouFoot(torso, side);
            }
        }
    }
    // add mouth
    addChinchouMouth(torso);
    // re-orient chinchou to have origin be 
    // horizontally aligned with bottom of foot
    // vertically aligned with middle of torso
    var torsoRadius = chinchouParams.torsoRadius;
    var torsoScaleY = chinchouParams.torsoScaleY;
    var footRadius = chinchouParams.footRadius;
    var footScaleY = chinchouParams.footScaleY;
    torso.position.y = (torsoRadius * torsoScaleY +
                        footRadius * 4 * footScaleY)
    frame.add(torso);
    return frame;
}