import { Fragment, useEffect, useRef, useState } from "react";
import MovieCard from "../components/InfiniteScrolling/MovieCard";
import InfiniteScroll from "react-infinite-scroll-component";

const PageInfiniteScroll = () => {
  const PAGE_LIMIT = 9;
  const api_Path = `https://jsonplaceholder.typicode.com/posts`;

  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const elementRef = useRef(null);

  function onInteraction() {}

  useEffect(() => {
    fetchMoreData();
  }, []);

  const fetchMoreData = async () => {
    // let pageNo = 1;
    const queryParam = "?_limit=" + PAGE_LIMIT + "&_page=" + page;

    const final_Url = api_Path + queryParam;
    const res = await fetch(final_Url);

    const data = await res.json();
    console.log(final_Url);
    console.log(res);
    console.log(data);

    if (data.length === 0) {
      setHasMore(false);
    } else {
      setProducts((prevProducts) => [...prevProducts, ...data]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Product Infinite Scroll</h1>
        <div></div>

        <InfiniteScroll
          dataLength={products.length}
          //   pageStart={page}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
          //   useWindow={true}
        >
          <div className="grid grid-three-column">
            {products.map((curVal, id) => {
              return <MovieCard key={id} myData={curVal} />;
            })}
          </div>
        </InfiniteScroll>
      </div>
    </Fragment>
  );
};

export default PageInfiniteScroll;
