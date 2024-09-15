import className from "classnames/bind";
import styles from "./main.scss";
import Content from "../../../components/Messages/Content";
import { useParams } from "react-router-dom";
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
const Notification = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div id="content">
        <div className="alert mt-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <div class="thong-bao-vanh">
                <div className="anhthu">
                  {/* <a class="thng">Thông báo </a> */}
                  <p class="fs-4 fw-bold">Thông báo</p>
                  <div class="hstack gap-3 mt-2">
                    <div class=" tt ">
                      {" "}
                      <a href="#">Tất cả</a>
                    </div>
                    <div class="cha ms-2">
                      {" "}
                      <a href="/new">Chưa đọc</a>
                    </div>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          {/* <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU"
                            alt=""
                            srcset=""
                          /> */}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg?s=612x612&w=0&k=20&c=gI8i97DeBHXX723AJZgV9p7_NHHh9fT4FOXY59pYGuA=" 
                             
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn  ">
                              <a href="#">
                                đã nhắc đến bạn trong một bình luận. Hay phan
                                hoi ban ay nhe
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                       
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          {/* <img
                            src="https://phunuvietnam.mediacdn.vn/179072216278405120/2023/2/2/z407811279454704d3b10be2c47b86e5bd170832bde562-16753562253021567389777.jpg"
                            alt=""
                            srcset=""
                          /> */}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://media.istockphoto.com/id/1413372131/photo/like-thumbs-up-social-media-sign-or-symbol-icon-3d-rendering.jpg?s=612x612&w=0&k=20&c=gI8i97DeBHXX723AJZgV9p7_NHHh9fT4FOXY59pYGuA="
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://phunuvietnam.mediacdn.vn/179072216278405120/2023/2/2/z407811279454704d3b10be2c47b86e5bd170832bde562-16753562253021567389777.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn ">
                              <a href="#">đã thích bài viết của bạn</a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          {/* <img
                            src="https://i.pinimg.com/550x/bb/7f/66/bb7f665bf15cd9426c6864931059cc70.jpg"
                            alt=""
                            srcset=""
                          /> */}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://vos.line-scdn.net/strapi-cluster-instance-bucket-84/appicon_01_f9ed1cf01f.jpeg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://i.pinimg.com/550x/bb/7f/66/bb7f665bf15cd9426c6864931059cc70.jpg" 
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn ">
                              <a href="#">đã thích bài viết của bạn</a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          {/* <img
                            src="https://i.pinimg.com/236x/a9/90/0e/a9900e9d1457083de9ce1119e35a0391.jpg"
                            alt=""
                            srcset=""
                          /> */}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://img.freepik.com/free-psd/phone-icon-design_23-2151311652.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726099200&semt=ais_hybrid"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://i.pinimg.com/236x/a9/90/0e/a9900e9d1457083de9ce1119e35a0391.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn ">
                              <a href="#">đã thích bài viết của bạn</a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          {/* <img
                            src="https://i.pinimg.com/736x/e7/3a/f2/e73af22d60aa72c291a24a1245e5c374.jpg"
                            alt=""
                            srcset=""
                          /> */}
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://png.pngtree.com/png-clipart/20181003/ourmid/pngtree-facebook-social-media-icon-facebook-logo-png-image_3654772.png"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://i.pinimg.com/236x/a9/90/0e/a9900e9d1457083de9ce1119e35a0391.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn ">
                              <a href="#">
                                đã chia sẻ một bài viết trong{" "}
                                <span>
                                  <b>
                                    <a href="#">SaPa tivi </a>
                                  </b>
                                </span>
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://cdn4.vectorstock.com/i/1000x1000/20/68/add-user-rounded-icon-designed-for-web-vector-29002068.jpg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://i.pinimg.com/736x/30/eb/f2/30ebf22d6fbd9eec91fc72af2b64ebe1.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                          {/* <img
                            src="https://i.pinimg.com/736x/30/eb/f2/30ebf22d6fbd9eec91fc72af2b64ebe1.jpg"
                            alt=""
                            srcset=""
                          /> */}
                          {/* <img class="position-relative" src="https://icons.veryicon.com/png/o/hardware/jackdizhu_pc/comment-25.png" alt="" srcset="" /> */}
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span>
                            <span class="nhc-n-bn ">
                              <a href="#">
                                đã nhắc đến bạn trong một bình luận
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={
                              <SmallAvatar
                                alt="Remy Sharp"
                                src="https://as1.ftcdn.net/v2/jpg/05/60/76/02/1000_F_560760287_OPAsw28YAkbXeByNnsQuFLCSVmg7hft3.jpg"
                              />
                            }
                          >
                            <Avatar
                              alt="Travis Howard"
                              src="https://i.pinimg.com/736x/76/2a/06/762a06de58d5381eddb2560c7c118fa6.jpg"
                              style={{ width: '70px', height: '70px' }}
                            />
                          </Badge>
                          {/* <img
                            src="https://i.pinimg.com/736x/76/2a/06/762a06de58d5381eddb2560c7c118fa6.jpg"
                            srcset=""
                          /> */}
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                            <span class="nhc-n-bn ">
                              <a href="#">
                                Hôm nay là sinh nhật của{" "}
                                <span>
                                  <b>
                                    <a href="#">Anh Thư </a>
                                  </b>
                                </span>{" "}
                                hãy gửi lời chúc sinh nhật cô ấy.
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row ">
                  <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <button class="show-all-button">Xem tất cả</button>
                  </div>
                  <div className="col-md-1"></div>
                </div>

                {/* </section> */}
              </div>
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
      </div>
    );
  }
  return <Content />;
};

export default Notification;
