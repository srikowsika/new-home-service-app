import React from "react";
import Location from "./location";


const Header = async () => {
  const res = await fetch("http://localhost:4000/city");
    let cityList = await res.json();
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