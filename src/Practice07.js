
import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';


function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  //Texture Loader
  const textureLoader = new THREE.TextureLoader()
  const particleTexture = textureLoader.load('/assets/particles/2.png')
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()
  //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
  camera.position.z=2
  camera.position.y=2
  scene.add(camera)
  //Axes Helper
  const axesHelper = new THREE.AxesHelper()
  scene.add(axesHelper)
  //Particles
  const particlesGeometry = new THREE.BufferGeometry()
  const count = 5000
  const positions = new Float32Array(count*3)
  const colors = new Float32Array(count*3)
  for(let i=0;i<count*3;i++){
    positions[i]=(Math.random()-0.5)*10
    colors[i]=Math.random()
  }
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions,3)
  )
  particlesGeometry.setAttribute(
    'color',
    new THREE.BufferAttribute(colors,3)
  )
  const particlesMaterial = new THREE.PointsMaterial({
    size:0.1,
    sizeAttenuation:true,
    transparent:true,
    // alphaTest:0.01,
    // depthTest:false,
    depthWrite:false,
    blending:THREE.AdditiveBlending,
    alphaMap:particleTexture,
    vertexColors:true,
  })
  const particles = new THREE.Points(particlesGeometry,particlesMaterial)
  scene.add(particles)
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
    // particles.rotation.y=elapsedTime*0.2
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
