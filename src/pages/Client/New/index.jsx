import className from "classnames/bind";
import styles from "./main.scss";
import Content from "../../../components/Messages/Content";
import { useParams } from "react-router-dom";

const cx = className.bind(styles);

const New = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div id="content">
        <div className="alert mt-5">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 ">
              <div class="thong-bao-vanh">
                {/* <main class="footer "> */}
                {/* <section class="rectangle-parent mt-3 "> */}
                  <div className="anhthu">
                  <div className="col-md-12">
                    <a class="thng-bo">Thông báo </a>
 
                  </div>
                 
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex flex-row ">
                        <div class="p-2">
                          <div className="tt">
                            <a href="/thongbao">Tất cả</a>
                          </div>
                        </div>

                        <div class="p-2">
                          <div class="cha ms-1">
                            <a  href="#">Chưa đọc</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrxknwQn3XCm_np4GjfHsnq8k79S76PEH_OAz5xyTZN7uXKxp1iZPQMQSROcicWGkBHqs&usqp=CAU"
                            alt=""
                            srcset=""
                          />
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
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://phunuvietnam.mediacdn.vn/179072216278405120/2023/2/2/z407811279454704d3b10be2c47b86e5bd170832bde562-16753562253021567389777.jpg"
                            alt=""
                            srcset=""
                          />
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
                                đã thích bài viết của bạn 
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/550x/bb/7f/66/bb7f665bf15cd9426c6864931059cc70.jpg"
                            alt=""
                            srcset=""
                          />
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
                                đã thích bài viết của bạn 
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/236x/a9/90/0e/a9900e9d1457083de9ce1119e35a0391.jpg"
                            alt=""
                            srcset=""
                          />
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
                                đã thích bài viết của bạn 
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/736x/e7/3a/f2/e73af22d60aa72c291a24a1245e5c374.jpg"
                            alt=""
                            srcset=""
                          />
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
                                đã chia sẻ một bài viết trong  <span>
                              <b>
                                <a href="#">SaPa tivi </a>
                              </b>
                            </span>
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/736x/30/eb/f2/30ebf22d6fbd9eec91fc72af2b64ebe1.jpg"
                            alt=""
                            srcset=""
                          />
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
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/736x/76/2a/06/762a06de58d5381eddb2560c7c118fa6.jpg"
                            srcset=""
                          />
                        </div>
                        <div class="p-2">
                          <div class="anh-th-container1">
                           
                            <span class="nhc-n-bn ">
                              <a href="#">
                                Hôm nay là sinh nhật của  <span>
                              <b>
                                <a href="#">Anh Thư </a>
                              </b>
                            </span> hãy gửi lời chúc sinh nhật cô ấy.
                              </a>
                            </span>
                          </div>
                          <div class="gi2 mt-2">6 giờ</div>
                        </div>
                        <div class="thu p-2 ms-5">
                      <img src="https://www.emojiall.com/images/240/mozilla/1f535.png" alt="" srcset="" />
                        </div>
                      </div>
                    </div>
                  </div>
              
                  </div>
                
               
<div className="row ">
  <div className="col-md-1"></div>
  <div className="col-md-10">
  {/* <div class="show-all-button-wrapper"> */}
                    <button class="show-all-button">
                     Xem tất cả
                    </button>
                  {/* </div> */}
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

export default New;
