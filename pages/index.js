import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Fluids from '../src/Fluids';
import Header from '../src/demos/Header';

export default function Home() {
  return (
    <div>
      <Header></Header>
      <div className={styles.main}>
        <Fluids></Fluids>  
      </div>
    </div>
  )
}
