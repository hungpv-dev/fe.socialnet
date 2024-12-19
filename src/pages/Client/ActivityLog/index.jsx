import React, { useEffect, useState, useRef, useCallback } from "react";
import axiosInstance from "@/axios";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const ActivityLog = () => {
  const [activityLog, setActivityLog] = useState([]);
  const [index, setIndex] = useState(0); // Dùng index bắt đầu từ 0
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const navigate = useNavigate();

  const fetchActivityLog = useCallback(async () => {
    try {
      if (!hasMore) return; // Nếu không còn dữ liệu để tải, dừng việc gọi API.
      setLoading(true);
      const response = await axiosInstance.get(
        `/user/activity/log?index=${index}`
      );
      console.log(response.data); // Kiểm tra dữ liệu trả về
      const newLogs = Array.isArray(response.data) ? response.data : [];

      setActivityLog((prevLogs) => {
        const logIds = new Set(prevLogs.map((log) => log.id)); // Lấy danh sách ID hiện có
        const filteredLogs = newLogs.filter((log) => !logIds.has(log.id)); // Loại bỏ log bị trùng
        return [...prevLogs, ...filteredLogs];
      });

      // Kiểm tra nếu có dữ liệu để tải thêm
      setHasMore(newLogs.length > 0); // Nếu không có thêm dữ liệu, set hasMore thành false
    } catch (error) {
      console.error("Error fetching activity log:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  }, [index, hasMore, navigate]);

  useEffect(() => {
    fetchActivityLog();
  }, [fetchActivityLog]);

  const lastLogRef = useCallback(
    (node) => {
      if (loading || !hasMore) return; // Nếu đang tải hoặc không còn dữ liệu, không thực hiện tiếp.
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setIndex((prevIndex) => prevIndex + 10); // Tăng index lên 10 mỗi lần cuộn đến cuối
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <h3 style={{ textAlign: "center", marginTop: "10px" }}>
        Nhật ký hoạt động
      </h3>
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          height: "80vh",
          overflowY: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {activityLog.map((log, index) => {
          const content = (
            <div
              key={log.id}
              ref={index === activityLog.length - 1 ? lastLogRef : null}
              style={{
                display: "flex",
                alignItems: "flex-start",
                padding: "10px",
                margin: "10px 0",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <img
                src={log.properties.avatar || "/user_default.png"}
                alt="Avatar"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, textAlign: "left" }}>
                  <Link
                    to={`/profile/${log.causer_id}`}
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {log.properties.user}
                  </Link>{" "}
                  {log.description}{" "}
                  <Link
                    to={`/profile/${log.subject_id}`}
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      textDecoration: "none",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.textDecoration = "underline")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.textDecoration = "none")
                    }
                  >
                    {log.properties.client}
                  </Link>
                  {log.log_name === "emotion" && (log.subject_title === "App\\Models\\Comment" ? "bình luận." : "bài viết.")}

                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontSize: "12px",
                    color: "#888",
                    textAlign: "left",
                  }}
                >
                  {new Date(log.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          );

          if (
            log.log_name === "post" ||
            log.log_name === "comment" ||
            log.log_name === "emotion"
          ) {
            return (
              <Link
                to={`/posts/${log.subject_id}`}
                key={log.id}
                style={{
                  textDecoration: "none",
                  color: "black",
                  transition: "color 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "black";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {content}
              </Link>
            );
          }

          return content;
        })}

        {!hasMore && !loading && (
          <div style={{ marginTop: "20px", color: "#888" }}>
            Không còn dữ liệu.
          </div>
        )}
        {loading && (
          <div>
            <Skeleton
              variant="rectangular"
              height={80}
              style={{ margin: "10px 0", borderRadius: "8px" }}
            />
            <Skeleton
              variant="rectangular"
              height={80}
              style={{ margin: "10px 0", borderRadius: "8px" }}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ActivityLog;
