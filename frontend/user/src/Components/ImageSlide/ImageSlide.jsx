import React from "react";
import 'react-slideshow-image/dist/styles.css'
import {Fade, Zoom, Slide} from 'react-slideshow-image'

const slideImage = [
        '../../Image/back_gr.png',
        '../../Image/back_gr.png',
        '../../Image/back_gr.png'
];

// const fadeProperties = {
//     duration: 5000,
//     transitionDuration: 500,
//     infinite: true,
//     indicators: true,
//     // onChange: (oldIndex, newIndex) => {
//     //   console.log(`fade transition from ${oldIndex} to ${newIndex}`);
//     // }
//   }

const ImageSlide =() => {
    return (
        <div className="slide-container">
            <Fade>
                {slideImage.map((each, index) => 
                    <div key={index} className="each-fade">
                        <div className="image-container">
                            <img src={each}/>
                        </div>
                    </div>                
                )}
            </Fade>
        </div>
    )
}
export default ImageSlide;