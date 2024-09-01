import className from "classnames/bind";
import styles from "./main.scss";
import Content from "../../../components/Messages/Content";
import { useParams } from "react-router-dom";

const cx = className.bind(styles);

const Notification = () => {
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
                <section class="rectangle-parent mt-3 ">
                  <div className="anhthu">
                  <div className="col-md-12">
                    <a class="thng-bo">Thông báo </a>
 
                  </div>
                 
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex flex-row ">
                        <div class="p-2">
                          <div className="tt">
                            <a href="#">Tất cả</a>
                          </div>
                        </div>

                        <div class="p-2">
                          <div class="cha ms-1">
                            <a href="#">Chưa đọc</a>
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/236x/d1/b7/10/d1b71082f5f0df4055be5fe22fd8f571.jpg"
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/236x/d1/b7/10/d1b71082f5f0df4055be5fe22fd8f571.jpg"
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/236x/d1/b7/10/d1b71082f5f0df4055be5fe22fd8f571.jpg"
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div class="d-flex mb-3">
                        <div class=" action-indicators p-2">
                          <img
                            src="https://i.pinimg.com/236x/d1/b7/10/d1b71082f5f0df4055be5fe22fd8f571.jpg"
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
                      </div>
                    </div>
                  </div>
                  <div className="row">
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
                      </div>
                    </div>
                  </div>
              
                  </div>
                
               
<div className="row ">
  <div className="col-md-12 ">
  <div class="show-all-button-wrapper">
                    <button class="show-all-button">
                   
                      <div class="xem-tt-c">Xem tất cả</div>
                    </button>
                  </div>
  </div>

</div>
                 
                </section>
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
