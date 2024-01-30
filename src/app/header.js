import React from "react";
import Location from "./location";

const Header =  async (repo) => {
  const API_URL =  "https://home-service-app.click";
  let cityRes = await fetch(`${API_URL}/city`,{cache: "no-store"})
  let cityList= await cityRes.json();
  return (
    <>
      <div className="header-flex">
        <div>Home Service</div>
        <div className="header-option">
          <Location cityList ={cityList}/>
          <button>My Bookings</button>
        </div>
      </div>
    </>
  );
}
export default Header;