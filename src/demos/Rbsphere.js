import Reeaect, {useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
import { OrbitControls } from '../util/OrbitControls';
import { vert_sin3, frag_sin3 } from '../shaders/shad_sin3';
import { vert_rbsphere, frag_rbsphere } from '../shaders/shad_rbsphere';

export default function RbsphereDemo() {
  const [mount, setMount] = useState(null);
  const [frameId, setFrameId] = useState(null);
  const [rendEl, setRendEl] = useState(null);

  useEffect(() => {
    if(mount != null){
      const clock = new THREE.Clock();
      clock.start();

      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      var renderer = new THREE.WebGLRenderer();
      var controls = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color(0xfafaff);
      renderer.setSize(window.innerWidth/2, window.innerHeight/2);
      setRendEl(renderer.domElement);
      mount.appendChild(renderer.domElement);
      controls.autoRotate = true;
      controls.enableZoom = false;
      const geometry = new THREE.SphereGeometry(2, 16, 16);
      const shadMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
	  resolution: { value: new THREE.Vector2() }
	},

	vertexShader: vert_rbsphere,
	fragmentShader: frag_rbsphere,
	side: THREE.DoubleSide,
	blending: THREE.CustomBlending,
	blendSrcAlpha: THREE.ZeroFactor,
	transparent: true,
      });

      var sphere = new THREE.Mesh(geometry, shadMat);
      sphere.frustumCulled = true;
      scene.add(sphere);
      camera.position.z = 5;
      controls.update();

      var delta = 0.0;
      const animate = function() {
        var fid = requestAnimationFrame(animate);
	setFrameId(fid);
	delta += 0.1;
	sphere.material.uniforms.time.value = delta;
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
    }
  }, [mount]);

  return (
    <div ref={(mount) => {setMount(mount)}}/>
  );
}
