import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {

  //Texture
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load("/assets/static/textures/minecraft.png")
  texture.magFilter=THREE.NearestFilter
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()
  //Geometry
  const geometry = new THREE.BoxGeometry(1,1,1)
  const material = new THREE.MeshBasicMaterial({map:texture})
  //Mesh
  const mesh = new THREE.Mesh(geometry,material)
  scene.add(mesh)
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
