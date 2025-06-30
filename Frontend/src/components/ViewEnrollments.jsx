import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewEnrollments = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/enroll")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Failed to fetch:", err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 className="text-3xl text-center text-bold underline ">All Enrollments</h2>
      {data.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            border: "1px solid gray",
            margin: "10px 0",
            padding: "15px",
            borderRadius: "8px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Father's Name:</strong> {item.fatherName}</p>
            <p><strong>School:</strong> {item.school}</p>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>Number:</strong> {item.number}</p>
            <p><strong>Mark:</strong> {item.mark}</p>
          </div>
          <div style={{ flex: "0 0 200px", marginLeft: "20px" }}>
            <img
              src={item.image}
              alt="Uploaded"
              style={{ width: "100%", borderRadius: "5px", objectFit: "cover" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewEnrollments;
