import React from "react"
import './about.css'

import img from '../../Image/ranking.png'
import img1 from '../../Image/world-wide.png'
import img2 from '../../Image/fast.png'
import img3 from '../../Image/customer-service.png'
import video from '../../Image/delivery.mp4'

const About = () => {
    return (
        <section className="about section">
            <div className="secContainer">

                <div className="mainContent container grid">
                    <div className="singleItem">
                        <img src={img} alt="image" />
                        <p>
                        Top công ty giao nhận hàng đầu VN
                        </p>
                    </div>

                    <div className="singleItem">
                        <img src={img1} alt="image" />
                        <p>
                        Mạng lưới phủ sóng 100% 63 tỉnh thành
                        </p>
                    </div>

                    <div className="singleItem">
                        <img src={img2} alt="image" />
                        <p>
                        Giao hàng nhanh Tỷ lệ hoàn hàng thấp
                        </p>
                    </div>

                    <div className="singleItem">
                        <img src={img3} alt="image" />
                        <p>
                        Hệ thống quản lý trực tuyến 24/7
                        </p>
                    </div>
                </div>

                <div className="videoCard container">
                    <div className="cardContent grid">
                        <div className="cardVideo">
                            <video src={video} autoPlay loop muted type="video/mp4"></video>
                        </div>
                    </div>
                </div>



            </div>
        </section>
    )
}
export default About