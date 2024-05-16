console.log("3dModelTest JS Working");

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 ); //FOV, Aspect Ratio, View Frustrum
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha allows for transparent background
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById("modelArea").appendChild( renderer.domElement ); // add renderer to dom

const planeRotationSlider = document.getElementById("planeRotationSlider");
const planeRotationText = document.getElementById("planeRotationText");

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const controls = new OrbitControls( camera, renderer.domElement );
const objLoader = new OBJLoader;
const mtlLoader = new THREE.MaterialLoader();
const gltfLoader = new GLTFLoader;

let githubLogo;
const brickTextureDiff = new THREE.TextureLoader().load( 'materials/brick_wall_09_diff_2k.jpg' );
const brickTextureNorm = new THREE.TextureLoader().load( 'materials/brick_wall_09_nor_gl_2k.jpg' );

let brick;
gltfLoader.load('./models/brick.glb', function ( gltf ) {
    brick = gltf.scene;
    scene.add( brick );
    brick.translateZ(1.8);
    brick.scale.set(0.06, 0.06, 0.06);

    brick.traverse((child) => {
        if ( child.isMesh ) {
            child.castShadow = true;
            child.recieveShadow = true;
        }
    })
})

objLoader.load(
    // resource URL 
    'models/githubLogo.obj',
    // called when resource is loaded
    function ( object ) {
        githubLogo = object;
        githubLogo.traverse((child) => {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.recieveShadow = true;
            }
        })
        scene.add( githubLogo );
    },
    // called when loading is in progress
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'an error happened' );
    }
);

let ground = new THREE.Mesh( 
    new THREE.BoxGeometry(5, 0.02, 5),
    new THREE.MeshStandardMaterial( {
        map: brickTextureDiff,
        normalMap: brickTextureNorm
    } ) 
);
ground.translateY(-0.5);
ground.receiveShadow = true;
ground.castShadow = false;
scene.add( ground );

const spotlight = new THREE.SpotLight( 0xffffff, 50, 100, 0.2, 0.5 );
spotlight.position.set( 0, 10, 0 )
spotlight.castShadow = true;
spotlight.visible = true;
scene.add( spotlight );

const spotlightFront = new THREE.SpotLight( 0xffffff, 50, 100, 0.2, 0.5 );
spotlightFront.position.set( 5, 10, 10 )
spotlightFront.castShadow = true;
spotlightFront.visible = true;
spotlightFront.lookAt(0, 0, 0);
scene.add( spotlightFront );

//const helper = new THREE.SpotLightHelper( spotlightFront, 1, );
//scene.add( helper );

/*const topLight = new THREE.DirectionalLight( 0xffffff, 1 ); // colour, intensity
topLight.position.set( -100, 100, 100 );
topLight.castShadow = true;
scene.add( topLight );

const topLight2 = new THREE.DirectionalLight( 0xffffff, 1 ); // colour, intensity
topLight2.position.set( 100, 0, -100 );
topLight2.castShadow = true;
scene.add( topLight2 );

const bottomLight = new THREE.DirectionalLight( 0xffffff, 1 ); // colour, intensity
bottomLight.position.set( 0, -100, 0 );
bottomLight.castShadow = true;
scene.add( bottomLight );*/

function animate() {
    requestAnimationFrame(animate);
    // add code to update scene, adding automatic movement
    renderer.render( scene, camera );
}

window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});

animate();


planeRotationText.innerHTML = "Plane Rotation: " + planeRotationSlider.value;
planeRotationSlider.oninput = function() {
    planeRotationText.innerHTML = "Plane Rotation: " + planeRotationSlider.value;
    plane.rotation.x = planeRotationSlider.value;
}