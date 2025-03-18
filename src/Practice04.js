import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  //Texture Loader
  const textureLoader = new THREE.TextureLoader()
  const matcapTexture = textureLoader.load('/assets/1.png')
  const donutTexture = textureLoader.load('/assets/metal.png')
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()

  //3D Text
  const fontLoader = new FontLoader()
  fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font)=>{
      const textGeometry = new TextGeometry(
        'Hello, World!',
        {
          font: font,
          size:0.6,
          height:0.1,
          curveSegments: 5,
          bevelEnabled: true,
          bevelThickness: 0.03,
          bevelSize: 0.03,
          bevelOffset: 0,
          bevelSegments: 3
        }
      )
      const textMaterial = new THREE.MeshMatcapMaterial()
      textMaterial.matcap=donutTexture
      const text = new THREE.Mesh(textGeometry,textMaterial)
      scene.add(text)
      textGeometry.center()
    }
  )

  //Dounuts
  const donutGeometry = new THREE.TorusGeometry(0.3,0.2,20,45)
  const donutMaterial = new THREE.MeshBasicMaterial({color:'white'})
  for(let i=0;i<100;i++){
    const donut = new THREE.Mesh(donutGeometry,donutMaterial)
    donut.position.x = (Math.random()-0.5)*10
    donut.position.y = (Math.random()-0.5)*10
    donut.position.z = (Math.random()-0.5)*10

    donut.rotation.x=Math.random()*Math.PI
    donut.rotation.y=Math.random()*Math.PI

    const scale = Math.random()
    donut.scale.set(scale,scale,scale)
    scene.add(donut)
  }
  //Light
  const light = new THREE.AmbientLight('white',0.3)
  scene.add(light)
  //Enviornment Image
  // const rgbeLoader = new RGBELoader()
  // rgbeLoader.load('./assets/3.hdr',(image)=>{
  //   image.mapping = THREE.EquirectangularReflectionMapping
  //   scene.background=image
  //   scene.environment=image
  // })
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
