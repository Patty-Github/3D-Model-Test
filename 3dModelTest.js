console.log("3dModelTest JS Working");

import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha allows for transparent background
renderer.setSize( window.innerWidth, window.innerHeight );
document.getElementById("modelArea").appendChild( renderer.domElement ); // add renderer to dom

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new OBJLoader;

loader.load(
    // resource URL 
    'models/githubLogo.obj',
    // called when resource is loaded
    function ( object ) {
        scene.add( object );
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

// set camera distance from model
camera.position.z = 1;

const topLight = new THREE.DirectionalLight( 0xffffff, 1 ); // colour, intensity
topLight.position.set( -100, 0, 100 );
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