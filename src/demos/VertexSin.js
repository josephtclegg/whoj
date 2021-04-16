import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
//import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from '../util/OrbitControls';
import { vert_sinnoise, frag_sinnoise } from '../shaders/shad_sinnoise';
import * as Prism from 'prismjs';

export default function VertexSinDemo() {
  const [mount, setMount] = useState(null);
  const [frameId, setFrameId] = useState(null);
  const [rendEl, setRendEl] = useState(null);

  useEffect(() => {
    if(mount != null) {
      const clock = new THREE.Clock();
      clock.start();
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      var controls = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color(0xfafaff);
      renderer.setSize(window.innerWidth/2, window.innerHeight/2);
      //renderer.setSize(500, 500);
      setRendEl(renderer.domElement);
      mount.appendChild(renderer.domElement);
      controls.autoRotate = true;
      controls.enableZoom = false;
      var geometry = new THREE.BoxGeometry(3, 3, 3);
      var plangeom = new THREE.PlaneGeometry(4, 4, 50, 50);
      var material = new THREE.MeshNormalMaterial();
      material.side = THREE.DoubleSide;

      const shadMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
	  resolution: { value: new THREE.Vector2() }
	},
	vertexShader: vert_sinnoise,
	fragmentShader: frag_sinnoise,
	side: THREE.DoubleSide,
	blending: THREE.CustomBlending,
	blendSrcAlpha: THREE.ZeroFactor,
      });
      
      var cube = new THREE.Mesh(geometry, material);
      var plane = new THREE.Mesh(plangeom, shadMat).rotateX(-Math.PI/1.5);
      scene.add(plane);
      camera.position.z = 5;
      controls.update();
      var delta = 0.0;
      var animate = function () {
        var fid = requestAnimationFrame(animate);
        setFrameId(fid);
        delta += 0.1;
	plane.material.uniforms.time.value = delta;
        //cube.rotation.x += 0.005;
        //cube.rotation.y += 0.005;
        renderer.render(scene, camera);
	controls.update();
      };
      animate();
    }
    return function cleanup() {
      if(frameId != null) {
        cancelAnimationFrame(frameId);
      }
      if(mount != null) {
        if(rendEl != null) {
          mount.removeChild(rendEl);
        }
      }
    };
  }, [mount]);

  return (
      <div
        ref={(mount) => {setMount(mount)}}
      />
  );
}
//const rootElement = document.getElementById('root');
//ReactDOM.render(<VertexSinDemo />, rootElement);
