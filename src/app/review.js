// "use client";
// import React,{useEffect, useState} from "react";
// import Image from "next/image";


// const Review = async() => {
//   let reviewRes = await fetch("http://ec2-65-1-132-135.ap-south-1.compute.amazonaws.com:4000/services")
//         let review = await data.json();
//   return (
//     <div className="section2">
//       <h2 className="section-header">Customer Reviews</h2>
//       <div className="review-block">
//         {review.map( ( reviewItem,index) => {
//             return (
//               <div className="review-card" key={index}>
//                 <div className="card-header">
//                   <Image
//                     // fill={true}
//                     alt="user"
//                     src={"/userImg.png"}
//                     width={50}
//                     height={50}
//                     className="review-card-img"
//                   ></Image>
//                   <div><p>{reviewItem.userName}</p>
//                   <p className="ser-desc">{reviewItem.serviceName}</p></div>
//                 </div>
//                 <div className="card-body">
//                   <p>{reviewItem.message}</p>
//                 </div>
//               </div>
//             );
//         })}
        
//       </div>
//     </div>
//   );
// };
// export default Review;
