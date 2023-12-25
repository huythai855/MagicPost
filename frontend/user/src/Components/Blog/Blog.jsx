import React from "react"
import './blog.css'

import img from '../../Image/tim-ava.jpg'

const Post = [
    {
        id: 1,
        postImage: img,
        title: 'GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. Hiểu được điều đó, Viettel Post ra mắt Dịch vụ CHUYỂN PHÁT QUÀ TẶNG: GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý, hướng đến giao chuyển an toàn – trọn vẹn những món quà.'
    },
    {
        id: 2,
        postImage: img,
        title: 'GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. Hiểu được điều đó, Viettel Post ra mắt Dịch vụ CHUYỂN PHÁT QUÀ TẶNG: GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý, hướng đến giao chuyển an toàn – trọn vẹn những món quà.'
    },
    {
        id: 3,
        postImage: img,
        title: 'GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. Hiểu được điều đó, Viettel Post ra mắt Dịch vụ CHUYỂN PHÁT QUÀ TẶNG: GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý, hướng đến giao chuyển an toàn – trọn vẹn những món quà.'
    },
    {
        id: 4,
        postImage: img,
        title: 'GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý',
        desc: 'Các dịp lễ Tết cuối năm vừa là thời gian chúc mừng, vừa là thời gian tri ân, bày tỏ sự quan tâm và kết nối các mối quan hệ – đặc biệt là qua những món quà. Những món quà đó không chỉ là vật chất, mà còn chứa đựng tình cảm và tấm lòng dành cho người nhận. Hiểu được điều đó, Viettel Post ra mắt Dịch vụ CHUYỂN PHÁT QUÀ TẶNG: GIAO QUÀ 5 SAO – GỬI TRAO TÂM Ý, hướng đến giao chuyển an toàn – trọn vẹn những món quà.'
    }
]

const Blog = () => {
    return (
        <section className="blog container section">
            <div className="secContainer">
                <div className="secIntro">
                    <h2 className="secTitle">
                        Tin tuc moi
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
                                    Read more
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