import "./App.css";
// import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import About from "./pages/About";
import Search from "./pages/Search";
import InfiniteScroll from "./pages/InfiniteScroll";
import PageInfiniteScroll from "./pages/InfiniteScroll2";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
          <Route path="/InfiniteScroll" element={<InfiniteScroll />} />
          <Route path="/InfiniteScroll2" element={<PageInfiniteScroll />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
