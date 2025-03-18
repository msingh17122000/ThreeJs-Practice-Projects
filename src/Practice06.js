import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { FontLoader, OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';
import { RGBELoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { timerDelta } from 'three/webgpu';
import { floor } from 'three/webgpu';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
  //Texture Loader
  const textureLoader = new THREE.TextureLoader()
  const doorColorTexture = textureLoader.load("/assets/static/textures/door/color.jpg")
  const doorHeightTexture = textureLoader.load("/assets/static/textures/door/height.jpg")
  const doorAlphaTexture = textureLoader.load("/assets/static/textures/door/alpha.jpg")
  const doorAmbientTexture = textureLoader.load("/assets/static/textures/door/ambientOcclusion.jpg")
  const doorMetalnessTexture = textureLoader.load("/assets/static/textures/door/metalsness.jpg")
  const doorNormalTexture = textureLoader.load("/assets/static/textures/door/normal.jpg")
  const doorRoughtnessTexture = textureLoader.load("/assets/static/textures/door/roughness.jpg")
  //Wall Texture
  const wallColorTexture = textureLoader.load("/assets/wall/Poliigon_BrickWallReclaimed_8320_BaseColor.jpg")
  const wallAmbientTexture = textureLoader.load("/assets/wall/Poliigon_BrickWallReclaimed_8320_AmbientOcclusion.jpg")
  const wallNormalTexture = textureLoader.load("/assets/wall/Poliigon_BrickWallReclaimed_8320_Normal.jpg")
  const wallRoughnessTexture = textureLoader.load("/assets/wall/Poliigon_BrickWallReclaimed_8320_Roughness.jpg")
  //Wall Texture
  const  grassColorTexture = textureLoader.load("/assets/grass/Poliigon_GrassPatchyGround_4585_BaseColor.jpg")
  const grassAmbientTexture = textureLoader.load("/assets/grass/Poliigon_GrassPatchyGround_4585_AmbientOcclusion.jpg")
  const grassNormalTexture = textureLoader.load("/assets/grass/Poliigon_GrassPatchyGround_4585_Normal.jpg")
  const grassRoughnessTexture = textureLoader.load("/assets/grass/Poliigon_GrassPatchyGround_4585_Roughness.jpg")
  const grassHeightTexture = textureLoader.load("/assets/grass/Poliigon_GrassPatchyGround_4585_Displacement.tiff")
  //Sizes
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
  }
  //Scene
  const scene = new THREE.Scene()
  // Fog
  const fog= new THREE.Fog('#262837',0.5,10)
  scene.fog=fog
  //Light
  const ambientLight  = new THREE.AmbientLight('#b9d5ff',0.01)
  scene.add(ambientLight)
  //Directional Light
  const directionalLight = new THREE.DirectionalLight('#b9d5ff',0.01)
  directionalLight.position.set(4,5,-2)
  scene.add(directionalLight)
  //Plane
  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map:grassColorTexture,
      aoMap:grassAmbientTexture,
      normalMap:grassNormalTexture,
      transparent:true,
      roughnessMap:grassRoughnessTexture,
    })
  )
  plane.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(plane.geometry.attributes.uv.array,2)
  )
  plane.rotation.x=-Math.PI/2
  scene.add(plane)
  //House
  const house = new THREE.Group()
  scene.add(house)
  //Door Light
  const doorLight = new THREE.PointLight('#ff7d46',5,10)
  doorLight.position.set(0,2.2,2.7)
  house.add(doorLight)
  //Walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
      map:wallColorTexture,
      aoMap:wallAmbientTexture,
      normalMap:wallNormalTexture,
      roughnessMap:wallRoughnessTexture,
    })
  )
  walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
  )
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:'red'})
  )
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
      map:doorColorTexture,
      transparent:true,
      alphaMap:doorAlphaTexture,
      aoMap:doorAmbientTexture,
      displacementMap:doorHeightTexture,
      displacementScale:0.3,
      normalMap:doorNormalTexture,
      metalnessMap:doorMetalnessTexture,
      roughnessMap:doorRoughtnessTexture
    })
  )
  door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
  )
  const bushGeometry = new THREE.SphereGeometry(1,16,16)
  const bushMaterial = new THREE.MeshStandardMaterial({color:'#89c854'})
  const bush1 = new THREE.Mesh(bushGeometry,bushMaterial)
  const bush2 = new THREE.Mesh(bushGeometry,bushMaterial)
  const bush3 = new THREE.Mesh(bushGeometry,bushMaterial)
  const bush4 = new THREE.Mesh(bushGeometry,bushMaterial)
  bush1.scale.set(0.5,0.5,0.5)
  bush1.position.set(0.8,0.2,2.2)

  bush2.scale.set(0.25,0.25,0.25)
  bush2.position.set(1.4,0.1,2.1)

  bush3.scale.set(0.4,0.4,0.4)
  bush3.position.set(-0.8,0.1,2.1)

  bush4.scale.set(0.15,0.15,0.15)
  bush4.position.set(-1,0.09,2.6)

  house.add(bush1,bush2,bush3,bush4)
  door.position.z=2.001
  door.position.y=2/2
  house.add(door)
  roof.position.y=2.5+0.5
  roof.rotation.y=Math.PI/4
  house.add(roof)
  walls.position.y=2.5/2
  house.add(walls)
  // Graves
  const graves = new THREE.Group()
  scene.add(graves)
  const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2),
  graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'})
  for(let i=0;i<50;i++){
    const radius = 3 + Math.random()*6
    const angle = Math.random()*Math.PI*2
    const x = Math.sin(angle)*radius
    const z = Math.cos(angle)*radius

    const grave  =new THREE.Mesh(graveGeometry,graveMaterial)
    grave.rotation.y=(Math.random()-0.5)*0.4
    grave.rotation.z=(Math.random()-0.5)*0.4
    grave.position.set(x,0.3,z)
    grave.castShadow=true
    graves.add(grave)
  }
  //Ghosts
  const ghost1 = new THREE.PointLight('#ff00ff',2,3)
  const ghost2 = new THREE.PointLight('#00ffff',2,3)
  const ghost3 = new THREE.PointLight('#ffff00',2,3)
  scene.add(ghost1,ghost2,ghost3)
  //Camera
  const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
  camera.position.z=10
  camera.position.y=2
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
    //Ghost
    const ghost1Angle=elapsedTime
    ghost1.position.x=Math.cos(ghost1Angle)*4
    ghost1.position.z=Math.sin(ghost1Angle)*4
    ghost1.position.y=Math.sin(ghost1Angle)*3
    const ghost2Angle=-elapsedTime*0.32
    ghost2.position.x=Math.cos(ghost2Angle)*5
    ghost2.position.z=Math.sin(ghost2Angle)*5
    ghost2.position.y=Math.sin(ghost2Angle)*4
    const ghost3Angle=-elapsedTime*0.18
    ghost3.position.x=Math.cos(ghost3Angle)*(7+Math.sin(elapsedTime)*0.32)
    ghost3.position.z=Math.sin(ghost3Angle)*(7+Math.sin(elapsedTime)*0.5)
    ghost3.position.y=Math.sin(ghost3Angle)*(7+Math.sin(elapsedTime)*2.5)
    window.requestAnimationFrame(animationLoop)
    controls.update()
    renderer.render(scene,camera)
    renderer.setClearColor('#262837')
  }
  renderer.setSize(sizes.width,sizes.height)
  renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
  renderer.shadowMap.type= THREE.PCFSoftShadowMap
  directionalLight.castShadow=true
  doorLight.castShadow=true

  doorLight.shadow.mapSize.width=256
  doorLight.shadow.mapSize.height=256
  doorLight.shadow.camera.far=7

  ghost1.shadow.mapSize.width=256
  ghost1.shadow.mapSize.height=256
  ghost1.shadow.camera.far=7

  ghost2.shadow.mapSize.width=256
  ghost2.shadow.mapSize.height=256
  ghost2.shadow.camera.far=7

  ghost3.shadow.mapSize.width=256
  ghost3.shadow.mapSize.height=256
  ghost3.shadow.camera.far=7

  ghost1.castShadow=true
  ghost2.castShadow=true
  ghost3.castShadow=true
  walls.castShadow=true
  bush1.castShadow=true
  bush2.castShadow=true
  bush3.castShadow=true
  bush4.castShadow=true
  plane.receiveShadow=true
  animationLoop()
  })

  return (
    <div>
      <canvas className='webgl' ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
