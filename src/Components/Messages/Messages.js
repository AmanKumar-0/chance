import React from "react";
import "./Messages.css";
const Messages = ({ data }) => {
  let imgPath = "./"; //Path for images stored in Public folder
  let length = data.messages.length - 1 || 0; //storing last index of messages so that we can show last message

  return (
    <div className="chats_container">
      <div className="left">
        {/* Image for showing as Profile picture */}
        <img src={imgPath + data.userProfile} alt="img" />
      </div>
      <div className="right">
        <div className="chat_header">
          {/* Username for showing Name  */}
          <h3>
            {data.userName}{" "}
            {data.isAnonymous && <i className="fa-solid fa-masks-theater"></i>}
          </h3>
          {/* {Showing time of Last Message } */}
          <p>{data.messages[length].time}pm</p>
        </div>
        <div className="chat_content">
          {/* {Showing Last text} */}
          <p>{data.messages[length].text}</p>
          {/* Showing unread Messages */}

          {data.messages[length].author === "you" ? (
            <span className="chat_your_turn">
              <i className="fa-solid fa-location-arrow"></i>your Turn
            </span>
          ) : (
            <span className="chat_unreads">{data.messages.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
