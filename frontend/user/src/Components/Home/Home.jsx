import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css'
import img from '../../Image/back_gr.png'
import imgLogo from '../../Image/imgLogo.png'
import { FcInspection } from "react-icons/fc";
import ImageSlide from '../ImageSlide/ImageSlide';
import { FaLocationDot } from "react-icons/fa6";

import axios from "axios"
import OfficeInfo from '../OfficeInfo/OfficeInfo';
// import Aos from 'aos'
// import 'aos/dist/aos.css'

const Home = () => {

  const host = "https://provinces.open-api.vn/api/";
  const [provinces, setProvinces] = useState();
  const [selectedProvince, setSelectedProvince] = useState("");
  const [listOffice, setListOffice] = useState([]);

  const [submitProvince, setSubmitProvince] = useState("");

  const officeAPI = "http://localhost:3001/api/search/transaction_point";
  const [position, setPosition] = useState([]);
  const [input, setInput] = useState("");
  const [id, setId] = useState('');
  const [show, setShow] = useState(false);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const fetchPosition = async () => {
      const body = {
        id: id
      };
      if (id !== undefined) {
        try {
          const response = await axios.post('http://localhost:3001/api/search', body,
            { headers: { "Content-Type": "application/json; charset=UTF-8" } }
          );
          setPosition(response.data);
          console.log(response.data)
          //console.log('1234');
        }
        catch (error) {
          console.error("Error fetching position:", error);
        }
      }
    };
    fetchPosition();
  }, [id]);

  useEffect(() => {
    const fetchOffice = async () => {
      const body = {
        city: submitProvince
      };

      try {
        const response = await axios.post(officeAPI, body,
          { headers: { "Content-Type": "application/json; charset=UTF-8" } }
        );

        setListOffice(response.data);
        console.log(response.data)
        //console.log('12345');
      } catch (error) {
        console.error("Error fetching position:", error);
      }

    };
    fetchOffice();
  }, [submitProvince]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleIdSubmit = () => {
    setId(parseInt(input));
    console.log(id);
    if (id !== undefined) {
      setShow(true);
    }

  };

  const handleProvinceSubmit = () => {
    // setProvinces(provinces);
    // console.log(provinces.name);
    setSubmitProvince(selectedProvince);
    //console.log(selectedProvince);
    setShowList(true);
  }

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(host + "?depth=1");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    //console.log(event.target.value);
    // const selectedProvince = event.target.value;
    // setSelectedProvince(selectedProvinceCode);
  };

  const renderOptions = (array) => {
    if (array === provinces) {
      return array.map((element) => (
        <option key={element.code} value={element.name}>
          {element.name}
        </option>
      ));
    } else {
      return array.map((element) => (
        <option key={element.code} value={element.name}>
          {element.name}
        </option>
      ));
    }
  };

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  }

  return (
    <section className="home">
      <div className="homeContent container">

        <div className='bgr'>
          <img src={img} alt="image" />
        </div>
        {/* {<ImageSlide />} */}

        <div className="searchBox">
          <div className="tab grid">
            <div className="tab-headers">
              <button
                className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(1)}
              >Tra cứu vận đơn</button>
              <button
                className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                onClick={() => toggleTab(2)}
              >Bưu cục gần bạn</button>
            </div>

            <div className="content-tabs">
              <div
                className={toggleState === 1 ? "content active-content" : "content"} >
                <div className="homeCard grid">

                  <div className='searchOffice'>
                    <h3>Mã phiếu gửi hàng </h3>
                    <p>Nhập mã đơn hàng cần tra cứu</p>
                    <label htmlFor="code"></label>
                    <input type="text" placeholder="Mã đơn hàng" onChange={handleInputChange} />
                    <button className="btn"
                      onClick={handleIdSubmit}>
                      Tra cứu
                    </button>

                    <div className='listPosition'>
                      {position ? (
                        <>
                          {show && (() => {
                            let keys = Object.keys(position);
                            let items = [];
                            let temp = "{}";

                            //console.log(position.detail)

                            if (position.detail !== undefined) {
                              temp = JSON.parse(position.detail)
                              if (position.stage >= 0) {
                                items.push(temp.stage[0].name + " vào ngày " + temp.stage[0].time)

                              }

                              if (position.stage >= 2) {
                                items.push(temp.stage[2].name + "\n vào ngày " + temp.stage[2].time)

                              }

                              if (position.stage >= 4) {
                                items.push(temp.stage[4].name + "\n vào ngày " + temp.stage[4].time)

                              }

                              if (position.stage >= 6) {
                                items.push(temp.stage[6].name + "\n vào ngày " + temp.stage[6].time)
                                items.push("Đơn hàng của bạn đã giao thành công")

                              }

                            }


                            // items.push(position.detail[2].id)
                            // items.push(position.detail[4].id)
                            // items.push(position.detail[6].id)

                            // items.push(1)
                            // items.push(2)
                            // items.push(3)
                            // items.push(4)

                            // for(let i = 0; i < position.state; i++) {
                            //   items.push(
                            //   <li 
                            //     // style={{
                            //     //   color: 'black',
                            //     //   width: '100%'
                            //     // }}
                            //   > 
                            //     {/* <FcInspection 
                            //       className='icon'
                            //       style={{
                            //         //marginTop: '1.5rem'
                            //       }}
                            //     /> */}
                            //     Đơn hàng của bạn đã đến
                            //     &nbsp;
                            //     {position[keys[i]]}

                            //   </li>
                            // );
                            // }
                            return (
                              <div className='info grid'>
                                <div className='infoPerson'>
                                  <ul>
                                    <h3>Thông tin người gửi:</h3>
                                    <li>Người gửi: {position.sender_name}</li>
                                    <li>Địa chỉ gửi: {position.sender_address}</li>
                                    <li>SĐT người gửi: {position.sender_tel_number}</li>
                                  <br />
                                  </ul>
                                  <ul>
                                    <h3>Thông tin người nhận:</h3>
                                    <li>Người nhận: {position.receiver_name}</li>
                                    <li>Địa chỉ nhận: {position.receiver_address}</li>
                                    <li>SĐT người nhận: {position.receiver_tel_number}</li>
                                  </ul>
                                </div>

                                <ul className='list'>
                                  <h3>Đơn hàng của bạn đã đến</h3>
                                  {items.map((item, index) => (
                                    <li key={index}> <FaLocationDot className='icon'/>{item}</li>
                                  ))}
                                </ul>

                              </div>

                            )

                          })()}
                        </>
                      ) : (
                        <>Loading...</>
                      )}
                    </div>


                  </div>

                  <img src={imgLogo} />

                </div>
              </div>

              <div
                className={toggleState === 2 ? "content active-content" : "content"}>
                <div className="homeCard">
                  <div className='searchO'>
                    <select
                      name=""
                      value={selectedProvince}
                      id="province"
                      //className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={handleProvinceChange}
                    // Other attributes
                    >
                      <option disabled value="">
                        Chọn tỉnh/thành phố
                      </option>
                      {provinces && renderOptions(provinces)}
                    </select>

                    <button
                      onClick={handleProvinceSubmit}
                      className="btn">
                      Tìm kiếm bưu cục
                    </button>
                  </div>

                  <div className='abc'
                  style={{paddingTop: '1rem'}}
                  >

                     {listOffice ? (
                    <>
                    {showList && listOffice.length > 0 && (
                    <div
                      style={{
                        overflow: 'hidden',
                        height: '24.5rem',
                        border: 'solid grey 0.1px',
                        borderRadius: '0.5rem'
                      }}
                    >
                      {/* <h3>Danh sách các bưu cục gần bạn</h3> */}
                      <ul
                        style={{
                          overflowY: 'scroll',
                          height: '100%'
                        }}
                      >
                        {
                          listOffice.map(item => (
                            <li key={item.id}>
                              <OfficeInfo name={item.name} location={item.address} phone={item.city} />
                            </li>
                          ))

                          // listOffice.message !== undefined ? (
                          //   Array.isArray(listOffice) ? (
                          //     listOffice.map(item => (
                          //       <li key={item.id}>
                          //         <OfficeInfo name={item.name} location={item.address} phone={item.city} />
                          //       </li>
                          //     ))
                          //   ) : (
                          //     <div>API response is not an array</div>
                          //   )
                          // ) : (
                          //   <div>API response undefined or empty</div>
                          // )
                        }
                      </ul>
                    </div>
                  )}

                    </>
                    ) : (
                      <><img src={imgLogo}/></>
                    )
                    } 

                  </div>

                  

                </div>
              </div>

            </div>

          </div>

        </div>


      </div>
      {/* </div> */}

    </section>
  )
}

export default Home;