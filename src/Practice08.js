import logo from "./logo.svg";
import "./App.css";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { FontLoader, OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";

function GalaxyGenerator() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const gui = new GUI();
    //Texture Loader
    const textureLoader = new THREE.TextureLoader();

    //Sizes
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    //Scene
    const scene = new THREE.Scene();

    //Parameters
    const parameters = {};
    parameters.count = 100000;
    parameters.size = 0.01;
    parameters.radius = 5;
    parameters.branches = 3;
    parameters.spin = 1;
    parameters.randomness = 0.2;
    parameters.randomnessPower = 3;
    parameters.insideColor = "#ff6030";
    parameters.outsideColor = "#1b3984";

    let geometery = null;
    let material = null;
    let points = null;
    // Galaxy Generator
    const galaxyGenerator = () => {
      if (points !== null) {
        geometery.dispose();
        material.dispose();
        scene.remove(points);
      }
      geometery = new THREE.BufferGeometry();
      const positions = new Float32Array(parameters.count * 3);
      const colors = new Float32Array(parameters.count * 3);
      const colorInside = new THREE.Color(parameters.insideColor);
      const colorOutside = new THREE.Color(parameters.outsideColor);

      for (let i = 0; i <= parameters.count; i++) {
        const i3 = i * 3;
        const radius = Math.random() * parameters.radius;
        const spinAngle = radius * parameters.spin;
        const branchAngle =
          ((i % parameters.branches) / parameters.branches) * Math.PI * 2;
        const randomX =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomY =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        const randomZ =
          Math.pow(Math.random(), parameters.randomnessPower) *
          (Math.random() < 0.5 ? 1 : -1);
        positions[i3 + 0] =
          Math.cos(branchAngle + spinAngle) * radius + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] =
          Math.sin(branchAngle + spinAngle) * radius + randomZ;
        //Color
        const mixedColor = colorInside.clone();
        mixedColor.lerp(colorOutside, radius / parameters.radius);
        colors[i3 + 0] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
      }
      geometery.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
      );
      geometery.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      //Galaxy Material
      material = new THREE.PointsMaterial({
        size: parameters.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
      });
      //Points
      points = new THREE.Points(geometery, material);
      scene.add(points);
    };
    galaxyGenerator();

    //Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 2;
    camera.position.y = 2;
    scene.add(camera);

    //Axes Helper
    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    //GUI Tweaks
    gui
      .add(parameters, "count")
      .min(10000)
      .max(1000000)
      .step(100)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "size")
      .min(0.01)
      .max(0.1)
      .step(0.01)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "radius")
      .min(0.01)
      .max(20)
      .step(0.01)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "branches")
      .min(2)
      .max(20)
      .step(1)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "spin")
      .min(-5)
      .max(5)
      .step(0.001)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "randomness")
      .min(0)
      .max(2)
      .step(0.001)
      .onFinishChange(galaxyGenerator);
    gui
      .add(parameters, "randomnessPower")
      .min(1)
      .max(10)
      .step(0.001)
      .onFinishChange(galaxyGenerator);
    gui.addColor(parameters, "insideColor").onFinishChange(galaxyGenerator);
    gui.addColor(parameters, "outsideColor").onFinishChange(galaxyGenerator);

    //Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
    });

    //OrbitControls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;
    const clock = new THREE.Clock();

    //Animation Loop
    const animationLoop = () => {
      const elapsedTime = clock.getElapsedTime();
      window.requestAnimationFrame(animationLoop);
      controls.update();
      renderer.render(scene, camera);
    };
    renderer.setSize(sizes.width, sizes.height);
    animationLoop();
  });

  return <canvas className="webgl" ref={canvasRef}></canvas>;
}

export default GalaxyGenerator;
