import React, { useState, useEffect } from "react";
import ListPackage from "../components/ListPackage"
const API = "https://65774346197926adf62dd4cd.mockapi.io/package/Danhsachdonhang";
const Shipper = () => {
    const [packages, setPackage] = useState([]);

    const fetchData =  async (url) => {
        try{
            const res = await fetch(url);
            const data = await res.json();
            if(data.length > 0) {
                setPackage(data);
            }
            console.log(data);

        } catch(e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchData(API);
    }, [])
    return <> 
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Người gửi </th>
                    <th>Ngày gửi</th>
                    <th>Điểm đến</th>
                    <th>Loại sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <ListPackage packages = {packages}/>
            </tbody>
        </table>
    </>
}

export default Shipper;