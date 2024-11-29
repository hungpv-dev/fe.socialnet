import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import className from "classnames/bind";
import styles from "./main.scss";
import SearchResults from "@/components/Search/SearchResults";
import axiosInstance from "@/axios";

const cx = className.bind(styles);

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const query = new URLSearchParams(location.search).get("query");
  const loaderRef = useRef(null);

  // Hàm gọi API để lấy kết quả tìm kiếm
  const fetchResults = async (page) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/find", {
        name: query,
        page,
      });
      if (response.data.data.length === 0) {
        setHasMore(false);
      }
      setResults((prevResults) => [...prevResults, ...response.data.data]);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      setResults([]);
      setHasMore(true);
      setPage(1);
      fetchResults(1);
    }
  }, [query]);

  // Hàm xử lý khi cuộn đến cuối
  const handleLoadMore = (entries) => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchResults(nextPage);
        return nextPage;
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleLoadMore, {
      rootMargin: "100px", // Khi loader gần 100px gần đáy, sẽ kích hoạt
    });
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, hasMore, loading]);

  return (
    <div className={cx("search")}>
      <div className="sidebar">
        <h3>Kết quả tìm kiếm</h3>
        <ul>
          <li className="active">Mọi người</li>
        </ul>
        <div className="filters">
          <select>
            <option>Tỉnh/Thành phố</option>
          </select>
          <select>
            <option>Quê quán</option>
          </select>
          <select>
            <option>Giới tính</option>
            <option>Nam</option>
            <option>Nữ</option>
          </select>
        </div>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <SearchResults users={results} />

      {/* Phần "loader" để kích hoạt infinite scroll */}
      {loading && <div style={{ marginLeft: "300px", height: "50px", textAlign: "center", marginBottom: "0px" }}>Đang tải...</div>}
      {!loading && !hasMore && <div style={{ marginLeft: "300px", height: "50px", textAlign: "center", marginBottom: "0px" }}>Không còn kết quả.</div>}
      <div ref={loaderRef} style={{ height: "10px", backgroundColor: "black" }}>...........</div>
    </div>
  );
};

export default Search;
