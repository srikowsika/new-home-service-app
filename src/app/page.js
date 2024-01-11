"use client"
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Review from "./review";
import axios from 'axios';
import { useRouter } from "next/navigation";

export default function Home() {
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null),
    [selectedLocation, setLocation] = useState("Location"),
    [cityList, setCityList] = useState([]);
    const router = useRouter();
 const reviewList = [
     {
       id: 1,
       userName: "Jackey Dask",
       message: `These guys saved a lot of my time, I didn't have to bother about booking for the carpenter, plumber, electrician separately. They took the project and trust me, the prices offered were very competitive. good job NoBroker`,
       serviceName: "Home Renovation",
     },
     {
       id: 2,
       userName: "Khunal Dua",
       message: `These guys saved a lot of my time, I didn't have to bother about booking for the carpenter, plumber, electrician separately. They took the project and trust me, the prices offered were very competitive. good job NoBroker`,
       serviceName: "Painting",
     },
       {id: 3,
       userName: "Khunal Dua",
       message: `These guys saved a lot of my time, I didn't have to bother about booking for the carpenter, plumber, electrician separately. They took the project and trust me, the prices offered were very competitive. good job NoBroker`,
       serviceName: "Painting",
     },
   ];
 const services = [
   {
     name: "Electrician",
     routeSrc: "Electrician",
     id: 1,
     srcURL: "/electrician.png",
     offDesc: "Flat 10% off",
   },
   { name: "Plumbing", routeSrc: "Plumbing", id: 20, srcURL: "/plumber.png" },
   {
     name: "AC Service & Repair",
     routeSrc: "AC",
     id: 3,
     srcURL: "/ACService.png",
     offDesc: "Flat 10% off",
   },
   { name: "Home Cleaning", routeSrc: "Cleaning", id: 4, srcURL: "/hcs.png" },
   { name: "Home Renovation", id: 5, srcURL: "/bcs.png" },
   {
     name: "Tempo Service",
     id: 9,
     routeSrc: "temoService",
     srcURL: "/moverService.png",
     offDesc: "Starts @599",
   },
   { name: "Painting", routeSrc: "Painting", id: 6, srcURL: "/paintService.png" },
   {
     name: "Sofa Service",
     routeSrc: "Sofa",
     id: 7,
     srcURL: "/sofa.jpg",
     offDesc: "Upto 25% off",
   },
   {
     name: "Packers & Movers",
     routeSrc: "packers-movers",
     id: 8,
     srcURL: "/moverService.png",
   },
   {
     name: "Carpentry",
     routeSrc: "carpentry",
     id: 10,
     srcURL: "/carpentry.png",
     offDesc: "Flat 20% off",
   },
 ];
 useEffect(() => {
    // getCityData();
 },[]);
 
const selectCity = (selectedValue) => {
  console.log(selectedValue);
  setOpen(false)
  setLocation(selectedValue.city)
   localStorage.setItem("city", selectedValue.city);
},
getServiceCategory = () => {
   let data = axios
     .get("http://localhost:4000/services")
     .then((res) => {
       console.log(res.data);
     })
     .catch((err) => {
       console.log(err);
     });
},
getCityData = () => {
  let data = axios.get("http://localhost:4000/city")
  .then(res => {
    console.log(res.data)
    setCityList(res.data);
     if (typeof window !== "undefined") {
       // Perform localStorage action
      localStorage.setItem("cityList", JSON.stringify(res.data));
     }
    
  })
  .catch(err => {
    console.log(err)
  })
}
  return (
    <>
      {/* <Header
        locationModal={true}
        // handleLocationModal={() => {
        //   setOpen(true);
        // }}
        // location={selectedLocation}
        cityList={cityList}
      /> */}
      <div className="section1">
        {" "}
        <div className="service-list">
          {services.map((service) => {
            return (
              <div
                key={service.id}
                className="service-block"
                onClick={() => {
                  localStorage.setItem(
                    "selectedService",
                    JSON.stringify(service)
                  );
                  router.push(`/service/${service.routeSrc}/${service.id}`);
                }}
              >
                <Image
                  src={service.srcURL}
                  alt={service.name}
                  width="50"
                  height="50"
                />
                <p className="service-name">{service.name}</p>
                {service.offDesc && service.offDesc != "" && (
                  <p className="offer-desc">{service.offDesc}</p>
                )}
              </div>
            );
          })}
        </div>
        <div className="offer-zone">
          <h2 className="card-header">Offers for you</h2>
          <div className="card">
            <p className="card-offer">Same day delivery</p>
            <div className="card-body">
              <div className="card-desc"> Flat 30% off on Rental agreement</div>
              <div className="card-img"></div>
            </div>
            <button className="card-btn">Create Agreement</button>
          </div>
          {/* <div className="card">
            <p className="card-offer">Same day delivery</p>
            <div className="card-body">
              <div className="card-desc"> Flat 30% off on Rental agreement</div>
              <div className="card-img"></div>
            </div>
            <button className="card-btn">Create Agreement</button>
          </div> */}
          <div className="card">
            <p className="card-offer">Festive Sale</p>
            <div className="card-body">
              <div className="card-desc">Flat 25% off on Home Painting</div>
              {/* <div className="card-img">
                <Image src="C:\Users\srikowsika.guna\workspace\ui\home-service-app\src\image\banner-clip.svg"></Image>
              </div> */}
            </div>
            <button className="card-btn">Explore Now</button>
          </div>
        </div>
      </div>
      <Review review={reviewList} />
    </>
  );
}


