import { useState, useEffect } from "react";
import "./App.css";
import data from "./data.json";
import Connection from "./Components/Connection/Connection";
import Messages from "./Components/Messages/Messages";

function App() {
  const [details, setDetails] = useState(data); //variable for storing Data from Json file
  const [searchData, setSearchData] = useState(""); //variable for storing search input
  const [newConnectionCount, setNewConnectionCount] = useState(0); // variable for storing counts of new Connection

  let todayDate = new Date(); //variable for storing today's date
  let formattedDate = todayDate.toDateString(); //variable for storing today's date in a format so that we can compare date

  //function for filtering data if userName is searched in input then it will filter data according to that else
  //it would filter data for users which have chats
  function searchUser() {
    if (searchData) {
      return details.filter(
        (user) =>
          user.messages.length &&
          user.userName.toLowerCase().includes(searchData.toLowerCase())
      );
    }
    return details.filter((user) => user.messages.length);
  }

  //function for storing the input/searched value and filtering using the above function
  const handleChange = (e) => {
    setSearchData(e.target.value);
    searchUser();
  };

  //function for counting new Connection according to the Date
  const handleCount = () => {
    let count = details.filter(
      (user) => user.connectedOn == formattedDate
    ).length;
    setNewConnectionCount(count);
  };

  //Invoking count first time when the page reloads
  useEffect(() => {
    handleCount();
  }, []);

  return (
    <div className="App">
      <section className="connection__section">
        <div className="connection_header">
          <h3 className="heading">
            New Connection {/* {//displaying count of new connection} */}
            <span className="connection_count">{newConnectionCount}</span>{" "}
          </h3>
        </div>
        <div className="connection_images">
          {details
            .sort((a, b) => (a.connectedOn < b.connectedOn ? 1 : -1)) //sorting and mapping data according to date
            .map((d) => (
              <Connection data={d} key={d.userId} /> //sending data to connection component
            ))}
        </div>
      </section>
      <section className="messages__section">
        <div className="messages__header">
          <h3 className="heading">
            Messages {/* {Displaying count of Messages} */}
            <span className="messages_count">{searchUser().length}</span>
          </h3>
          <div className="messages__search">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="Search"
              value={searchData}
              onChange={(e) => handleChange(e)} //Input for searching and invoking function for filtering data
            />
          </div>
        </div>
        <div className="messages__chats">
          {searchUser().map((d) => (
            <Messages data={d} key={d.userId} /> //Mapping Data who has chats and sending data to Message component
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
