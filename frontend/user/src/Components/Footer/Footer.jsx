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
                            <h1 className="flex"> 
                            Kết nối với MagicPost</h1>
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
                        Về MagicPost
                    </span>
                    <li>
                        <a href="#">Giới thiệu</a>
                    </li>
                    <li>
                        <a href="#">Tin tức</a>
                    </li>
                    <li>
                        <a href="#">Mạng lưới bưu cục</a>
                    </li>
                    <li>
                        <a href="#">Tuyển dụng</a>
                    </li>
                    <li>
                        <a href="#">Hợp tác</a>
                    </li>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Liên hệ
                    </span>

                    <span className="phone">+0123456789</span>
                    <span className="email">email@gmail.com</span>
                </div>

                <div className="footerLinks">
                    <span className="linkTitle">
                        Hỗ trợ khách hàng
                    </span>
                    <li>
                        <a href="#">Chat online</a>
                    </li>
                    <li>
                        <a href="#">Hướng dẫn sử dụng dịch vụ</a>
                    </li>
                    <li>
                        <a href="#">Điều khoản sử dụng</a>
                    </li>
                    <li>
                        <a href="#">Chính sách vận chuyển</a>
                    </li>
                </div>

            </div>

        </div>
    )
}

export default Footer