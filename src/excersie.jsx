import React, { useEffect, useState } from "react";
import axios from "axios";

const SERVER_URI = "https://fitkit-backend.azurewebsites.net";

const Exercise = () => {
  const [eName, setEName] = useState("");
  const [eRep, setERep] = useState("");
  const [result, setResult] = useState([]);

  const fetchResult = () => {
    axios.get(`${SERVER_URI}/e/all`).then((res) => {
      setResult(res.data.result);
    }, console.error);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${SERVER_URI}/e/add`, { eName, eRep }).then((res) => {
      console.log("The Response: ", res.data);
      // Fetch updated data after adding a new exercise
      fetchResult();
    }, console.error);
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Add an Exercise</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <input
            value={eName}
            onChange={(e) => setEName(e.target.value)}
            type="text"
            placeholder="Exercise"
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="number"
            placeholder="Number of reps"
            value={eRep}
            onChange={(e) => setERep(e.target.value)}
            style={{ padding: "8px", width: "100%" }}
          />
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: "8px",
              width: "100%",
              backgroundColor: "blue",
              color: "white",
              border: "none",
            }}
          >
            Add
          </button>
        </div>
      </form>

      <div>
        <h2 style={{ textAlign: "center" }}>All Exercises</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {result.map((item) => (
            <li
              key={item.id}
              style={{
                borderBottom: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              {item.eName} - {item.eRep}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Exercise;
