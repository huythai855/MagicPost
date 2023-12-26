import React from "react";
import './OfficeInfo.css'
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaSquarePhone } from "react-icons/fa6";
const OfficeInfo=(props) => {
    const {name, location, phone} = props
    return (
        
    <div className="mainContainer">
        {name} <br/>
        <FaMapMarkerAlt className="icon"/>
        {location} <br/>
        <FaSquarePhone className="icon"/>
        {phone}
        
    </div>
    )
}
export default OfficeInfo;