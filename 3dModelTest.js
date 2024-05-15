console.log("3dModelTest JS Working");

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 90, window.innerWidth / window.innerHeight, 0.1, 1000 ); //FOV, Aspect Ratio, View Frustrum
camera.position.z = 1;
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); // alpha allows for transparent background
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("modelArea").appendChild( renderer.domElement ); // add renderer to dom

const planeRotationSlider = document.getElementById("planeRotationSlider");
const planeRotationText = document.getElementById("planeRotationText");

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new OBJLoader;
const mtlLoader = new THREE.MaterialLoader();
const gltfLoader = new GLTFLoader;

let githubLogo;
let plane;
const brickTextureDiff = new THREE.TextureLoader().load( 'materials/brick_wall_09_diff_2k.jpg' );
const brickTextureNorm = new THREE.TextureLoader().load( 'materials/brick_wall_09_nor_gl_2k.jpg' );

loader.load(
    // resource URL 
    'models/githubLogo.obj',
    // called when resource is loaded
    function ( object ) {
        githubLogo = object;
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

loader.load(
    'models/plane.obj',
    function ( object ) {
        plane = object;
        new THREE.MeshStandardMaterial({
            map: brickTextureDiff,
            normalMap: brickTextureNorm
        });
        scene.add( plane );
        plane.position.set(0, 0, -0.1);
    }
)

/*mtlLoader.load(
    //'materials/brick_wall_09_2k.gltf',
    'materials/brick_wall_09_diff_2k.jpg',

    function ( material ) {
        object.material = material;
    }
)*/

const topLight = new THREE.DirectionalLight( 0xffffff, 1 ); // colour, intensity
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
scene.add( bottomLight );

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