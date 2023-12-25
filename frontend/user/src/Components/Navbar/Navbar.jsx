import React, {useState} from "react"
import './navbar.css'
import { LuPackageCheck } from "react-icons/lu"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { RxDragHandleDots2 } from "react-icons/rx"


const Navbar = () => {

    const [active, setActive] = useState('navBar')
    //toggle navBar
    const showNav = () =>{
        setActive('navBar activeNavbar')
    }

    //remove navbar
    const removeNavbar = () =>{
        setActive('navBar')
    }

    return (
        <section className = 'navBarSection'>
            <header className="header flex">

                <div className="logoDiv">
                    <a href="#" className="logo flex">
                        <h1>< LuPackageCheck className="icon"/> MagicPost </h1>
                    </a>
                </div>

                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="#" className="navLink">Trang chủ</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Tra cứu</a>
                        </li>
                        <li className="navItem">
                            <a href="#" className="navLink">Tin tức</a>
                        </li>

                    </ul>

                    <div onClick={removeNavbar}
                    className="closeNavbar">
                    <IoIosCloseCircleOutline className="icon"/>
                    </div>
                </div>

                <div onClick={showNav}
                className="toggleNavbar">
                    <RxDragHandleDots2 className="icon"/>
                </div>
                
            </header>
        </section>
    )
}
export default Navbar