import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import * as THREE from 'three';
//import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls';
import { OrbitControls } from '../util/OrbitControls';
import { vert_sin3, frag_sin3 } from '../shaders/shad_sin3';
import { vert_pool, frag_pool } from '../shaders/shad_pool';
import { vert_sinnoise, frag_sinnoise } from '../shaders/shad_sinnoise';
import { vert_head, frag_head } from '../shaders/shad_head';

export default function Header() {
  const [mount, setMount]  = useState(null);
  const [frameId, setFrameId] = useState(null);
  const [rendEl, setRendEl] = useState(null);

  const pool = (l, w, h) => {
    var g_floor = new THREE.PlaneGeometry(4, 4, 2, 2);
    var group = new THREE.Group();
    var material = new THREE.MeshNormalMaterial();
    material.side = THREE.DoubleSide;

    const poolMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
	resolution: { value: new THREE.Vector2() }
      },
      vertexShader: vert_pool,
      fragmentShader: frag_pool,
      side: THREE.DoubleSide,
    });
    
    var floor = new THREE.Mesh(g_floor, poolMat).rotateX(-Math.PI/2).translateZ(-h);
    group.add(floor);

    return group;
  };
  
  useEffect(() => {
    if(mount != null) {
      const clock = new THREE.Clock();
      clock.start();
      var scene = new THREE.Scene();
      var camera = new THREE.OrthographicCamera(window.innerWidth/2, window.innerWidth/-2, window.innerHeight/2, window.innerHeight/-2, 1, 1000);
      var renderer = new THREE.WebGLRenderer();
      var controls = new OrbitControls(camera, renderer.domElement);
      scene.background = new THREE.Color(0xfafaff);
      renderer.setSize(window.innerWidth, window.innerHeight/4);
      //renderer.setSize(500, 500);
      setRendEl(renderer.domElement);
      mount.appendChild(renderer.domElement);
      controls.enableZoom = false;
      var material = new THREE.MeshNormalMaterial();
      material.side = THREE.DoubleSide;

      const shadMat = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 1.0 },
	  resolution: { value: new THREE.Vector2() }
	},
	vertexShader: vert_head,
	fragmentShader: frag_head,
	side: THREE.DoubleSide,
	blending: THREE.CustomBlending,
	blendSrcAlpha: THREE.ZeroFactor,
	transparent: true,
      });

      const phong = new THREE.MeshStandardMaterial();
      
      const loader = new THREE.FontLoader();

      var tmesh = null;
      
      loader.load('./fonts/Terminal Grotesque_Regular.json', function ( font ) {
        const text_geom = new THREE.TextGeometry('Joe who?', {
          font: font,
	  size: 60,
	  height: 5,
	  curveSegments: 12,
	});

        const text_mesh = new THREE.Mesh(text_geom, shadMat).rotateY(Math.PI);;
	tmesh = text_mesh;
	scene.add(tmesh);
      });
      camera.position.z = 1;
      controls.update();
      var delta = 0.0;
      var animate = function () {
        var fid = requestAnimationFrame(animate);
        setFrameId(fid);
        delta += 0.1;
	if(tmesh != null){
	  tmesh.material.uniforms.time.value = delta;
	}
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
