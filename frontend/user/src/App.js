import React from "react"
import './app.css'
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Components/Home/Home"
import About from "./Components/About/About"
import Blog from "./Components/Blog/Blog"

import Footer from "./Components/Footer/Footer"

const App = () => {
    return (
        <>
        <Navbar/>
        <Home/>
        <About/>
        <Blog/>
        {/* <Main/> */}
        <Footer/>
        </>
    )
}
export default App