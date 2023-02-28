import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [activeTab, setActiveTab] = useState("Home");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/add") {
      setActiveTab("AddContact");
    } else if (location.pathname === "/about") {
      setActiveTab("About");
    }
  }, []);

  return (
    <div className="header">
      <p className="logo"> Todo list</p>
      <div className="header-right">
        <Link to="/">
          <p
            className={`${activeTab === "Home" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("Home");
            }}
          >
            Home
          </p>
        </Link>
        <Link to="/add">
          <p
            className={`${activeTab === "AddContact" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("AddContact");
            }}
          >
            Add Todo
          </p>
        </Link>
        <Link to="/about">
          <p
            className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("About");
            }}
          >
            About
          </p>
        </Link>
        <Link to="/InfiniteScroll">
          <p
            //className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("About");
            }}
          >
            Infinite Scroll
          </p>
        </Link>

        <Link to="/InfiniteScroll2">
          <p
            // className={`${activeTab === "About" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("About");
            }}
          >
            Infinite Scroll 2
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
