import className from "classnames/bind";
import styles from "./main.scss";
import Content from "../../../components/Messages/Content";
import { useParams } from "react-router-dom";

const cx = className.bind(styles);

const Search = () => {
  const { id } = useParams();
  if (!id) {
    return (
      <div id="content">
        <div className="alertt mt-5">
          <div className="row">
            <div className="col-md-3">
              <div class="search-results-content">
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
                <div class="d-flex mb-3">
                  <div class="p-2">
                    <img src="https://static.thenounproject.com/png/1800023-200.png" />
                  </div>
                  <div class="p-2 mt-2">
                    <a href="#">Bài viết</a>
                  </div>
                </div>
                {/* ---------- */}
                <div class="d-flex mb-3">
                  <div class="p-2">
                    <img src="https://static.thenounproject.com/png/3874122-200.png" />
                  </div>
                  <div class="p-2 mt-2">
                    <a href="#">Tất cả</a>
                  </div>
                </div>
                {/* -------------- */}
                <div class="d-flex mb-3">
                  <div class="p-2">
                    <img src="https://png.pngtree.com/png-vector/20191004/ourmid/pngtree-person-icon-png-image_1788612.jpg" />
                  </div>
                  <div class="p-2 mt-2">
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
                
                <div className="row ">
                  <div className="col-md-8">
                    <div class="d-flex mb-3">
                      <div class="p-2"><img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" srcset="" /></div>
                      <div class="p-2 mt-3"> <a href="#"><b>Dao Duy Tung</b></a> <br />
                      <span class="span">Sống tại Bắc Ninh. Học viện Tài chính</span>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-md-4">
                  <button class="thm-bn-b1 mt-5">Thêm bạn bè</button>
                  </div>
                </div>
  
                <div className="row ">
                  <div className="col-md-8">
                    <div class="d-flex mb-3">
                      <div class="p-2"><img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" srcset="" /></div>
                      <div class="p-2 mt-3"> <a href="#"><b>Dao Duy Tung</b></a> <br />
                      <span class="span">Sống tại Bắc Ninh. Học viện Tài chính</span>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-md-4">
                  <button class="thm-bn-b1 mt-5">Thêm bạn bè</button>
                  </div>
                </div>
  
                {/* -------------- */}
                <div className="row ">
                  <div className="col-md-8">
                    <div class="d-flex mb-3">
                      <div class="p-2"><img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" srcset="" /></div>
                      <div class="p-2 mt-3"> <a href="#"><b>Dao Duy Tung</b></a> <br />
                      <span class="span">Sống tại Bắc Ninh. Học viện Tài chính</span>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-md-4">
                  <button class="thm-bn-b1 mt-5 ">Thêm bạn bè</button>
                  </div>
                </div>
                  {/* -------------- */}
                  <div className="row ">
                  <div className="col-md-8">
                    <div class="d-flex mb-3">
                      <div class="p-2"><img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" srcset="" /></div>
                      <div class="p-2 mt-3"> <a href="#"><b>Dao Duy Tung</b></a> <br />
                      <span class="span">Sống tại Bắc Ninh. Học viện Tài chính</span>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-md-4">
                  <button class="thm-bn-b1 mt-5">Thêm bạn bè</button>
                  </div>
                </div>
                {/* ------------- */}
                <div className="row">
                  <div className="col-md-8">
                    <div class="d-flex mb-3">
                      <div class="p-2"><img src="https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-den-ngau.jpeg" alt="" srcset="" /></div>
                      <div class="p-2 mt-3"> <a href="#"><b>Dao Duy Tung</b></a> <br />
                      <span class="span">Sống tại Bắc Ninh. Học viện Tài chính</span>
                      </div>
                   
                    </div>
                  </div>
                  <div className="col-md-4">
                  <button class="thm-bn-b1 mt-5">Thêm bạn bè</button>
                  </div>
                </div>
                </div>
                {/* -------------- */}
                <div className="ta">
                  <div className="row">
                 
                  <div className="col-md-12">
                    <div class="d-flex mb-3 ">
                      <div class="p-2 mt-3"><img src="https://nupet.vn/wp-content/uploads/2023/10/anh-avatar-cute-meo-nupet-3.jpg" alt="" srcset="" /></div>
                      <div class=" p-2 mt-4"> <a href="#"><b>Nhóm trọ khu vực Bắc Từ Liêm </b></a> <br />
                      <span class="span"> <a href="#" class="ee">Anh Thu. 15 thang 8</a></span>
                      </div>
                   
                    </div>
                  </div>
                 
  
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p class="uu">Loa Góc tìm người ở ghép : 
Mình cần tìm 2 bạn nữ vào ở chung phòng đã có 1 người Yêu cầu : Chỉ cần hoà đồng , vui tính , sạch sẽ là được
Địa chỉ : Ngõ 63 Lê Đức Thọ , Nam Từ Liêm Hà Nội
Phòng giá 3tr5 chia 3 mỗi người hơn triệu 1 xíu . Điện 3,5k/số, nước 35k / khối , dịch vụ chung 100k/ng, giặt sấy 80k/ phòng , mạng 80k/ phòng. Phòng ở tầng 6 có chỗ để xe và có thang máy</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 mt-3"><hr /></div>
                    <div className="col-md-1"></div>
                  </div>

                  {/* <div className="row">
                  <div class="container text-center"> */}
  <div class="row mt-2 ms-4">
  {/* <div className="col-md-1"></div> */}
    <div class="col-md-6 ">
      
     <div class="d-flex mb-3">
  <div class="ll ms-4 "> <img  src="https://i.pinimg.com/736x/39/44/6c/39446caa52f53369b92bc97253d2b2f1.jpg" alt="" srcset=""  /></div>
  <div class="qq p-2"><p>Anh Thu va 2 nguoi khac</p></div>
  
</div>
    
    </div>
    <div class="col-md-6 mt-2">
      <a href="#" class="ii ">30 binh luan</a>
    </div>
   
  </div>
  <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-md-10 "><hr /></div>
                    <div className="col-md-1"></div>
                  </div>

                  <div className="row mt-2">
                  <div className="col-md-2"></div>
                  <div className="col-md-4">
                  <i class="bi bi-heart me-1"></i>
                  <span class="cc"> <a href="#">Thích</a></span>
                  </div>
                 
                 
                 
                    <div className="col-md-4">
                    <i class="bi bi-chat"></i>
                  <span class="cc"> <a href="#">Comment</a></span>
                  </div>
                  <div className="col-md-2"></div>

                  </div>
                </div>
              </div>
            
             
            </div>
            <div className="col-2"></div>
          </div>
          {/* <div className="row">
       <main class="search-results-content-parent">
       <div className="col-md-3">
        <div class="search-results-content">
          <div class="search-results-header">
            <div class="results-title">
              <b class="kt-qu-tm">Kết quả tìm kiếm </b>
            </div>
            <div class="search-results-divider"></div>
            <div class="b-lc-wrapper">
              <div class="b-lc">Bộ lọc</div>
            </div>
          </div>
          <div class="filter-options">
            <div class="tt-c"> <a href="#">Tất cả</a></div>
          </div>
          <div class="search-results-title-wrapper">
            <div class="categories-container">
              <div class="bi-vit"> <a href="#">Bài viết</a></div>
              <div class="people-type">
                <div class="mi-ngi"> <a href="#">Mọi người</a></div>
              </div>
            </div>
          </div>
          <div class="search-results-display-options">
            <div class="display-option-button"></div>
            <img class="vector-iconn" alt="" src="https://static.thenounproject.com/png/1800023-200.png"  />
           
         
            <img class="vector-icon " alt="" src="https://static.thenounproject.com/png/3874122-200.png"  />
           
            <img
              class="vector-icon1"
              loading="lazy"
              alt=""
              src="https://png.pngtree.com/png-vector/20181004/ourmid/pngtree-person-icon-png-image_1788612.jpg"
            />
          </div>
        </div>
           </div>
          
        <div className="col-md-2"></div>
        <div className="col-md-5"><div class="feed-item-actions">
          <div class="search-results-items">
            <div class="search-item-container">
              <div class="search-item-container-child"></div>
              <div class="people-item">
                <b class="mi-ngi1">Mọi người </b>
                <div class="category-people">
                  <div class="profile-preview-parent">
                    <div class="profile-preview">
                      <div class="profile-preview-inner">
                        <div class="ellipse-parent">
                          <div class="ellipse-div"></div>
                         
                        </div>
                      </div>
                      <div class="profile-preview-child">
                        <div class="ellipse-group">
                          <div class="frame-child1"></div>
                         
                        </div>
                      </div>
                    </div>
                    <div class="search-results-filter">
                      <div class="profile-details">
                        <div class="rectangle-parent">
                         
                          <div class="name-and-button">
                            <div class="o-minh-c-container">
                              <p class="o-minh-c"><a href="#">Đào Minh Đức</a></p>
                              <p class="sng-ti-bc-ninh-hc-vin-t">
                                <span
                                  >Sống tại Bắc Ninh. Học viện tài chính</span
                                >
                                <span class="span"> </span>
                              </p>
                            </div>
                            <div > <button class="thm-bn-b" >Thêm bạn bè</button></div>
                          </div>
                        </div>
                        <div class="rectangle-group">
                          <div class="o-minh-c-sng-ti-bc-ninh-parent">
                            <div class="o-minh-c-container1">
                              <p class="o-minh-c1"><a href="#">Đào Minh Đức</a></p>
                              <p class="sng-ti-bc-ninh-hc-vin-t1">
                                <span
                                  >Sống tại Bắc Ninh. Học viện tài chính</span
                                >
                                <span class="span1"> </span>
                              </p>
                            </div>
                           <button class="thm-bn-b1">Thêm bạn bè</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="frame-div">
                <div class="frame-parent1">
                  <div class="frame-wrapper1">
                    <div class="ellipse-container">
                      <div class="frame-child3"></div>
                    
                    </div>
                  </div>
                  <div class="search-results-tabs">
                    <div class="rectangle-container">
                   
                      <div class="next-profile-details">
                        <div class="o-minh-c-container2">
                          <p class="o-minh-c2"> <a href="#">Đào Minh Đức</a></p>
                          <p class="sng-ti-bc-ninh-hc-vin-t2">
                            <span>Sống tại Bắc Ninh. Học viện tài chính</span>
                            <span class="span2"> </span>
                          </p>
                        </div>
                         <button class="thm-bn-b2">Thêm bạn bè</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="next-profile-preview">
                  <div class="next-profile-preview-inner">
                    <div class="ellipse-parent1">
                      <div class="frame-child5"></div>
                     
                    </div>
                  </div>
                  <div class="o-minh-c-sng-ti-bc-ninh-group">
                    <div class="o-minh-c-container3">
                      <p class="o-minh-c3"> <a href="#">Đào Minh Đức</a> </p>
                      <p class="sng-ti-bc-ninh-hc-vin-t3">
                        <span>Sống tại Bắc Ninh. Học viện tài chính</span>
                        <span class="span3"> </span>
                      </p>
                    </div>
                    <div class="rectangle-parent1">
                   
                     <button class="thm-bn-b3">Thêm bạn bè</button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="search-results-categories">
                <button class="view-all-button-container">
                  <div class="view-all-button-container-child"></div>
                  <div class="xem-tt-c">Xem tất cả</div>
                </button>
              </div>
            </div>
            <div class="feed-item-content">
              <div class="feed-content">
                <div class="search-item-content">
                  <div class="listing-details">
                    <div class="listing-title">
                      <div class="phng-tr-m"> <a href="#">Phòng trọ Mỹ Đình - Cầu Giấy</a></div>
                      <div class="nguyn-th-hng-parent">
                        <div class="nguyn-th-hng"> <a href="#">Nguyễn Thị Hương.</a></div>
                        <div class="listing-time">
                          <div class="thng-8">16 Tháng 8</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="loa-gc-tm-container">
                    <p class="loa-gc-tm">Loa Góc tìm người ở ghép :</p>
                    <p class="mnh-cn-tm">
                      Mình cần tìm 2 bạn nữ vào ở chung phòng đã có 1 người Yêu
                      cầu : Chỉ cần hoà đồng , vui tính , sạch sẽ là được
                    </p>
                    <p class="a-ch">
                      Địa chỉ : Ngõ 63 Lê Đức Thọ , Nam Từ Liêm Hà Nội
                    </p>
                    <p class="phng-gi-3tr5">
                      Phòng giá 3tr5 chia 3 mỗi người hơn triệu 1 xíu . Điện
                      3,5k/số, nước 35k / khối , dịch vụ chung 100k/ng, giặt sấy
                      80k/ phòng , mạng 80k/ phòng. Phòng ở tầng 6 có chỗ để xe
                      và có thang máy
                    </p>
                  </div>
                </div>
                <div class="listing-engagement">
                  <div class="feed-item-engagement-dividers-parent">
                    <div class="feed-item-engagement-dividers"></div>
                    <div class="parent">
                      <div class="div fs-6">29 cảm xúc </div>
                      <div class="bnh-lun fs-5">30 bình luận</div>
                    </div>
                    <div class="feed-item-engagement-dividers1"></div>
                    <div class="like-comment">
                      <div class="thch-parent">
                        <div class="thch">Thích</div>
                        <div class="bnh-lun1 "> <a href="#">Bình luận</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="feed-item-gallery">
                  <div class="feed-item-gallery-child"></div>
                  <img
                    class="images-3-icon"
                    loading="lazy"
                    alt=""
                    src="https://hoasaigon.com.vn/kcfinder/upload/images/hoa-cuc-tay-.jpg"
                  />

                  <img
                    class="b76f3dbfe55f31363b2518fe16d8b3-icon"
                    loading="lazy"
                    alt=""
                    src="https://hoavily.com/uploads/file/b%E1%BB%95%20sungg/hoa-cuc-10.jpg"
                  />

                  <img
                    class="e093e9cfc9027d6a142358d24d2ee3-icon"
                    alt=""
                    src="https://ghepanh.pro/wp-content/uploads/2022/02/tao-avatar-facebook-co-dau-tich-xanh-2-400x400.jpg"
                  />

                  <img
                    class="c3201174e3c76151a1ba47432dd9b8-icon"
                    loading="lazy"
                    alt=""
                    src="https://hoasaigon.com.vn/kcfinder/upload/images/hoa-cuc-tay-.jpg"
                  />

                  <img
                    class="images-1-icon"
                    loading="lazy"
                    alt=""
                    src="https://www.vitto.vn/admin/webroot/upload/image/images/nhung-thien-duong-hoa-tulip-khong-den-tu-ha-lan-1.jpg"
                  />

                  <img
                    class="images-2-icon"
                    loading="lazy"
                    alt=""
                    src="https://hoahanoi.com.vn/wp-content/uploads/2021/09/y_nghia_hoa_tulip_quoc_hoa_cua_ha_lan_tim_hieu_ve_quoc_hoa_cac_nuoc.jpg"
                  />

                  <img
                    class="e0e0f9a7529b3d3f07666bfbd8122d-icon"
                    loading="lazy"
                    alt=""
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVOB4o-jssaT5A3qnA75lIrX8D_E9cxuTZMQ&s"
                  />

                  <img
                    class="istockphoto-1361277890-612x612-icon"
                    loading="lazy"
                    alt=""
                    src="https://kenh14cdn.com/203336854389633024/2021/3/7/2-16150665819811124794903.jpg"
                  />
                    <img
                    class="istockphoto1"
                    loading="lazy"
                    alt=""
                    src="https://i.pinimg.com/originals/39/44/6c/39446caa52f53369b92bc97253d2b2f1.png"
                  />

                  <img
                    class="image-33-icon"
                    loading="lazy"
                    alt=""
                    
                    src="https://icons.iconarchive.com/icons/iconsmind/outline/512/Like-icon.png"
                  />

                  <img
                    class="image-32-icon"
                    loading="lazy"
                    alt=""
                    src="https://cdn.iconscout.com/icon/free/png-256/free-comment-2652894-2202811.png"
                  />
                  
                </div>
              </div>
            </div>
          </div>
        </div></div>
        <div className="col-md-2"></div>
 
        </main>
      </div> */}
        </div>
      </div>
    );
  }
  return <Content />;
};

export default Search;
