import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { timerDelta } from 'three/webgpu';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  //Texture Loader
  const textureLoader = new THREE.TextureLoader()
  const matcapTexture = textureLoader.load('/assets/1.png')
  const donutTexture = textureLoader.load('/assets/metal.png')
  const earthTexture = textureLoader.load('/assets/earthTexture.jpg')
  const moonTexture = textureLoader.load('/assets/moonTexture.jpg')
  const earthNormalMap = textureLoader.load('/assets/earthNormalMap.tiff')
  const earthAlpha = textureLoader.load('/assets/earthAlpha.tif')
  
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()

  //Light
  // const light = new THREE.AmbientLight('white',0.3)
  // scene.add(light)
  //Earth
  const earthGeometry = new THREE.SphereGeometry(2,64,64)
  const earthMaterial = new THREE.MeshPhysicalMaterial({map:earthTexture})
  const earth = new THREE.Mesh(earthGeometry,earthMaterial)
  scene.add(earth)
  earth.receiveShadow=true
  //Moon
  const moonGeometry = new THREE.SphereGeometry(0.3)
  const moonMaterial = new THREE.MeshStandardMaterial({map:moonTexture})
  const moon = new THREE.Mesh(moonGeometry,moonMaterial)
  moon.position.set(0,0,20)
  scene.add(moon)
  moon.castShadow=true
  //Directional Light
  const dirLight = new THREE.DirectionalLight('white',5)
  scene.add(dirLight)
  const dirLightHelper = new THREE.DirectionalLightHelper(dirLight,5)
  scene.add(dirLightHelper)
  dirLight.position.x=50
  dirLight.rotation.z=Math.PI/2
  dirLight.castShadow=true
  dirLight.shadow.radius=20
  

  //Enviornment Image
  // const rgbeLoader = new RGBELoader()
  // rgbeLoader.load('./assets/2.hdr',(image)=>{
  //   image.mapping = THREE.EquirectangularReflectionMapping
  //   scene.background=image
  //   scene.environment=image
  // })
  //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
  camera.position.z=30
  scene.add(camera)
  //Axes Helper
  const axesHelper = new THREE.AxesHelper()
  scene.add(axesHelper)
  //Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas:canvasRef.current,
  })
  //OrbitControls
  const controls=new OrbitControls(camera,canvasRef.current)
  controls.enableDamping=true
  const clock = new THREE.Clock()
  //Animation Loop
  const animationLoop=()=>{
    const elapsedTime = clock.getElapsedTime()
    window.requestAnimationFrame(animationLoop)
    controls.update()
    earth.rotation.y+=0.002
    // moon.rotation.y+=0.1
    moon.position.x=Math.cos(elapsedTime)*10
    // moon.position.y=Math.sin(elapsedTime)*10
    moon.position.z=Math.sin(elapsedTime)*10
    renderer.render(scene,camera)
  }
  renderer.setSize(sizes.width,sizes.height)
  renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
  animationLoop()
  })

  return (
    <div>
      <canvas className='webgl' ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
