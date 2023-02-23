import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AddEdit.css";
import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  contact: "",
  status: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { name, email, contact, status } = state;

  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact || !status) {
      toast.error("Please provide value in each input field");
    } else {
      if (!id) {
        fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },

          body: JSON.stringify(state),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .catch((error) => {
            console.log(error);
          });

        toast.success("list added Successfully");
      } else {
        fetch(`https://63f7496be8a73b486af48628.mockapi.io/contact/${id}`, {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(state),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .catch((error) => {
            console.log(error);
          });

        toast.success("list updated Successfully");
      }

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name ..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your Email ..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contact</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Your Contact No ..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Your Status ..."
          value={status || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
