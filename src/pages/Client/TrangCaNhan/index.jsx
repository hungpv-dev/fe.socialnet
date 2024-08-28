import { useEffect, useState } from "react";
import React from 'react';
import './main.scss';

const Canhan = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-white">
                <div className="w-[1440px] h-[2760px] relative">
                    <header>
                        {/* anh bia */}
                        <div className="w-[990px] h-[388px] left-[238px] top-[63px] absolute bg-[#b4adad] rounded-[10px]">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM8MyajtJunf-jP0Hz_C1qvwE3pBTI-jR36A&s" alt="" className="w-full h-full object-cover rounded-[10px]" />
                        </div>
                        {/* them ảnh bia */}
                        <button className="w-[184px] h-16 left-[943px] top-[345px] absolute bg-[#d9d9d9] rounded-[10px] flex items-center justify-center space-x-2">
                            <svg className="h-8 w-8 text-slate-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                <circle cx="12" cy="13" r="3" />
                            </svg>
                            <span className="text-black text-xl font-normal font-['Inter']">Thêm ảnh bia</span>
                        </button>
                        {/* them tin */}
                        <button className="w-[181px] h-16 left-[692px] top-[505px] absolute bg-[#0065e0] rounded-[10px] flex items-center justify-center">
                            <span className="text-[#fffbfb] text-2xl font-normal font-['Inter']">+ Thêm vào tin</span>
                        </button>
                        {/* sửa trang ca nhan */}
                        <button className="w-[324px] h-16 left-[893px] top-[505px] absolute bg-[#d1cece] rounded-[10px] flex items-center justify-center space-x-2">
                            <svg className="h-8 w-8 text-slate-400" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                            <span className="text-black text-2xl font-normal font-['Inter']">Chỉnh sửa trang cá nhân</span>
                        </button>
                        {/* ảnh đại diện */}
                        <div className="w-[265px] h-[266px] left-[257px] top-[345px] absolute flex items-center justify-center">
                            <div className="w-full h-full rounded-full overflow-hidden">
                                <img className="w-full h-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiyrpSorxQ9z2cYsy0ueHGseMCrnOYizDKbQ&s" alt="Profile" />
                            </div>
                        </div>
                        {/* icon ảnh đại diện */}
                        <div className="w-[76px] h-[75px] left-[411px] top-[559px] absolute bg-[#f0eeee] rounded-full overflow-hidden flex items-center justify-center">
                            <svg className="h-8 w-8 text-slate-400" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
                                <circle cx="12" cy="13" r="3" />
                            </svg>
                        </div>
                        {/* tên tài khoản */}
                        <div className="w-[121px] h-[53px] left-[521px] top-[552px] absolute text-black text-4xl font-bold font-['Inter']">User</div>
                        {/* dong ke */}
                        <div className="w-[920.11px] h-[0px] left-[256.76px] top-[671px] absolute border border-black/60"></div>
                        {/* menu */}
                        <div className="w-[134px] h-20 left-[274px] top-[698px] absolute text-[#000aff] text-4xl font-normal font-['Inter']">Bài viết </div>
                        <div className="w-[169px] h-20 left-[437px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Giới thiệu</div>
                        <div className="w-[169px] h-20 left-[636px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Bạn bè </div>
                        <div className="w-[169px] h-20 left-[790px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Ảnh </div>
                        <div className="w-[169px] h-20 left-[891px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Video</div>
                    </header>

                    <div className="w-[191px] h-16 left-[272px] top-[839px] absolute text-black text-[32px] font-bold font-['Inter']">Giới thiệu </div>
                    {/* them tieu su */}
                    <button className="w-[375px] h-[49px] left-[272px] top-[897px] absolute bg-[#d9d9d9] rounded-[10px] flex items-center justify-center">
                        <span className="text-[#040303] text-2xl font-normal font-['Inter']">Thêm tiểu sử</span>
                    </button>
                    {/* thông tin tiểu sử */}
                    <div className="flex items-center space-x-2 w-[324px] h-[27px] absolute text-black text-2xl font-normal font-['Inter'] left-[300px] top-[968px] ml-0">
                        <svg className="h-8 w-8 text-slate-400" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                            <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                            <line x1="3" y1="6" x2="3" y2="19" />
                            <line x1="12" y1="6" x2="12" y2="19" />
                            <line x1="21" y1="6" x2="21" y2="19" />
                        </svg>
                        <span>Cao đẳng FPT PolyTechnic</span>
                    </div>

                    <div className="flex items-center space-x-2 w-[341px] h-[29px] absolute left-[300px] top-[1018px] text-black text-2xl font-normal font-['Inter']">
                        <svg className="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>Đến từ Thanh Thủy - Phú Thọ</span>
                    </div>

                    <div className="flex items-center space-x-2 w-[304px] h-[29px] absolute left-[300px] top-[1065px] text-black text-2xl font-normal font-['Inter']">
                        <svg
                            className="h-8 w-8 text-gray-500"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <g transform="rotate(-45 12 18)">
                                <line x1="12" y1="18" x2="12.01" y2="18" />
                                <path d="M12 14a4 4 0 0 1 4 4" />
                                <path d="M12 10a8 8 0 0 1 8 8" />
                                <path d="M12 6a12 12 0 0 1 12 12" />
                            </g>
                        </svg>
                        <span>Có 200 người theo dõi</span>
                    </div>

                    <div className="flex items-center space-x-2 w-[304px] h-[29px] absolute left-[300px] top-[1105px] text-[#4084ea] text-2xl font-normal font-['Inter']">
                        <svg
                            className="h-8 w-8 text-gray-500"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        <div>pathuw__</div>
                    </div>

                    {/* chinhr sửa chi tiet */}
                    <button className="w-[375px] h-[49px] left-[272px] top-[1157px] absolute bg-[#d9d9d9] rounded-[10px] flex items-center justify-center">
                        <span className="text-black text-2xl font-normal font-['Inter']">Chỉnh sửa chi tiết</span>
                    </button>
                    {/* chỉnh sửa phần đáng chú ý */}
                    <button className="w-[376px] h-[49px] left-[273px] top-[1439px] absolute bg-[#d9d9d9] rounded-[10px] flex items-center justify-center">
                        <span className="text-black text-2xl font-normal font-['Inter']">Chỉnh sửa phần đáng chú ý</span>
                    </button>


                    <img className="w-[15px] h-[19px] left-[865px] top-[1762px] absolute rounded-[15px]" src="https://via.placeholder.com/15x19" />
                    <div className="w-[498px] h-[0px] left-[707px] top-[893px] absolute border border-black/60"></div>
                    <img className="w-[51px] h-[54px] left-[722px] top-[827px] absolute rounded-full" src="https://via.placeholder.com/51x54" />
                    <img className="w-[51px] h-[54px] left-[713px] top-[1124px] absolute rounded-full" src="https://via.placeholder.com/51x54" />
                    <img className="w-[51px] h-[54px] left-[713px] top-[1733px] absolute rounded-full" src="https://via.placeholder.com/51x54" />
                    <img className="w-[51px] h-[54px] left-[713px] top-[1607px] absolute rounded-full" src="https://via.placeholder.com/51x54" />
                    <div className="w-[389px] h-[47px] left-[781px] top-[829px] absolute bg-[#e8e5e5] rounded-[20px]" />
                    <div className="w-56 h-6 left-[805px] top-[841px] absolute opacity-50 text-black text-xl font-semibold font-['Inter']">Bạn đang nghĩ gì?</div>
                    <div className="w-56 h-[25px] left-[909px] top-[917px] absolute opacity-50 text-black text-xl font-semibold font-['Inter']">Ảnh/ Video </div>
                    <div className="w-[163px] h-[50px] left-[722px] top-[1029px] absolute text-black text-[32px] font-bold font-['Inter']">Bài viết </div>
                    <div className="w-[161px] h-11 left-[770px] top-[1123px] absolute text-[#433f3f]/80 text-2xl font-bold font-['Inter']">Anh Thư</div>
                    <div className="w-[161px] h-11 left-[773px] top-[1733px] absolute text-[#433f3f]/80 text-2xl font-bold font-['Inter']">Anh Thư</div>
                    <div className="w-[161px] h-11 left-[770px] top-[1157px] absolute text-[#433f3f]/80 text-base font-semibold font-['Inter']"> 31 tháng 5</div>
                    <div className="w-[161px] h-11 left-[771px] top-[1762px] absolute text-[#433f3f]/80 text-base font-semibold font-['Inter']"> 31 tháng 5</div>
                    <div className="w-[484px] h-[130px] left-[736px] top-[1189px] absolute opacity-70 text-black text-base font-semibold font-['Inter']">Living for yourself, not for anyone else</div>
                    <div className="w-[484px] h-[129px] left-[729px] top-[1803px] absolute opacity-70 text-black text-base font-semibold font-['Inter']">Tips tạo dáng khi ngồi cho các nàng :)))</div>
                    <img className="w-[126px] h-60 left-[759px] top-[1224px] absolute rounded-[15px]" src="https://via.placeholder.com/126x240" />
                    <img className="w-[126px] h-60 left-[760px] top-[1846px] absolute rounded-[15px]" src="https://via.placeholder.com/126x240" />
                    <img className="w-[125px] h-60 left-[893px] top-[1248px] absolute rounded-[15px]" src="https://via.placeholder.com/125x240" />
                    <img className="w-[126px] h-60 left-[1026px] top-[1846px] absolute rounded-[15px]" src="https://via.placeholder.com/126x240" />
                    <img className="w-[126px] h-60 left-[1026px] top-[1224px] absolute rounded-[15px]" src="https://via.placeholder.com/126x240" />
                    <img className="w-[125px] h-[239px] left-[893px] top-[1871px] absolute rounded-[15px]" src="https://via.placeholder.com/125x239" />
                    <div className="w-[439px] h-[0px] left-[713px] top-[1541px] absolute border border-black/40"></div>
                    <div className="w-[435px] h-[0px] left-[714px] top-[2180px] absolute border border-black/40"></div>
                    <div className="w-[434.04px] h-[0px] left-[716.46px] top-[1588.55px] absolute border border-black/40"></div>
                    <div className="w-[435px] h-[0px] left-[714px] top-[2242px] absolute border border-black/40"></div>
                    <img className="w-[37px] h-[33px] left-[771px] top-[1498px] absolute" src="https://via.placeholder.com/37x33" />
                    <img className="w-9 h-[33px] left-[745px] top-[2129px] absolute" src="https://via.placeholder.com/36x33" />
                    <img className="w-[27px] h-[33px] left-[750px] top-[1501px] absolute" src="https://via.placeholder.com/27x33" />
                    <img className="w-[27px] h-8 left-[775px] top-[2133px] absolute" src="https://via.placeholder.com/27x32" />
                    <div className="w-[210px] h-6 left-[808px] top-[1508px] absolute text-black/60 text-base font-semibold font-['Inter']">Anh Thư và 2 người khác </div>
                    <div className="w-52 h-[23px] left-[810px] top-[2139px] absolute text-black/60 text-base font-semibold font-['Inter']">Anh Thư và 2 người khác </div>
                    <div className="w-[23px] h-3.5 left-[1095px] top-[1509px] absolute opacity-60 text-black text-base font-semibold font-['Inter']">6</div>
                    <div className="w-[23px] h-3 left-[1105px] top-[2140px] absolute opacity-60 text-black text-base font-semibold font-['Inter']">10</div>
                    <img className="w-[58px] h-[33px] left-[780px] top-[1545px] absolute" src="https://via.placeholder.com/58x33" />
                    <img className="w-[58px] h-[33px] left-[780px] top-[2189px] absolute" src="https://via.placeholder.com/58x33" />
                    <div className="w-[65px] h-[25px] left-[847px] top-[1557px] absolute text-black/50 text-base font-semibold font-['Inter']">Thích </div>
                    <div className="w-[66px] h-[25px] left-[843px] top-[2200px] absolute text-black/50 text-base font-semibold font-['Inter']">Thích </div>
                    <div className="w-[89px] h-[25px] left-[1029px] top-[1557px] absolute text-black/50 text-base font-semibold font-['Inter']">Bình luận </div>
                    <div className="w-[81px] h-[25px] left-[1031px] top-[2200px] absolute text-black/50 text-base font-semibold font-['Inter']">Bình luận </div>
                    <img className="w-[38px] h-[27px] left-[988px] top-[1551px] absolute" src="https://via.placeholder.com/38x27" />
                    <img className="w-[38px] h-[26px] left-[990px] top-[2197px] absolute" src="https://via.placeholder.com/38x26" />
                    <div className="w-[370px] h-[54px] left-[771px] top-[1607px] absolute bg-[#ebebeb] rounded-[15px]" />
                    <div className="w-[560px] h-[29px] left-[785px] top-[1625px] absolute opacity-50 text-black text-base font-semibold font-['Inter']">Bình luận với vai trò Anh Thư </div>
                    <div className="w-[421px] h-[381px] left-[251px] top-[1545px] absolute bg-white rounded-[15px]" />
                    <div className="w-[421px] h-[452px] left-[250px] top-[1951px] absolute bg-white rounded-[15px]" />
                    <div className="w-48 h-[65px] left-[284px] top-[1561px] absolute text-black text-[32px] font-bold font-['Inter']">Ảnh </div>
                    <div className="w-[216px] h-7 left-[497px] top-[1567px] absolute text-[#0065e0] text-2xl font-normal font-['Inter']">Xem tất cả ảnh </div>
                    <img className="w-[110px] h-[117px] left-[284px] top-[1638px] absolute rounded-[15px]" src="https://via.placeholder.com/110x117" />
                    <img className="w-[119px] h-[117px] left-[398px] top-[1638px] absolute rounded-[15px]" src="https://via.placeholder.com/119x117" />
                    <img className="w-[110px] h-[118px] left-[284px] top-[1765px] absolute rounded-[15px]" src="https://via.placeholder.com/110x118" />
                    <img className="w-[118px] h-[117px] left-[523px] top-[1638px] absolute rounded-[15px]" src="https://via.placeholder.com/118x117" />
                    <div className="w-[137px] h-10 left-[287px] top-[1970px] absolute text-black text-[32px] font-bold font-['Inter']">Bạn bè </div>
                    <div className="w-52 h-[29px] left-[458px] top-[1976px] absolute text-[#0065e0] text-2xl font-normal font-['Inter']">Xem tất cả bạn bè </div>
                    <div className="w-[209px] h-[30px] left-[714px] top-[2249px] absolute text-[#0065e0] text-xl font-normal font-['Inter']">Xem thêm bình luận  </div>
                    <div className="w-52 h-[30px] left-[287px] top-[2010px] absolute text-[#acacac] text-xl font-normal font-['Inter']">883 người bạn</div>
                    <div className="w-[209px] h-[30px] left-[750px] top-[2431px] absolute text-[#acacac] text-[15px] font-normal font-['Inter']">4 tuần </div>
                    <img className="w-[110px] h-[117px] left-[284px] top-[2052px] absolute rounded-[15px]" src="https://via.placeholder.com/110x117" />
                    <img className="w-[110px] h-[117px] left-[284px] top-[2211px] absolute rounded-[15px]" src="https://via.placeholder.com/110x117" />
                    <img className="w-[109px] h-[117px] left-[406px] top-[2052px] absolute rounded-[15px]" src="https://via.placeholder.com/109x117" />
                    <img className="w-[109px] h-[117px] left-[406px] top-[2211px] absolute rounded-[15px]" src="https://via.placeholder.com/109x117" />
                    <img className="w-[110px] h-[117px] left-[527px] top-[2052px] absolute rounded-[15px]" src="https://via.placeholder.com/110x117" />
                    <img className="w-[110px] h-[117px] left-[527px] top-[2211px] absolute rounded-[15px]" src="https://via.placeholder.com/110x117" />
                    <div className="w-[94px] h-4 left-[319px] top-[2172px] absolute text-black text-xl font-normal font-['Inter']">Anna</div>
                    <div className="w-[94px] h-4 left-[772px] top-[2289px] absolute text-black text-xl font-normal font-['Inter']">Anna</div>
                    <div className="w-[94px] h-4 left-[319px] top-[2331px] absolute text-black text-xl font-normal font-['Inter']">David</div>
                    <div className="w-[93px] h-4 left-[434px] top-[2331px] absolute text-black text-xl font-normal font-['Inter']">Salim</div>
                    <div className="w-[94px] h-4 left-[561px] top-[2331px] absolute text-black text-xl font-normal font-['Inter']">Him</div>
                    <div className="w-[94px] h-4 left-[444px] top-[2172px] absolute text-black text-xl font-normal font-['Inter']">Bella</div>
                    <div className="w-[94px] h-4 left-[561px] top-[2172px] absolute text-black text-xl font-normal font-['Inter']">Tom</div>
                    <img className="w-[52px] h-[54px] left-[714px] top-[2279px] absolute rounded-[61px]" src="https://via.placeholder.com/52x54" />
                    <img className="w-[100px] h-28 left-[792px] top-[2314px] absolute" src="https://via.placeholder.com/100x112" />
                    <div className="w-11 h-[15px] left-[811px] top-[2431px] absolute opacity-70 text-black text-[15px] font-normal font-['Inter']">Thích</div>
                    <div className="w-[62px] h-[15px] left-[866px] top-[2431px] absolute text-black text-[15px] font-normal font-['Inter']">Phản hồi </div>
                    <div className="w-[37px] h-[0px] left-[813px] top-[2446px] absolute opacity-60 border border-black"></div>
                    <div className="w-[132px] h-[22px] left-[784px] top-[2406px] absolute bg-[#fffbfb] rounded-[20px]" />
                    <img className="w-[15px] h-[17px] left-[817px] top-[2408px] absolute rounded-[320px]" src="https://via.placeholder.com/15x17" />
                    <img className="w-[17px] h-[17px] left-[833px] top-[2408px] absolute" src="https://via.placeholder.com/17x17" />

                </div>
            </div>
        </>
    )
};

export default Canhan;