import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/Addons.js';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  const gui = new GUI()
  //Texture
  const textureLoader = new THREE.TextureLoader()
  const colorTexture = textureLoader.load("/assets/static/textures/door/color.jpg")
  const heightTexture = textureLoader.load("/assets/static/textures/door/height.jpg")
  const alphaTexture = textureLoader.load("/assets/static/textures/door/alpha.jpg")
  const ambientTexture = textureLoader.load("/assets/static/textures/door/ambientOcclusion.jpg")
  const metalnessTexture = textureLoader.load("/assets/static/textures/door/metalsness.jpg")
  const normalTexture = textureLoader.load("/assets/static/textures/door/normal.jpg")
  const roughtnessTexture = textureLoader.load("/assets/static/textures/door/roughness.jpg")
  //texture.magFilter=THREE.NearestFilter
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()

  //Mesh Group
  const group = new THREE.Group()
  scene.add(group)
  //Material
  const material = new THREE.MeshPhysicalMaterial({side:THREE.DoubleSide})
  
  material.metalness=1
  material.roughness=1
  // material.map = colorTexture
  material.aoMap=ambientTexture
  material.aoMapIntensity=1
  material.displacementMap=heightTexture
  material.displacementScale=0.1
  material.metalnessMap=metalnessTexture
  material.roughnessMap=roughtnessTexture
  material.normalMap=normalTexture
  material.transparent=true
  material.alphaMap=alphaTexture
  // material.clearcoat=2
  gui.add(material,'metalness').min(0).max(1).step(0.0001)
  gui.add(material,'roughness').min(0).max(1).step(0.0001)
  gui.add(material,'clearcoat').min(0).max(1).step(0.0001)
  gui.add(material,'clearcoatRoughness').min(0).max(1).step(0.0001)
  gui.add(material,'transmission').min(0).max(1).step(0.0001)
  gui.add(material,'ior').min(1).max(10).step(0.0001)
  gui.add(material,'thickness').min(0).max(1).step(0.0001)
  // material.wireframe=true


  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5,64,64),
    material
  )
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,100,100),
    material
  )
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(),
    material
  )
  sphere.position.x=-2
  torus.position.x=2
  group.add(sphere)
  group.add(plane)
  group.add(torus)
  //Light
  // const ambientLight=new THREE.AmbientLight('white',2)
  // scene.add(ambientLight)
  // const light = new THREE.PointLight('white',2)
  // light.position.x=3
  // light.position.y=3
  // light.position.z=3
  // scene.add(light)
  // Enviornment Map
  const rgbeLoader = new RGBELoader()
  rgbeLoader.load('./assets/3.hdr',(image)=>{
    image.mapping = THREE.EquirectangularReflectionMapping
    scene.background=image
    scene.environment=image
  })
  
  //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
  camera.position.z=3
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
  //Animation Loop
  const animationLoop=()=>{
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
