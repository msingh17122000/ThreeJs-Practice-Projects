import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { FontLoader, OrbitControls, RGBELoader } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { GroundedSkybox } from 'three/examples/jsm/Addons.js';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  const gui = new GUI()
  //GLTF Loader
  const gltfLoader = new GLTFLoader()
  gltfLoader.load(
    '/assets/FlightHelmet/glTF/FlightHelmet.gltf',
    (gltf) => {
      gltf.scene.scale.set(2,2,2)
      gltf.scene.position.set(0,0,0)
      scene.add(gltf.scene)
    },
  )
  
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }

  //Scene
  const scene = new THREE.Scene()

  //Texture Loader
  const textureLoader = new THREE.TextureLoader()
  // const envMap = textureLoader.load('/assets/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg')
  // envMap.mapping=THREE.EquirectangularReflectionMapping
  // envMap.colorSpace=THREE.SRGBColorSpace
  // scene.background=envMap

  // Enviornment Map
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('./assets/environmentMaps/2/2k.hdr',(image)=>{
    image.mapping = THREE.EquirectangularReflectionMapping
    scene.background=image
    scene.environment=image
  })

  //Ambient Light
  const ambientLight = new THREE.AmbientLight('white',0.5)
  // scene.add(ambientLight)

  //Directional Light
  const directionalLight = new THREE.DirectionalLight('white',2)
  directionalLight.position.set(1,1,2)
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
  scene.add(directionalLightHelper)
  scene.add(directionalLight)

  //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
  camera.position.z=2
  camera.position.y=2
  scene.add(camera)

  //Axes Helper
  const axesHelper = new THREE.AxesHelper()
  scene.add(axesHelper)
  //Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas:canvasRef.current,
    antialias:true
  })
  //ToneMapping
  renderer.toneMapping=THREE.ReinhardToneMapping
  renderer.toneMappingExposure=3
  //GUI
  gui.add(renderer,'toneMapping',{
    No:THREE.NoToneMapping,
    Linear:THREE.LinearToneMapping,
    Reinhard:THREE.ReinhardToneMapping,
    Reinhard:THREE.ReinhardToneMapping,
    Cineon:THREE.CineonToneMapping,
    Filmic: THREE.ACESFilmicToneMapping
  })
  gui.add(renderer,'toneMappingExposure').min(0).max(10).step(0.001)
  //OrbitControls
  const controls=new OrbitControls(camera,canvasRef.current)
  controls.enableDamping=true
  const clock = new THREE.Clock()

  //Animation Loop
  const animationLoop=()=>{
    const elapsedTime = clock.getElapsedTime()
    window.requestAnimationFrame(animationLoop)
    controls.update()
    renderer.render(scene,camera)
  }
  renderer.setSize(sizes.width,sizes.height)
  animationLoop()
  })

  return (
    <div>
      <canvas className='webgl' ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
