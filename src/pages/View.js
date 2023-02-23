import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    fetch(`https://63f7496be8a73b486af48628.mockapi.io/contact/${id}`, {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setUser(data))
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>User Contact Detail</p>
        </div>
        <div className="container">
          <strong>Id:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{user.email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <Link to="/">
            <button className="btn btn-edit">Go Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
