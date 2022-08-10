import React from "react";
import "./Connection.css";
function Connection({ data, handleCount }) {
  const imgPath = "./"; //path for images which are stored in public folder
  let todayDate = new Date(); //storing today's date
  let formattedDate = todayDate.toDateString(); // formatting today's date for comparring

  return (
    <div className="connection">
      <div className="img_container">
        {/* {Image section srollable X-axis} */}
        <img src={imgPath + data.userProfile} alt="img" />
        {/* {Span class will be visible when todays date is Equal to Connected Date i.e reffered as New Connection} */}
        {data.connectedOn == formattedDate && <span className="dot"></span>}
      </div>
      <p>{data.userName}</p>
    </div>
  );
}

export default Connection;
