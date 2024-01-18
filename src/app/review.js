"use client";
import React from "react";
import Image from "next/image";
// import user from "/userImg.png"

const Review = ({review}) => {
  return (
    <div className="section2">
      <h2 className="section-header">Customer Reviews</h2>
      <div className="review-block">
        {review.map( ( reviewItem,index) => {
            return (
              <div className="review-card" key={index}>
                <div className="card-header">
                  <Image
                    // fill={true}
                    alt="user"
                    src={"/userImg.png"}
                    width={50}
                    height={50}
                    className="review-card-img"
                  ></Image>
                  <div><p>{reviewItem.userName}</p>
                  <p className="ser-desc">{reviewItem.serviceName}</p></div>
                </div>
                <div className="card-body">
                  <p>{reviewItem.message}</p>
                </div>
              </div>
            );
        })}
        
      </div>
    </div>
  );
};
export default Review;
