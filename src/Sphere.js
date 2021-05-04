import React, { useEffect } from 'react';
import RbsphereDemo from './demos/Rbsphere.js';
import styles from '../styles/Fluids.module.css';
import 'prismjs/components/prism-clike';

export default function Sphere() {

  const t1 = 'For now I\'m interested in making a colorful sphere.';
  const t2 = 'They\'re actually neither a sphere nor colorful.  That\'s okay, ' +
	'I\'m gonna do some lighting stuff soon.';
  
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className={styles.fluids}>
      <p>{t1}</p>
      <RbsphereDemo></RbsphereDemo>
      <p>{t2}</p>
    </div>
  );
    
}
