import React, { useState, useEffect, useCallback } from "react";

import Axios from "axios";

const InfiniteScroll = (props) => {
  const [items, setItems] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handlePageBottom = () => {
    setIsFetching(true);
  };

  const checkPageBottom = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      handlePageBottom();
    }
  }, []);

  useEffect(() => {
    checkPageBottom();
    window.addEventListener("scroll", checkPageBottom);
    return () => window.removeEventListener("scroll", checkPageBottom);
  }, [items, checkPageBottom]);

  const fetchMoreListItems = useCallback(() => {
    const CancelToken = Axios.CancelToken;
    const source = CancelToken.source();
    const offset = items.length;
    const limit = props.limit;

    props.axiosInstance
      .get(props.url + "?limit=" + limit + "&offset=" + offset, {
        cancelToken: source.token,
      })
      .then((response) => {
        setIsFetching(false);
        setItems([...items, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      source.cancel();
    };
  }, [items, props.axiosInstance, props.limit, props.url]);

  useEffect(() => {
    if (!isFetching) return;

    return fetchMoreListItems();
  }, [isFetching, fetchMoreListItems]);

  const ComponentToScroll = props.componentToScroll;
  return <ComponentToScroll items={items} />;
};

export default InfiniteScroll;
