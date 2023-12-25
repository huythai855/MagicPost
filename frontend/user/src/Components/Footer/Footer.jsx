import React from "react"
import './footer.css'
import { PiFinnTheHumanDuotone } from "react-icons/pi"
import { ImFacebook } from "react-icons/im"
import { BsTwitter } from "react-icons/bs"
import { AiFillInstagram } from "react-icons/ai"

const Footer = () => {
    return (
        <div className="footer">
            <div className="secContainer container grid">
                <div className="logoDiv">
                    <div className="footerLogo">
                        <a href="#" className="logo flex">
                            <h1 className="flex"> <PiFinnTheHumanDuotone className="icon"/>
                            MagicPost</h1>
                        </a>
                    </div>

                    <div className="socials flex">
                        <ImFacebook className="icon"/>
                        <BsTwitter className="icon"/>
                        <AiFillInstagram className="icon"/>
                    </div>

                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Information
                    </span>
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Explore</a>
                    </li>
                    <li>
                        <a href="#">Travel & Conditions</a>
                    </li>
                    <li>
                        <a href="#">Privacy</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Contact Us
                    </span>

                    <span className="phone">+0123456789</span>
                    <span className="email">email@gmail.com</span>
                </div>

            </div>

        </div>
    )
}

export default Footer