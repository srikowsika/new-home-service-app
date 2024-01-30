'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import { useRouter } from "next/navigation";
// import constantList from "./constant/config.json"

const ServiceList = () => {
    const API_URL =  "https://home-service-app.click";
    const  [services, setServiceDetailS] = useState([]);
    const router = useRouter();
    useEffect(() => {
        getServiceCategory();
    },[])
   const getServiceCategory = async () => {
        let data = await fetch(`${API_URL}/services`)
        let service = await data.json();
        setServiceDetailS(service)
     };
  return (
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
  )
}

export default ServiceList