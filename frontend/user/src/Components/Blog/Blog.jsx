import React from "react"
import './blog.css'

import img from '../../Image/blog.png'
import img1 from '../../Image/blog1.png'
import img2 from '../../Image/blog2.png'
import img3 from '../../Image/blog3.png'


const Post = [
    {
        id: 1,
        postImage: img,
        title: 'FEEDBACK CỦA KHÁCH HÀNG',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận.'
    },
    {
        id: 2,
        postImage: img1,
        title: 'HƯỚNG DẪN SỬ DỤNG DỊCH VỤ - MAGICPOST',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. '
    },
    {
        id: 3,
        postImage: img2,
        title: 'DANH SÁCH DỊCH VỤ HỖ TRỢ',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. '
    },
    {
        id: 4,
        postImage: img3,
        title: 'BẢNG GIÁ DỊCH VỤ - MAGICPOST',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. '
    }
]

const Blog = () => {
    return (
        <section className="blog container section">
            <div className="secContainer">
                <div className="secIntro">
                    <h2 className="secTitle">
                        Tin tức mới
                    </h2>

                </div>

                <div className="mainContainer grid">
                    {
                        Post.map(({id, postImage, title, desc})=>{
                            return (
                                <div className="singlePost grid">
                                <div className="imgDiv">
                                    <img src={postImage} alt={title} />
                                </div>
        
                                <div className="postDetails">
                                    <h3>
                                        {title}
                                    </h3>
                                    <p>{desc}</p>
                                </div>       
                                <a href="#" className="flex">
                                    Đọc thêm
                                </a>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
export default Blog