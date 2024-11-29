import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./main.scss";
import SearchResults from "@/components/Search/SearchResults";
import axiosInstance from "@/axios";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useLocation } from "react-router-dom";

const cx = classNames.bind(styles);

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(""); // Tỉnh/Thành phố
  const [selectedHometown, setSelectedHometown] = useState(""); // Quê quán
  const [selectedGender, setSelectedGender] = useState(""); // Giới tính
  const query = new URLSearchParams(location.search).get("query");
  const loaderRef = useRef(null);

  // Hàm gọi API để lấy kết quả tìm kiếm
  const fetchResults = async (page, filters = {}) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/find", {
        name: query,
        page,
        address: selectedProvince, // Tỉnh/Thành phố
        hometown: selectedHometown, // Quê quán
        gender: selectedGender, // Giới tính
      });
      console.log(response);

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

  console.log(
    `Tỉnh: ${selectedProvince}; Quê: ${selectedHometown}; Gender: ${selectedGender}`
  );

  // Hàm gọi API để lấy danh sách tỉnh thành
  const fetchProvinces = async () => {
    try {
      const response = await axios.get("https://provinces.open-api.vn/api/"); // API để lấy danh sách tỉnh thành
      setProvinces(response.data);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  useEffect(() => {
    fetchProvinces(); // Gọi API khi component được mount
  }, []);

  useEffect(() => {
    // Kiểm tra nếu có filter được chọn và query không rỗng
    if (query || selectedProvince || selectedHometown || selectedGender) {
      setResults([]); // Reset lại kết quả tìm kiếm
      setHasMore(true);
      setPage(1);
      fetchResults(1, {
        address: selectedProvince,
        hometown: selectedHometown,
        gender: selectedGender,
      });
    }
  }, [query, selectedProvince, selectedHometown, selectedGender]);

  // Hàm xử lý khi cuộn đến cuối
  const handleLoadMore = (entries) => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchResults(nextPage, {
          province: selectedProvince,
          gender: selectedGender,
        });
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

  const handleFilterChange = (event, type) => {
    const value = event.target.value;
    if (type === "province") {
      setSelectedProvince(value); // Lưu giá trị Tỉnh/Thành phố
    } else if (type === "hometown") {
      setSelectedHometown(value); // Lưu giá trị Quê quán
    } else if (type === "gender") {
      setSelectedGender(value); // Lưu giá trị Giới tính
    }
  };

  return (
    <div className={cx("search")}>
      <div className="sidebar">
        <h3>Kết quả tìm kiếm</h3>
        <ul>
          <li className="active">Mọi người</li>
        </ul>
        <div className="filters">
          <select
            value={selectedProvince}
            onChange={(e) => handleFilterChange(e, "province")}
          >
            <option value="">Tỉnh/Thành phố</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>

          <select
            value={selectedHometown}
            onChange={(e) => handleFilterChange(e, "hometown")}
          >
            <option value="">Quê quán</option>
            {provinces.map((province) => (
              <option key={province.code} value={province.name}>
                {province.name}
              </option>
            ))}
          </select>

          <select
            value={selectedGender}
            onChange={(e) => handleFilterChange(e, "gender")}
          >
            <option value="">Giới tính</option>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
          </select>
        </div>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <SearchResults users={results} />

      {/* Phần "loader" để kích hoạt infinite scroll */}
      {loading && (
        <div
          style={{
            marginLeft: "300px",
            height: "50px",
            textAlign: "center",
            marginBottom: "0px",
          }}
        >
          <CircularProgress size={30} />
        </div>
      )}
      {!loading && !hasMore && (
        <div
          style={{
            marginLeft: "300px",
            height: "50px",
            textAlign: "center",
            marginBottom: "0px",
          }}
        >
          Không còn kết quả.
        </div>
      )}
      <div ref={loaderRef} style={{ height: "10px" }}></div>
    </div>
  );
};

export default Search;
