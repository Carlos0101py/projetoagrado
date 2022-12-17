import {
    Scene,
    Color,
    PerspectiveCamera,
    PointLight,
    DirectionalLight,
    WebGLRenderer,
} from 'https://unpkg.com/three/build/three.module.js';
import {OrbitControls} from'https://unpkg.com/three/examples/jsm/controls/OrbitControls';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'https://unpkg.com/three/examples/jsm/loaders/MTLLoader';
 
//Criação da cena

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth,  window.innerHeight );
document.body.appendChild(renderer.domElement);

const scene = new Scene();
scene.background = new Color(0xdddddd);

const camera = new PerspectiveCamera(
    60,
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

controls.autoRotate = true;
controls.autoRotateSpeed = 2.0;

//DirectionalLight

const linght1 = new DirectionalLight(0xc4c4c4, 0.6);
linght1.position.set(0,300,500)
scene.add(linght1);

const linght2 = new DirectionalLight(0xc4c4c4, 0.6);
linght2.position.set(500, 100, 0)
scene.add(linght2);

const linght3 = new DirectionalLight(0xc4c4c4, 0.6);
linght3.position.set(0,100,-500)
scene.add(linght3);

const linght4 = new DirectionalLight(0xc4c4c4, 0.6);
linght4.position.set(-500,300,100)
scene.add(linght4);




//Carregamento de objetos

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
    object.scale.set(250,250,250);
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