import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";

const Home = () => {
  const [data, setData] = useState({});

  const [selected, setSelected] = useState("Please Select");

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
  }, []);

  const onDelete = async (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      await fetch(`https://63f7496be8a73b486af48628.mockapi.io/contact/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .catch((error) => {
          console.log(error);
        });

      await fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
        method: "GET",
        headers: { "content-type": "application/json" },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => setData(data))
        .catch((error) => {
          console.log(error);
        });

      toast.success("Contact deleted Successfully");
    }
  };

  const handleChange = async (e) => {
    setSelected(e.target.value);
    const url = new URL("https://63f7496be8a73b486af48628.mockapi.io/contact");

    url.searchParams.append("sortBy", e.target.value);

    await fetch(url, {
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
  };
  const handleReset = async () => {
    await fetch("https://63f7496be8a73b486af48628.mockapi.io/contact", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.log(error);
      });

    setSelected("Please Select");
  };

  return (
    <div style={{ marginTop: "100px" }}>
      <div
        style={{
          margin: "0 25%",
        }}
      >
        <label>Sort By: </label>
        <select
          value={selected}
          className="dropdown"
          name="colValue"
          onChange={handleChange}
        >
          <option>Please Select</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="contact">Contact</option>
          <option value="status">Status</option>
        </select>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      {Object.keys(data).length === 0 ? (
        <div
          style={{
            margin: "0 25%",
          }}
        >
          <div style={{ margin: "20px 0px", fontSize: "40px" }}>
            {" "}
            Loading ....
          </div>
        </div>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>
              <th style={{ textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>Contact</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>

          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope="row">{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].status}</td>
                  <td>
                    <Link to={`/update/${data[id].id}`}>
                      <button className="btn btn-edit">Edit</button>
                    </Link>
                    <button
                      className="btn btn-delete"
                      onClick={() => {
                        onDelete(data[id].id);
                      }}
                    >
                      Delete
                    </button>
                    <Link to={`/view/${data[id].id}`}>
                      <button className="btn btn-view">View</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <br />
    </div>
  );
};

export default Home;
