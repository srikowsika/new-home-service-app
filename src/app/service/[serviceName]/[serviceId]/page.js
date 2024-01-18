"use client";
import React, { useEffect , useState} from "react";
import AddOrder from "./AddOrder";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Service =  ({ params }) => {
  const router = useRouter();
  const [alertDetail, setAlertDetail] = useState(null)

    useEffect(() => {
        getServiceDetails();
    },[])
    const getServiceDetails = async () => {
        let res = await fetch(
      `http://ec2-65-1-132-135.ap-south-1.compute.amazonaws.com:4000/services/serviceDetails/${params.serviceId}`
    );
    let serviceDetailRes= await res.json();
    setServiceDetail(serviceDetailRes[0]);
    }
  
    const today = new Date();
  const [orderItem, setORderItem] = useState([]);
  const [serviceDetails, setServiceDetail] = useState([]);
  const [orderConfirm, setOrderConfirmModal] = useState(false);
  const [confirmDate, setOrderDate] = useState(today);

  const orderSum = (orderItem) => {
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
      let orderItemDup = [...orderItem];
      const found = orderItem.some((el) => el.id == itemObj.id);

      if (!found) {
        orderItemDup.push(itemObj);
        setORderItem(orderItemDup);
      }
    },
    handleOrderConfirmation = (e, orderItem) => {
        e.preventDefault();
        setOrderConfirmModal(true);
    },
    confirmOrder = async (e) => {
        e.preventDefault();
        let details = {
            confirmDate: confirmDate,
            orderedItem: orderItem,
            address: ""
        }
        let res = await fetch(`http://localhost:4000/order/addOrder`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(details),
        });
        let orderList = await res.json();
        if(orderList.success) {
          setAlertDetail(orderList);
          setTimeout(() => {
            router.push(`/`);
            setAlertDetail(null)
          }, 3000);
        } else {
          setAlertDetail(orderList);
        }
         
    };
  return (
    <div>
      <h2>service</h2>
      <div>
    
      </div>
      
      <div className="service-layout">
      <div className="alert-block">
      {alertDetail != null && <div className={`p-4 mb-4 text-sm rounded-lg ${!alertDetail.success ? "danger" : "success"}`} role="alert">
  <span className="font-medium">{alertDetail.message}</span> 
</div>}
      </div>
        {/* <h2 className="service-header">
          Best {params.serviceName} in {city}
        </h2> */}
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
