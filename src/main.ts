import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import starsTexture from "/img/stars.jpg";
import sunTexture from "/img/sun.png";
import mercuryTexture from "/img/mercury.jpg";
import venusTexture from "/img/venus.jpg";
import earthTexture from "/img/earth.jpg";
import marsTexture from "/img/mars.jpg";
import jupiterTexture from "/img/jupiter.jpg";
import saturnTexture from "/img/saturn.jpg";
import saturnRingTexture from "/img/saturn ring.png";
import uranusTexture from "/img/uranus.jpg";
import uranusRingTexture from "/img/uranus ring.png";
import neptuneTexture from "/img/neptune.jpg";
import plutoTexture from "/img/pluto.jpg";

// basic configuration

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#canvas")!,
});

renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);
const textureLoader = new THREE.TextureLoader();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const createPlanet = (
  size: number,
  texture: string,
  position: number,
  ring?: {
    innerRadius: number;
    outerRadius: number;
    texture: string;
  }
) => {
  const Geometry = new THREE.SphereGeometry(size, 30, 30);
  const Material = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(Geometry, Material);
  const obj = new THREE.Object3D();
  mesh.position.x = position;
  scene.add(mesh);
  obj.add(mesh);
  scene.add(obj);

  if (ring) {
    const RingGeometry = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const RingMaterial = new THREE.MeshStandardMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(RingGeometry, RingMaterial);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  return { mesh, obj };
};

const sunGeometry = new THREE.SphereGeometry(16, 30, 30);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const neptune = createPlanet(7, neptuneTexture, 200 );
const pluto = createPlanet(2.8, plutoTexture , 216);

const saturn = createPlanet(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});

const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture,
  });

const PointLight = new THREE.PointLight(0xffffff, 2, 300, 0);
scene.add(PointLight);

const animate = () => {
    //self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    saturn.mesh.rotateY(0.038);
    venus.mesh.rotateY(0.002)
    pluto.mesh.rotateY(0.008)
    earth.mesh.rotateY(0.02)
    mars.mesh.rotateY(0.018)
    jupiter.mesh.rotateY(0.04)
    neptune.mesh.rotateY(0.032)
    uranus.mesh.rotateY(0.03)
        
    // around-sun-rotation
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);
  mercury.obj.rotateY(0.04);
  saturn.obj.rotateY(0.0009);


  renderer.render(scene, camera);
};

renderer.setAnimationLoop(animate);
