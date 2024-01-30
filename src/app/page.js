
import React from "react";
import Review from "./review";
import ServiceList from "./serviceList";

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch('https://home-service-app.click/city')
//   const repo = await res.json()
//   console.log(repo)
//   console.log('jsjjshshhhhhhhhhhhhhhh')
//   // Pass data to the page via props
//   return { props: { repo } }
// }

export default function Home() {
 
  return (
    <>
      <div className="section1">
        {" "}
        <ServiceList />
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
          <div className="card">
            <p className="card-offer">Festive Sale</p>
            <div className="card-body">
              <div className="card-desc">Flat 25% off on Home Painting</div>
            </div>
            <button className="card-btn">Explore Now</button>
          </div>
        </div>
      </div>
      {/* <Review  /> */}
    </>
  );
}


