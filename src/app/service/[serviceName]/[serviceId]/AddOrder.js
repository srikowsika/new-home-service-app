// "use client";
import React from 'react'

const AddOrder = (props) => {

    
  return (
    <div>
      <button
        type="button"
        className="service-btn"
        // onClick={(e) => {
        //   props.handleAdd(e, props.subSer);
        // }}
      >
        {props.subSer.isAdded ? "Added" : "Add"}
      </button>
    </div>
  );
}

export default AddOrder