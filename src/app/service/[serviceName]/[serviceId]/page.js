"use client";
import React, { useEffect , useState} from "react";
import AddOrder from "./AddOrder";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import "../../globals.css";
// import axios from "axios";

const Service =  ({ params }) => {
  let city = "";
  let service = {};
  console.log(params);
  const router = useRouter();
//   console.log(serviceDetails[0]);
//   serviceDetails = serviceDetails.length > 0? serviceDetails[0] : [];
//   let orderItem=[];
  
    useEffect(() => {
// console.log("kkkkkkkkkkkkkkkkk");
        getServiceDetails();
    },[])
    const getServiceDetails = async () => {
        console.log("ksajdfkjahs")
        let res = await fetch(
      `http://ec2-65-1-132-135.ap-south-1.compute.amazonaws.com:4000/services/serviceDetails/${params.serviceId}`
    );
    //   console.log(res)
    let serviceDetailRes= await res.json();
    console.log(serviceDetailRes);
    setServiceDetail(serviceDetailRes[0]);
    }
  // if (typeof window !== "undefined") {
  //   // Perform localStorage action
  //   city = localStorage.getItem("city");
  //    service = JSON.parse(localStorage.getItem("selectedService"));
  // }
    const today = new Date();
  const [orderItem, setORderItem] = useState([]);
  const [serviceDetails, setServiceDetail] = useState([]);
  const [orderConfirm, setOrderConfirmModal] = useState(false);
  const [confirmDate, setOrderDate] = useState(today);

  const orderSum = (orderItem) => {
      console.log(orderItem);
      const initialValue = 0;
      const totalAmount = orderItem.reduce(
        (accumulator, currentValue) =>
          accumulator + parseInt(currentValue.price.replace(",", "")),
        initialValue
      );
      return String(totalAmount).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
    },
    handleAdd = (e, itemObj) => {
      e.preventDefault();
      console.log(itemObj);
      let orderItemDup = [...orderItem];
      const found = orderItem.some((el) => el.id == itemObj.id);
      console.log(found);

      if (!found) {
        orderItemDup.push(itemObj);
        console.log(itemObj);
        setORderItem(orderItemDup);
      }
      // else orderItem
    },
    handleOrderConfirmation = (e, orderItem) => {
        console.log(orderItem)
        e.preventDefault();
        setOrderConfirmModal(true);
    },
    confirmOrder = async (e) => {
        e.preventDefault();
        console.log(confirmDate);
        let details = {
            confirmDate: confirmDate,
            orderedItem: orderItem,
            address: ""
        }
        let res = await fetch(`http://ec2-65-1-132-135.ap-south-1.compute.amazonaws.com:4000/order/addOrder`, {
          method: "post",
          body: JSON.stringify(details),
        });
        let orderList = res.json();
        console.log(orderList)
         router.push(`/`);
    };
  return (
    <div>
      <h2>service</h2>
      <div className="service-layout">
        <h2 className="service-header">
          Best {params.serviceName} in {city}
        </h2>
        <div className="serviceCat-block">
          {orderConfirm ? (
            <div>
              <div className="order-box">
                <h2 className="order-header">Schedule your Service</h2>
                <div className="order-body">
                  <div className="order-card-img">
                    <Image
                      // fill={true}
                      src={"/userImg.png"}
                      width={70}
                      height={70}
                      alt={"userImg"}
                    ></Image>
                    <small>Best Available Professtional</small>
                  </div>
                  <label>Sechedule your date</label>
                  {/* <span> */}
                  <input
                    type="date"
                    id="confirm-date"
                    name="confirmDate"
                    className="date-input"
                    placeholder=""
                    min={`${today.getFullYear()}-${(today.getMonth() + 1)
                      .toString()
                      .padStart(2, "0")}-${today.getDate()}`}
                    onChange={(e) => {setOrderDate(e.target.value)}}
                  ></input>

                  {/* </span> */}
                  {/* <Location /> */}
                </div>
                <div className="order-footer">
                  <p>
                    {" "}
                    <span>&#8377;</span>
                    {orderSum(orderItem)}{" "}
                    <small>({orderItem.length} service/s included)</small>
                  </p>
                  <button onClick={(e) => {confirmOrder(e);}}>Confirm</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="service-card">
              <h3 className="service-card-header">
                {serviceDetails.serviceName}
              </h3>

              {(serviceDetails.subServices || []).map((subSer) => {
                console.log(subSer);
                let description = subSer.description.split(";");
                return (
                  <div className="detail-flex" key={subSer.id + 1}>
                    <div className="serDet-desc">
                      <h3>{subSer.subService}</h3>
                      <ul key={subSer.id + 2} className="list-disc list-inside">
                        {description.map((desc, index) => (
                          <li key={index}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="amt-desc">
                      <div className="service-amt">
                        <span>&#8377; </span>
                        {subSer.price}
                      </div>
                      <div>
                        {/* <AddOrder subSer={subSer} handleAdd ={handleAdd}/> */}
                        <button
                          type="button"
                          className="service-btn"
                          onClick={(e) => {
                            handleAdd(e, subSer);
                          }}
                        >
                          {subSer.isAdded ? "Added" : "Add"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {orderItem && orderItem.length > 0 && (
            <div className="order-card">
              <h2 className="order-card-header">Order Summary</h2>
              {/* <table> */}
              {(orderItem || []).map((order, index) => {
                console.log(order);
                return (
                  <div className="order-card-body" key={index}>
                    <div>
                      <p>{order.subService}</p>
                    </div>
                    <div>
                      <p>
                        <span>&#8377; </span> {order.price}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div className="order-card-total order-card-body">
                <p>Total Amount</p>
                <p>
                  <span>&#8377;</span>
                  {orderSum(orderItem)}
                </p>
              </div>
              {!orderConfirm && (
                <div className="order-card-footer">
                  <button
                    type="button"
                    onClick={(e) => {
                      handleOrderConfirmation(e, orderItem);
                    }}
                  >
                    Proceed
                  </button>
                </div>
              )}
              {/* </table> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Service;
