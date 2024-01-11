// "use client"
// import React,{useState} from "react";
// import "../../globals.css";
// import axios from "axios";

// const Service = async ({ params }) => {
//   let city="";
//   let service = {};
//   let res = await fetch(
//     `http://localhost:4000/services/serviceDetails/${params.id}`
//   );
//   let serviceDetails = await res.json();
//   // if (typeof window !== "undefined") {
//   //   // Perform localStorage action
//   //   city = localStorage.getItem("city");
//   //    service = JSON.parse(localStorage.getItem("selectedService"));
//   // }
  
//   const [orderItem, setORderItem] = useState([]);
//   // const [serviceDetails, setServiceDetail] = useState({});
   
//   let val = {
//     serviceId: 1,
//     serviceName: "Full House Cleaning",
//     pastBooking: "20k",
//     rating: 4,
//     servicesList: [
//       {
//         id: 21,
//         subService: "Furnished Apartment",
//         description:
//           "Deep Cleaning;Wiping and mopping of complete floor area, wall dusting;Furniture and appliances dusting and wet wiping",
//         price: "2,399",
//         isAdded: false,
//       },
//       {
//         id: 22,
//         subService: "Unfurnished Apartment",
//         description:
//           "Deep Cleaning;Wiping and mopping of complete floor area;Cobweb removal and wall dry dusting;Furniture and appliances dusting and wet wiping",
//         price: "1,999",
//         isAdded: false,
//       },
//     ],
//   };
//   const orderSum = (orderItem) => {
//     console.log(orderItem)
//     const initialValue = 0;
//     const totalAmount = orderItem.reduce(
//       (accumulator, currentValue) => accumulator + parseInt(currentValue.price.replace(',', '')),
//       initialValue
//     );
//     return String(totalAmount).replace(/(\d)(?=(\d\d)+\d$)/g, "$1,");
//   },
//   handleAdd = (e, itemObj) => {
//     e.preventDefault();
//     console.log(itemObj);
//     let orderItemDup = [...orderItem];
//     const found = orderItem.some(el => el.id == itemObj.id);
//     console.log(found)
    
//   if (!found) {
   
//     orderItemDup.push(itemObj);
//      console.log(itemObj);
//     setORderItem(orderItemDup);
//   }
//   // else orderItem
  
//   };
//   return (
//     <div>
//       <h2>service</h2>
//       <div className="service-layout">
//         <h2 className="service-header">
//           Best {params.serviceName} in  {city}
//         </h2>
//         <div className="serviceCat-block">
//           <div className="service-card">
//             <h3 className="service-card-header">
//               {serviceDetails.serviceName}
//             </h3>

//             {(serviceDetails.servicesList || []).map((subSer) => {
//               console.log(subSer);
//               let description = subSer.description.split(";");
//               return (
//                 <div className="detail-flex" key={subSer.id + 1}>
//                   <div className="serDet-desc">
//                     <h3>{subSer.subService}</h3>
//                     <ul key={subSer.id + 2} className="list-disc list-inside">
//                       <li>{description[0]}</li>
//                       <li>{description[1]}</li>
//                       <li>{description[2]}</li>
//                     </ul>
//                   </div>
//                   <div className="amt-desc">
//                     <div className="service-amt">
//                       <span>&#8377; </span>
//                       {subSer.price}
//                     </div>
//                     <div>
//                       <button
//                         type="button"
//                         className="service-btn"
//                         onClick={(e) => {
//                           handleAdd(e, subSer);
//                         }}
//                       >
//                         {subSer.isAdded ? "Added" : "Add"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {orderItem && orderItem.length > 0 && (
//             <div className="order-card">
//               <h2 className="order-card-header">Order Summary</h2>
//               {/* <table> */}
//               {(orderItem || []).map((order) => {
//                 console.log(order);
//                 return (
//                   <div className="order-card-body">
//                     <div>
//                       <p>{order.subService}</p>
//                     </div>
//                     <div>
//                       <p>
//                         <span>&#8377; </span> {order.price}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//               <div className="order-card-total order-card-body">
//                 <p>Total Amount</p>
//                 <p>
//                   <span>&#8377;</span>
//                   {orderSum(orderItem)}
//                 </p>
//               </div>
//               <div className="order-card-footer">
//                 <button type="button">Proceed</button>
//               </div>
//               {/* </table> */}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   ); 
// };
// export default Service;
