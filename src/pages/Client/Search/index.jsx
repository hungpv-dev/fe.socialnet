import className from "classnames/bind";
import styles from "./main.scss";
import Content from "../../../components/Messages/Content";
import { useParams } from "react-router-dom";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";




const cx = className.bind(styles);
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 24,
  height: 24,
  // border: `2px solid ${theme.palette.background.paper}`,
}));
const Search = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div id="content">
        <div className="alertt mt-5">
          <div className="row">
            <div className="col-md-3 shadow p-3 mb-5 bg-body-tertiary rounded">
              <div class="search-results-content ">
                {/* <div class="search-results-header"> */}
                <div class="results-title">
                  <b class="kt-qu-tm">Kết quả tìm kiếm </b>
                </div>
                <hr />
                <div class="search-results-divider"></div>
                <div class="b-lc-wrapper">
                  <div class="b-lc mt-3 ms-3">
                    {" "}
                    <b>Bộ lọc</b>
                  </div>
                </div>
                {/* </div> */}
                <div class="sb d-flex mb-3">
                  <div class="p-2">
                    <img src="https://static.thenounproject.com/png/1800023-200.png" />
                  </div>
                  <div class="p-2 mt-2 fw-bolder">
                    <a href="#">Tất cả</a>
                  </div>
                </div>
                {/* ---------- */}
                <div class="sb d-flex mb-3">
                  <div class="p-2">
                    <img src="https://static.thenounproject.com/png/3874122-200.png" />
                  </div>
                  <div class="sb p-2 mt-2 fw-bolder">
                    <a href="#">Bài viết</a>
                  </div>
                </div>
                {/* -------------- */}
                <div class="sb d-flex mb-3">
                  <div class="p-2">
                    <img src="https://png.pngtree.com/png-vector/20191004/ourmid/pngtree-person-icon-png-image_1788612.jpg" />
                  </div>
                  <div class="p-2 mt-2 fw-bolder">
                    <a href="#">Mọi người</a>
                  </div>
                </div>
                {/* ------------- */}
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-md-5">
              <div className="row">
                <div className="at">
                  <div className="tbb row ">
                    <div className="col-8">
                      <div class=" d-flex mb-3">
                        <div class="p-2">
                          <img
                            src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Dao Duy Tung</b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            Sống tại Bắc Ninh. Học viện Tài chính
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button class="thm-bn-b1 mt-4">Thêm bạn bè</button>
                    </div>
                  </div>

                  <div className="tbb row ">
                    <div className="col-8">
                      <div class="d-flex mb-3">
                        <div class="p-2">
                          <img
                            src="https://cdn.tuoitre.vn/zoom/700_525/2019/5/8/avatar-publicitystill-h2019-1557284559744252594756-crop-15572850428231644565436.jpg"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Dao Duy Tung</b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            Sống tại Bắc Ninh. Học viện Tài chính
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button class="thm-bn-b1 mt-4">Thêm bạn bè</button>
                    </div>
                  </div>

                  {/* -------------- */}
                  <div className="tbb row ">
                    <div className="col-8">
                      <div class="d-flex mb-3">
                        <div class="p-2">
                          <img
                            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Dao Duy Tung</b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            Sống tại Bắc Ninh. Học viện Tài chính
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button class="thm-bn-b1 mt-4 ">Thêm bạn bè</button>
                    </div>
                  </div>
                  {/* -------------- */}
                  <div className="tbb row ">
                    <div className="col-8">
                      <div class="d-flex mb-3">
                        <div class="p-2">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgd5hHlWr9QgmHe6BkYbaPz_W1wMaIAYIze9cNX5EAUT78OLptpFXpoXPOEhRvsKqF-qE&usqp=CAU"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Dao Duy Tung</b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            Sống tại Bắc Ninh. Học viện Tài chính
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button class="thm-bn-b1 mt-4">Thêm bạn bè</button>
                    </div>
                  </div>
                  {/* ------------- */}
                  <div className="tbb row">
                    <div className=" col-8">
                      <div class="d-flex mb-3">
                        <div class="p-2">
                          <img
                            src="https://phongreviews.com/wp-content/uploads/2022/11/anh-avatar-dep-cho-con-gai-ngau-4-2.jpg"
                            alt=""
                            srcset=""
                          />
                        </div>
                        <div class="p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Dao Duy Tung</b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            Sống tại Bắc Ninh. Học viện Tài chính
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-4">
                      <button class="thm-bn-b1 mt-4">Thêm bạn bè</button>
                    </div>
                  </div>
                </div>
                {/* -------------- */}
                <div className="ta">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3 ">
                        <div class="p-2 mt-3">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://img.youtube.com/vi/eM_mWnoD-V0/hqdefault.jpg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://imperiaskygardens.com/wp-content/uploads/2023/01/unnamed-3.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                          {/* <img
                            src="https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-3.jpg"
                            alt=""
                            srcset=""
                          /> */}
                        </div>
                        <div class=" p-2 mt-4">
                          {" "}
                          <a href="#">
                            <b>Nhóm trọ khu vực Bắc Từ Liêm </b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            {" "}
                            <a href="#" class="ee">
                              Anh Thu. 15 thang 8
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p class="uu ">
                        Loa Góc tìm người ở ghép : Mình cần tìm 2 bạn nữ vào ở
                        chung phòng đã có 1 người Yêu cầu : Chỉ cần hoà đồng ,
                        vui tính , sạch sẽ là được Địa chỉ : Ngõ 63 Lê Đức Thọ ,
                        Nam Từ Liêm Hà Nội Phòng giá 3tr5 chia 3 mỗi người hơn
                        triệu 1 xíu . Điện 3,5k/số, nước 35k / khối , dịch vụ
                        chung 100k/ng, giặt sấy 80k/ phòng , mạng 80k/ phòng.
                        Phòng ở tầng 6 có chỗ để xe và có thang máy
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 mt-3">
                      <ImageList sx={{ height: 450 }} cols={3} rowHeight={164}>
                        {itemData.map((item) => (
                          <ImageListItem key={item.img}>
                            <img
                              srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                              src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                              alt={item.title}
                              loading="lazy"
                            />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    </div>
                  </div>

                  {/* <div className="row">
                  <div class="container text-center"> */}
                  <div class="row ">
                    <div class="d-flex flex-row mb-3 mt-2">
                      <div class="p-2">
                        <div class="icon d-flex flex-row mb-3 ms-5 mt-2">
                          <div class="">
                            <img
                              src="https://e7.pngegg.com/pngimages/385/728/png-clipart-emoji-facebook-emoticon-heart-facebook-love-emoji-heart-illustration-miscellaneous-text-thumbnail.png"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6NeZjukHwYLLuJG4kEHD8nnA7q8NKG3PzQ&s"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfIqxSMRhIexweT2gFrSoYbN4mpKAKDd-SQg&s"
                              alt=""
                              srcset=""
                            />
                            
                          </div>
                        </div>
                      </div>
                      <div class=" mt-3">123</div>
                      <div class="cm p-2 mt-2">
                        <a href="#">12 bình luận</a>{" "}
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="bt row mt-4">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                      <i class="bi bi-hand-thumbs-up ms-3 "></i>
                      <span class="cc ">
                        {" "}
                        <a href="#">Thích</a>
                      </span>
                    </div>

                    <div className="col-md-4">
                      <i class="bi bi-chat"></i>
                      <span class="cc">
                        {" "}
                        <a href="#">Comment</a>
                      </span>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </div>
                {/* ---------- */}
                <div className="ta">
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3 ">
                        <div class="p-2 mt-3">
                        <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://img.youtube.com/vi/eM_mWnoD-V0/hqdefault.jpg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://imperiaskygardens.com/wp-content/uploads/2023/01/unnamed-3.jpg"
                            />
                          </Badge>
                          {/* <img
                            src="https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-3.jpg"
                            alt=""
                            srcset=""
                          /> */}
                        </div>
                        <div class=" p-2 mt-3">
                          {" "}
                          <a href="#">
                            <b>Nhóm trọ khu vực Bắc Từ Liêm </b>
                          </a>{" "}
                          <br />
                          <span class="span">
                            {" "}
                            <a href="#" class="ee">
                              Anh Thu. 15 thang 8
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p class="uu ">
                        Loa Góc tìm người ở ghép : Mình cần tìm 2 bạn nữ vào ở
                        chung phòng đã có 1 người Yêu cầu : Chỉ cần hoà đồng 
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="vd col-md-12 mt-3 ">
                    <video width="840" height="340" controls>
        <source src="https://youtu.be/eCL1h3fhROE?si=xxAs0pYP8sgObTmo"  />
        Your browser does not support the video tag.
      </video>
     
                    </div>
                  </div>

                  {/* <div className="row">
                  <div class="container text-center"> */}
                  <div class="row ">
                    <div class="d-flex flex-row mb-3 mt-2">
                      <div class="p-2">
                        <div class="icon d-flex flex-row mb-3 ms-5 mt-2">
                          <div class="">
                            <img
                              src="https://e7.pngegg.com/pngimages/385/728/png-clipart-emoji-facebook-emoticon-heart-facebook-love-emoji-heart-illustration-miscellaneous-text-thumbnail.png"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa6NeZjukHwYLLuJG4kEHD8nnA7q8NKG3PzQ&s"
                              alt=""
                              srcset=""
                            />
                          </div>
                          <div class="">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfIqxSMRhIexweT2gFrSoYbN4mpKAKDd-SQg&s"
                              alt=""
                              srcset=""
                            />
                            
                          </div>
                        </div>
                      </div>
                      <div class=" mt-3">123</div>
                      <div class="cm p-2 mt-2">
                        <a href="#">12 bình luận</a>{" "}
                      </div>
                    </div>
                  </div>
                  <hr />

                  <div className="bt row mt-4">
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
                      <i class="bi bi-hand-thumbs-up ms-3 "></i>
                      <span class="cc ">
                        {" "}
                        <a href="#">Thích</a>
                      </span>
                    </div>

                    <div className="col-md-4">
                      <i class="bi bi-chat"></i>
                      <span class="cc">
                        {" "}
                        <a href="#">Comment</a>
                      </span>
                    </div>
                    <div className="col-md-2"></div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
    );
  }
  return <Content />;
};

export default Search;
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Honey",
  },
];

