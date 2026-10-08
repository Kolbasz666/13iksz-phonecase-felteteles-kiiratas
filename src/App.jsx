import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Footer from './components/Footer'
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  return (
    <>
      <Header text={"Phonecases"}></Header>
      <Main></Main>
      <Footer name={"Nagy Krisztian"} className={"13/k"}></Footer>
    </>
  )
}

export default App
