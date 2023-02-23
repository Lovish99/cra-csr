import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./View.css";

const View = () => {
  const initialState = {
    name: "",
    email: "",
    contact: "",
    status: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;
  const { id } = useParams();

  useEffect(() => {
    fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

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
          <span>{name}</span>
          <br />
          <br />
          <strong>Email:</strong>
          <span>{email}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{contact}</span>
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
