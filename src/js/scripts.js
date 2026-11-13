import * as THREE from "three";

const container = document.getElementById("three-container");
const width = container.clientWidth;
const height = container.clientHeight;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202028);

// Add camera
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Sphere
const sphereGeo = new THREE.SphereGeometry(1, 48, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.4 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
scene.add(sphere);

// Light
const ambLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
dirLight.position.set(3, 4, 5);
scene.add(ambLight);
scene.add(dirLight);

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();