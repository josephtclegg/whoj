import React, { useEffect } from 'react';
import VertexSinDemo from './demos/VertexSin';
import Sin3Demo from './demos/Sin3';
import Header from './demos/Header';
import { vert_sinnoise, frag_sinnoise } from './shaders/shad_sinnoise';
import { vert_sin3, frag_sin3 } from './shaders/shad_sin3';
import Image from 'next/image';
import Prism from 'prismjs';
import styles from '../styles/Fluids.module.css';
import 'prismjs/components/prism-clike';

export default function Fluids() {
  const t1 = 'I want to make a watery effect using a vertex shader.  This guy uses sin waves to get in motion.'
  const t2 = 'Rendered as a grayscale image.'
  const t3 = 'The shader.'
  const t4 = 'Neato make better yes?  In the ocean you have lots of waves of different amplitudes and frequencies ' +
	'so we can add a couple more of those, we could also do with a nicer fragment shader, something that looks watery.  ' +
	'Let us start  with this effect by interpolating between a water color and a lighter (think broken wave?) color, and ' +
	'adding a little transparency.';
  const t5 = 'sic';
  const t6 = 'We haven\'t included much of a lighting model so that\'s probably where to go from here.';

  useEffect(() => {
      Prism.highlightAll();
  }, []);
	
  return (
      <div className={styles.fluids}>
      <p>{t1}</p>
      <VertexSinDemo></VertexSinDemo>
      <pre>
        <code class="language-clike">
          {vert_sinnoise}
        </code>
      </pre>
      <p>{t3}</p>
      <div className={styles.noise}>
        <Image src="/noise_sin.png" width="512" height="512"/>
      </div>
      <p>{t2}</p>
      <p>{t4}</p>
      <Sin3Demo></Sin3Demo>
      <p>{t5}</p>
      <pre>
        <code class="language-clike">{vert_sin3}</code>
      </pre>
      <p>Vertex Shader</p>
      <pre>
        <code class="language-clike">{frag_sin3}</code>
      </pre>
      <p>Fragment Shader</p>
      <p>{t6}</p>
    </div>
  );
}
