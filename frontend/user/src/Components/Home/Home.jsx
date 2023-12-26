import React, { useState } from 'react'
import { useEffect } from 'react';
import './home.css'
import img from '../../Image/back_gr.png'
import { FcInspection } from "react-icons/fc";
import axios from "axios"
import OfficeInfo from '../OfficeInfo/OfficeInfo';
// import Aos from 'aos'
// import 'aos/dist/aos.css'

const Home = () => {

    // useEffect(() =>{
    //     Aos.init({duration: 2000})
    // }, [])
    const host = "https://provinces.open-api.vn/api/";
    const [provinces, setProvinces] = useState();
    const [selectedProvince, setSelectedProvince] = useState("");

    const [listOffice, setListOffice] = useState([]);

    const office = "https://6586f3f1468ef171392f0aae.mockapi.io/office";
    const [position, setPosition] = useState([]);
    const [input, setInput] = useState("");
    const [id, setId] = useState([]);
    const [show, setShow] = useState(false);

    const [showList, setShowList] = useState(false);


    useEffect(() => {
      const fetchPosition = async () => {
        try {
          const response = await axios.get("https://65774346197926adf62dd4cd.mockapi.io/package/search/?id=" + id);
          setPosition(response.data[0]);
          console.log(response.data[0])
        } catch (error) {
          console.error("Error fetching position:", error);
        }
      };
      fetchPosition();
    }, [id]);

    const handleInputChange = (event) => {
      setInput(event.target.value);
    };

    const handleIdSubmit = () => {
      setId(input);
      setShow(true);
    };

    const handleProvinceSubmit =() => {
      //setSelectedProvince(provinces);
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
  
    useEffect(() => {
      //if (selectedProvince) {
        const fetchOffice = async () => {
          try {
            const response = await axios.get(office);
            console.log(response, 'oo');
            setListOffice(response.data);
          } catch (error) {
            console.error("Error fetching office:", error);
          }
        };
  
        fetchOffice();
     // }
    }, []);
  
    const handleProvinceChange = (event) => {
      const selectedProvinceCode = event.target.value;
      setSelectedProvince(selectedProvinceCode);
    };
  
    const renderOptions = (array) => {
      if (array === provinces) {
        return array.map((element) => (
          <option key={element.code} value={element.code}>
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
                              <div className="homeCard">
                              
                                      <label htmlFor="code"></label>
                                      <input type="text" placeholder="Mã đơn hàng" onChange={handleInputChange}/>
                                      <button className="btn"
                                      onClick = {handleIdSubmit}>
                                          Tra cứu
                                      </button>

                                      {position ? (
                                      <>
                                        {show && (() => {
                                          let keys = Object.keys(position);
                                          let items = [];
                                          for(let i = 0; i < position.order; i++) {
                                            items.push(
                                            <li 
                                              style={{
                                                color: 'black',
                                              }}
                                            > 
                                              <FcInspection 
                                                className='icon'
                                                style={{
                                                  marginTop: 2
                                                }}
                                              />
                                              {position[keys[i]]}
                                            </li>
                                          );
                                          }
                                          
                                          return <ul className='list'>{items}</ul>;
                                        })()}
                                      </>
                                    ) : (
                                      <>Loading...</>
                                    )}
                                      


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
                                  

                                  { showList && <div
                                  style={{
                                    overflow:'hidden',
                                    height: '10rem'}}>
                                    <ul
                                  style={{
                                    overflowY : 'scroll',
                                    height: '100%'
                                  }}
                                  >
                                    {
                                      showList && listOffice.map(item => (
                                        <li 
                                        key={item.id}
                                        >
                                          <OfficeInfo name={item.name} location={item.location} phone={item.phone} />
                                          {/* {item.name} <br/>
                                          {item.location} <br/>
                                          {item.phone} */}
                                        </li>
                                      ))
                                    }
                                  </ul>
                                  </div>}

                                  

                                  {/* { listOffice ? (
                                      <>
                                        {showList && listOffice.map((item) => {
                                          <li key={listOffice.id}> {item.location}</li>
                                        }       
                                        )}
                                      </>
                                    ) : (
                                      <>Loading...</>
                                    )} */}

                              </div>
                          </div>
                      </div>
                      
                  </div>
                </div>
            </div>

        </section>
    )
}

export default Home