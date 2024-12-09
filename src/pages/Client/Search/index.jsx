import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  CircularProgress,
  Drawer,
  useTheme,
  useMediaQuery,
  Button,
  Stack,
  TextField
} from "@mui/material";
import { FilterList, Clear } from "@mui/icons-material";
import SearchResults from "@/components/Search/SearchResults";
import axiosInstance from "@/axios";
import { useLocation, useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedHometown, setSelectedHometown] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const query = new URLSearchParams(location.search).get("query");
  const loaderRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openFilter, setOpenFilter] = useState(false);
  const [searchText, setSearchText] = useState(query || "");

  const fetchResults = async (page, filters = {}) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/find", {
        name: query,
        page,
        address: selectedProvince,
        hometown: selectedHometown,
        gender: selectedGender,
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
    const delayDebounceFn = setTimeout(() => {
      if (query || selectedProvince || selectedHometown || selectedGender) {
        setResults([]);
        setHasMore(true);
        setPage(1);
        fetchResults(1, {
          address: selectedProvince,
          hometown: selectedHometown,
          gender: selectedGender,
        });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [query, selectedProvince, selectedHometown, selectedGender]);

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
      rootMargin: "100px",
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

  const handleFilterChange = useCallback((event, type) => {
    const value = event.target.value;
    if (type === "province") {
      setSelectedProvince(value);
    } else if (type === "hometown") {
      setSelectedHometown(value);
    } else if (type === "gender") {
      setSelectedGender(value);
    }
  }, [setSelectedProvince, setSelectedHometown, setSelectedGender]);

  const handleClearFilters = () => {
    setSelectedProvince("");
    setSelectedHometown("");
    setSelectedGender("");
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?query=${encodeURIComponent(searchText)}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchText.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const FilterContent = React.memo(() => (
    <Box sx={{ p: 3, width: isMobile ? 'auto' : 300 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">
          Bộ lọc tìm kiếm
        </Typography>
        {(selectedProvince || selectedHometown || selectedGender) && (
          <Button
            startIcon={<Clear />}
            onClick={handleClearFilters}
            size="small"
            color="error"
            variant="outlined"
          >
            Xóa lọc
          </Button>
        )}
      </Stack>

      <TextField
        fullWidth
        sx={{ mt: 2 }}
        label="Nơi sống"
        value={selectedProvince}
        onChange={(e) => handleFilterChange(e, "province")}
      />

      <TextField
        fullWidth
        sx={{ mt: 2 }}
        label="Quê quán"
        value={selectedHometown}
        onChange={(e) => handleFilterChange(e, "hometown")}
      />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel>Giới tính</InputLabel>
        <Select
          value={selectedGender}
          onChange={(e) => handleFilterChange(e, "gender")}
          label="Giới tính"
        >
          <MenuItem value="">Tất cả</MenuItem>
          <MenuItem value="male">Nam</MenuItem>
          <MenuItem value="female">Nữ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  ));

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        mt: 3, 
        mb: 3,
        minHeight: 'calc(100vh - 88px)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Paper elevation={1}>
        <Box sx={{ 
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Typography variant="h6">
            Kết quả tìm kiếm {query && `cho "${query}"`}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {(selectedProvince || selectedHometown || selectedGender) && (
              <Typography variant="body2" color="text.secondary">
                Đang lọc: {[
                  selectedProvince && `Tỉnh: ${selectedProvince}`,
                  selectedHometown && `Quê: ${selectedHometown}`,
                  selectedGender && `Giới tính: ${selectedGender === 'male' ? 'Nam' : 'Nữ'}`
                ].filter(Boolean).join(', ')}
              </Typography>
            )}

            <Button
              startIcon={<FilterList />}
              onClick={() => setOpenFilter(true)}
              variant="outlined"
              color={selectedProvince || selectedHometown || selectedGender ? "primary" : "inherit"}
              size="small"
            >
              Bộ lọc {(selectedProvince || selectedHometown || selectedGender) && '(Đang lọc)'}
            </Button>
          </Box>
        </Box>

        <SearchResults users={results} />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
            <CircularProgress />
          </Box>
        )}
        
        {!loading && !hasMore && results.length > 0 && (
          <Typography 
            align="center" 
            color="text.secondary"
            sx={{ p: 2 }}
          >
            Không còn kết quả.
          </Typography>
        )}

        {!loading && results.length === 0 && (
          <Typography 
            align="center" 
            color="text.secondary"
            sx={{ p: 4 }}
          >
            Không tìm thấy kết quả nào.
          </Typography>
        )}
        
        <div ref={loaderRef} style={{ height: "10px" }}></div>
      </Paper>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterContent />
      </Drawer>
    </Container>
  );
};

export default Search;
