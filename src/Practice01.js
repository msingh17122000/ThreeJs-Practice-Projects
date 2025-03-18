import logo from './logo.svg';
import './App.css';
import * as THREE from "three"
import { useEffect, useRef } from 'react';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'lil-gui';

function App() {
  const canvasRef = useRef(null)
  useEffect(() => {
    // Using Lil GUI
    const gui = new GUI()


    // Creating Scene
    const scene = new THREE.Scene()


    // Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1) // width, height, depth
    const material = new THREE.MeshBasicMaterial({ color: 'red' })


    // Mesh = Geometry + Material
    // const mesh = new THREE.Mesh(geometry, material)
    // scene.add(mesh)

    // mesh.scale.set(2,1,1)
    // mesh.position.x=2

    const group = new THREE.Group()
    scene.add(group)

    const cube1 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'red' })
    )
    cube1.position.x=2
    group.add(cube1)

    const cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'green' })
    )
    cube2.position.x=-2
    group.add(cube2)

    const cube3 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 'orange' })
    )
    group.add(cube3)


    // LIL GUI 
    gui.add(cube1.position,'y',-3,3,0.01)
    gui.add(cube2.position,'y').min(-3).max(3).step(0.01).name('Cube2 Elevation')
    gui.add(group,'visible')
    gui.add(cube1.material,'wireframe')
    gui.addColor(cube1.material,'color').name('Cube1 Color')


    // Camera
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)// Use 35
    camera.position.z=3
    scene.add(camera)

    const axesHelper = new THREE.AxesHelper()
    scene.add(axesHelper)
    // camera.lookAt(mesh.position)
    // camera.lookAt(mesh.position)

    // Orbit Controls
    const controls = new OrbitControls(camera, canvasRef.current)
    controls.enableDamping = true


    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    })
    renderer.setSize(sizes.width,sizes.height)
    renderer.setPixelRatio(window.devicePixelRatio)
    
    // Resizing
    window.addEventListener('resize',()=>{
      // Update Sizes
      sizes.width=window.innerWidth
      sizes.height=window.innerHeight

      // Update Camera
      camera.aspect=sizes.width/sizes.height
      camera.updateProjectionMatrix()

      // Update Renderer
      renderer.setSize(sizes.width,sizes.height)
      
    })


    const animationLoop = ()=>{
      // group.rotation.y += 0.01
      window.requestAnimationFrame(animationLoop)
      controls.update()
      renderer.render(scene,camera)
    }
    animationLoop()


  })

  return (
    <div>
      <canvas className='webgl' ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
