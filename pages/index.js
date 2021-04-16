import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Fluids from '../src/Fluids'

export default function Home() {
  return (
    <div>
      <h1>Joe who?</h1>
      <div className={styles.container}>
        <Fluids></Fluids>  
      </div>
    </div>
  )
}
