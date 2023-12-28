import React, { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { Stacked, Pie, Button } from "../components";
import { earningData, SparklineAreaData, ecomPieChartData } from "../data/data";
import { useStateContext } from "../contexts/ContextProvider";
import TableDonHang from "../components/Table/TableDonHang";

import { useNavigate } from "react-router-dom";
const Overview = () => {
  const [donHangData, setDonHangData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/transaction_point",
          {
            method: "POST",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDonHangData(data);
        } else {
          setError("Error fetching data 1");
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div className="mt-12 ">
      <div className="flex m-3 flex-wrap justify-center gap-5 items-center">
        {earningData.map((item) => (
          <div
            key={item.title}
            className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg
            w-52 p-4 pt-9 rounded-2xl" // Adjusted width and added padding
          >
            <button
              type="button"
              style={{ color: item.iconColor, backgroundColor: item.iconBg }}
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl"
            >
              {item.icon}
            </button>

            <p className="mt-3">
              <span className="text-lg font-semibold">{item.amount}</span>
              <span className={`text-sm text-${item.pcColor} ml-2`}>
                {item.percentage}
              </span>
            </p>
            <p className="mt-1 text-sm text-gray-400">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="flex mt-10 gap-10 flex-wrap justify-center">
        <div
          className="bg-white dark:text-gray-200 
         m-3 p-4 rounded-2xl"
          style={{ width: 890 }}
        >
          <div className="flex justify-between ">
            <p className="font-semibold text-xl capitalize">
              Phân tích doanh số
            </p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Doanh số</span>
              </p>
              <p className="flex items-center gap-2 text-green-400 hover:drop-shadow-xl">
                <span>
                  <GoDotFill />
                </span>
                <span>Lợi nhuận</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex gap-10   justify-center">
            <div className="border-r-1 border-color m-4 pr-10 w-2/5 ml-8">
              <div>
                <p>
                  <span className="text-2xl font-semibold">$93,438</span>
                  <span
                    className="p-1.5 hover:drop-shadow-xl cursor-pointer rounded-full 
                text-white bg-green-600 ml-3 text-xs"
                  >
                    23%
                  </span>
                </p>
                <p className="text-gray-500 mt-1">Lợi nhuận</p>
              </div>
              <div className="mt-8">
                <p>
                  <span className="text-2xl font-semibold">$48,438</span>
                </p>
                <p className="text-gray-500 mt-1">Doanh số</p>
              </div>
            </div>
            <div className="w-3/5">
              <Stacked width="420px" height="360px" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-32 gap-10 flex-wrap justify-center">
        <TableDonHang
          title={"Thống kê"}
          dataSource={donHangData}
          className="w-full"
        />
      </div>
    </div>
  );
  <Outlet />;
};

export default Overview;
