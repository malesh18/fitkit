import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URI = "https://fitkit-backend.azurewebsites.net";

const Excersie = () => {
  const [eName, setEName] = useState("");
  const [eRep, setERep] = useState("");
  const [result, setResult] = useState([]);

  const fetchResult = () => {
    axios.get(`${SERVER_URI}/e/all`).then((res) => {
      console.log("The Result :", res.data.result);
      setResult(res.data.result);
    }, console.error);
  };

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      console.log(eName, eRep);

      axios(`${SERVER_URI}/e/add`, {
        method: "POST",
        data: { eName, eRep },
      }).then((res) => {
        console.log("The Response : ", res.data);
      }, console.error);
    } catch (e) {
      console.log("Error Occcured : ", e);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <>
      <h1>Add the Excersie</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={eName}
            onChange={(e) => setEName(e.target.value)}
            type="text"
            placeholder="excersies"
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Number of reps"
            value={eRep}
            onChange={(e) => setERep(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <div>
        <h1>All the Excersies</h1>
        <ul>
          {result.map((item) => {
            return (
              <li key={item.id}>
                {item.eName} - {item.eRep}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Excersie;
