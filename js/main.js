import {
    Scene,
    Color,
    PerspectiveCamera,
    PointLight,
    WebGLRenderer,
} from 'https://unpkg.com/three/build/three.module.js';
import {OrbitControls} from'https://unpkg.com/three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'https://unpkg.com/three/examples/jsm/loaders/MTLLoader';
 

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth,  window.innerHeight );
document.body.appendChild(renderer.domElement);

const scene = new Scene();
scene.background = new Color(0xdddddd);

const camera = new PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    2000
);
camera.rotation.y = (45 / 180) * Math.PI;
camera.position.x = 800;
camera.position.y = 50;
camera.position.z = 1500;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.campingFactor = 0.25;
controls.enableZoom = true;

controls.maxPolarAngle = 1.5;
controls.enablePan = false

const linght1 = new PointLight(0xc4c4c4, 1);
linght1.position.set(0,300,500)
scene.add(linght1);

const linght2 = new PointLight(0xc4c4c4, 1);
linght2.position.set(500, 100, 0)
scene.add(linght2);

const linght3 = new PointLight(0xc4c4c4, 1);
linght3.position.set(0,100,-500)
scene.add(linght3);

const linght4 = new PointLight(0xc4c4c4, 1);
linght4.position.set(-500,300,100)
scene.add(linght4);

const mtlLoader = new MTLLoader();
mtlLoader.setPath('../img/');
mtlLoader.load('',(materials) =>{
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials)
    objLoader.setPath('../img/');
    objLoader.load(
    'teamugobj.obj',
 (object) =>{
    object.scale.set(200,200,200);
    scene.add(object)
},
(xhr) =>{
console.log(`Carrecando Objeto: ${(xhr.loaded / xhr.total) * 100}% carregados`
        );
    },
    (err) => {
        console.log(`Aconteceu um erro: ${err}`);
    }
);
},(xhr) =>{
    console.log(`Carrecando material: ${(xhr.loaded / xhr.total) * 100}% carregados`
            );
        },
        (err) => {
            console.log(`Aconteceu um erro no material: ${err}`);
        });

const animate = function animate(){
    requestAnimationFrame(animate);

    controls.update()

    renderer.render(scene, camera);
}

animate();