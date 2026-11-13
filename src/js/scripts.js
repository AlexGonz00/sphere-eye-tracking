import * as THREE from "three";

const container = document.getElementById("three-container");
const width = window.innerWidth;
const height = window.innerHeight;

// For the cube
const CUBE_SIZE = 10;
const HALF = CUBE_SIZE / 2;
const BUFFER = 2;

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202028);

// Add camera
const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
camera.position.set(0, 2, CUBE_SIZE + BUFFER);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// The cube

const cubeGeo = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, CUBE_SIZE);

const cubeWalls = new THREE.Mesh(
  cubeGeo,
  new THREE.MeshBasicMaterial({
    color: 0x8899AA,
    transparent: true,
    opacity: 0.5,
    side: THREE.BackSide,
    depthWrite: false
  })
);

scene.add(cubeWalls);

// Edges
const cubeEdges = new THREE.LineSegments(
  new THREE.EdgesGeometry(cubeGeo),
  new THREE.LineBasicMaterial({ color: 0xFFFFFF })
);
scene.add(cubeEdges);

// Sphere
const RADIUS = 0.5;
const sphereGeo = new THREE.SphereGeometry(RADIUS, 48, 32);
const sphereMat = new THREE.MeshStandardMaterial({ color: 0xCCCCCC, roughness: 0.4 });
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.position.set(0, 0, 0);
scene.add(sphere);

// Constant velocity
const SPEED = 2.5;
const velocity = new THREE.Vector3(1, 0.7, 0.5).normalize().multiplyScalar(SPEED);

// Light
const ambLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.5);
dirLight.position.set(3, 4, 5);
scene.add(ambLight);
scene.add(dirLight);

// Render loop
const clock = new THREE.Clock();
const limit = HALF - RADIUS;

function animate() {
  requestAnimationFrame(animate);
  
  const dt = Math.min(clock.getDelta(), 0.05);
  sphere.position.addScaledVector(velocity, dt);

  // Bounce: clamp to wall, flip velocity's axis
  for (const axis of ["x", "y", "z"]) {
    if (sphere.position[axis] > limit) {
      sphere.position[axis] = limit;
      velocity[axis] = -Math.abs(velocity[axis]);
    } else if (sphere.position[axis] < -limit) {
      sphere.position[axis] = -limit;
      velocity[axis] = Math.abs(velocity[axis]);
    }
  }
  
  renderer.render(scene, camera);
}

animate();