import { useEffect, useState } from "react";
import React from 'react';
import './main.scss';

const trangGioiThieu = () => {
    return (
        <>
            <div className="w-[1440px] h-[1553px] relative bg-white">
                <div className="w-10 h-[37px] left-[608px] top-[1078px] absolute rounded-full" />
                <div className="w-[994px] h-[388px] left-[223px] top-[88px] absolute bg-[#b4adad] rounded-[10px]" />
                <div className="w-[200px] h-16 left-[997px] top-[345px] absolute bg-[#d9d9d9] rounded-[10px]" />
                <div className="w-[197px] h-16 left-[690px] top-[504px] absolute bg-[#0065e0] rounded-[10px]" />
                <div className="w-[309px] h-16 left-[908px] top-[504px] absolute bg-[#d1cece] rounded-[10px]" />
                <div className="w-[129px] h-[37px] left-[1051px] top-[366px] absolute text-black text-xl font-normal font-['Inter']">Thêm ảnh bìa </div>
                <div className="w-[182px] h-[27px] left-[705px] top-[523px] absolute text-[#fffbfb] text-2xl font-normal font-['Inter']">+ Thêm vào tin </div>
                <div className="w-[419px] h-[29px] left-[934px] top-[522px] absolute text-black text-2xl font-normal font-['Inter']">Chỉnh sửa trang cá nhân </div>
                <img className="w-[270px] h-[274px] left-[271px] top-[345px] absolute rounded-full" src="https://via.placeholder.com/270x274" />
                <div className="w-[79px] h-20 left-[439px] top-[559px] absolute bg-[#f0eeee] rounded-full" />
                <div className="w-[1000px] h-[0px] left-[271px] top-[671px] absolute border border-black/60"></div>
                <div className="w-[145px] h-20 left-[290px] top-[698px] absolute opacity-60 text-black text-4xl font-normal font-['Inter']">Bài viết </div>
                <div className="w-[184px] h-20 left-[467px] top-[698px] absolute text-[#0065e0] text-4xl font-normal font-['Inter']">Giới thiệu</div>
                <div className="w-[184px] h-20 left-[683px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Bạn bè </div>
                <div className="w-[184px] h-20 left-[850px] top-[698px] absolute text-black/60 text-4xl font-normal font-['Inter']">Ảnh </div>
                <div className="w-[184px] h-20 left-[969px] top-[700px] absolute text-black/60 text-4xl font-normal font-['Inter']">Video</div>
                <div className="w-[132px] h-[53px] left-[558px] top-[552px] absolute text-black text-4xl font-bold font-['Inter']">User</div>
                <div className="w-[1450px] h-[1984px] left-[-5px] top-[781px] absolute bg-[#e4e4e4]/90 rounded-[15px]" />
                <div className="w-[955px] h-[545px] left-[243px] top-[818px] absolute bg-white rounded-[15px]" />
                <div className="w-[213px] h-[69px] left-[290px] top-[839px] absolute text-black text-[32px] font-bold font-['Inter']">Giới thiệu </div>
                <div className="w-[248px] h-[71px] left-[290px] top-[908px] absolute text-black/60 text-[32px] font-normal font-['Inter']">Tổng quan </div>
                <div className="w-[543px] h-[0px] left-[527px] top-[820px] absolute origin-top-left rotate-[89.89deg] border border-black/50"></div>
                <div className="w-[69px] h-[71px] left-[552px] top-[847px] absolute bg-[#b4dfff] rounded-full" />
                <div className="w-8 h-[13px] left-[565px] top-[839px] absolute text-black text-[64px] font-normal font-['Inter']">+</div>
                <div className="w-[507px] h-14 left-[633px] top-[862px] absolute text-[#0065e0] text-[32px] font-normal font-['Inter']">Thêm nơi làm việc </div>
                <div className="w-[324px] h-[27px] left-[610px] top-[958px] absolute text-black text-2xl font-normal font-['Inter']">Cao đẳng FPT PolyTechnic</div>
                <img className="w-[27px] h-[34px] left-[562px] top-[1017px] absolute" src="https://via.placeholder.com/27x34" />
                <div className="w-[304px] h-[29px] left-[606px] top-[1078px] absolute text-black text-2xl font-normal font-['Inter']">Có 200 người theo dõi </div>
                <div className="w-[304px] h-[29px] left-[606px] top-[1127px] absolute text-[#4084ea] text-2xl font-normal font-['Inter']">pathuw__</div>
                <div className="w-[341px] h-[29px] left-[607px] top-[1022px] absolute text-black text-2xl font-normal font-['Inter']">Đến từ Thanh Thủy- Phú Thọ </div>
                <img className="w-[15px] h-[19px] left-[1046px] top-[962px] absolute rounded-[15px]" src="https://via.placeholder.com/15x19" />
                <img className="w-[15px] h-[19px] left-[1046px] top-[1022px] absolute rounded-[15px]" src="https://via.placeholder.com/15x19" />
                <img className="w-[15px] h-[19px] left-[1046px] top-[1081px] absolute rounded-[15px]" src="https://via.placeholder.com/15x19" />
                <img className="w-[15px] h-[19px] left-[1046px] top-[1140px] absolute rounded-[15px]" src="https://via.placeholder.com/15x19" />
                <div className="w-[31px] h-8 left-[1079px] top-[961px] absolute bg-[#e8e8e8] rounded-full" />
                <div className="w-[63px] h-[7px] left-[1083px] top-[960px] absolute text-black text-xl font-normal font-['Inter']">....</div>
                <div className="w-[31px] h-8 left-[1079px] top-[1016px] absolute bg-[#e8e8e8] rounded-full" />
                <div className="w-[63px] h-[7px] left-[1083px] top-[1015px] absolute text-black text-xl font-normal font-['Inter']">....</div>
                <div className="w-[31px] h-8 left-[1079px] top-[961px] absolute bg-[#e8e8e8] rounded-full" />
                <div className="w-[63px] h-[7px] left-[1083px] top-[960px] absolute text-black text-xl font-normal font-['Inter']">....</div>
                <div className="w-[31px] h-8 left-[1079px] top-[1075px] absolute bg-[#e8e8e8] rounded-full" />
                <div className="w-[63px] h-[7px] left-[1083px] top-[1074px] absolute text-black text-xl font-normal font-['Inter']">....</div>
                <div className="w-[31px] h-8 left-[1079px] top-[1131px] absolute bg-[#e8e8e8] rounded-full" />
                <div className="w-[63px] h-[7px] left-[1083px] top-[1130px] absolute text-black text-xl font-normal font-['Inter']">....</div>
                <div className="w-[1440px] h-[60px] left-0 top-0 absolute bg-white">
                    <div className="w-[319px] h-10 left-[10px] top-[10px] absolute">
                        <div className="w-10 h-10 left-0 top-0 absolute">
                            <div className="w-10 h-10 left-0 top-0 absolute bg-[#d9d9d9] rounded-[20px]" />
                            <div className="w-[31px] h-[13px] left-[5px] top-[12px] absolute text-black text-xs font-normal font-['Inter']">Logo</div>
                        </div>
                        <div className="w-[261px] h-10 left-[58px] top-0 absolute">
                            <div className="w-[261px] h-10 left-0 top-0 absolute bg-[#d9d9d9] rounded-[20px]" />
                            <div className="w-[23px] h-[23px] left-[6.54px] top-[9px] absolute bg-black/0" />
                            <div className="w-[128.86px] h-5 left-[37.94px] top-[12px] absolute text-black text-xs font-normal font-['Inter']">Tìm kiếm</div>
                        </div>
                    </div>
                    <div className="w-[562px] h-[31px] left-[439px] top-[14px] absolute">
                        <div className="w-[30px] h-[30px] left-0 top-[1px] absolute bg-black/0" />
                        <div className="w-[30px] h-[30px] left-[266px] top-[1px] absolute bg-black/0" />
                        <div className="w-[30px] h-[30px] left-[532px] top-0 absolute" />
                    </div>
                    <div className="w-[184px] h-10 left-[1246px] top-[10px] absolute">
                        <div className="w-10 h-10 left-[144px] top-0 absolute">
                            <img className="w-10 h-10 left-0 top-0 absolute rounded-full" src="https://via.placeholder.com/40x40" />
                            <div className="w-[13.33px] h-[13.33px] left-[26.67px] top-[26.67px] absolute">
                                <div className="w-[13.33px] h-[13.33px] left-0 top-0 absolute bg-[#d9d9d9] rounded-full" />
                                <div className="w-[13.33px] h-[13.33px] left-0 top-0 absolute bg-black/0" />
                            </div>
                        </div>
                        <div className="w-10 h-10 left-[96px] top-0 absolute">
                            <div className="w-10 h-10 left-0 top-0 absolute bg-[#e4e4e4]/90 rounded-full" />
                            <div className="w-[25px] h-[25px] left-[8px] top-[8px] absolute bg-black/0" />
                        </div>
                        <div className="w-10 h-10 left-[48px] top-0 absolute">
                            <div className="w-10 h-10 left-0 top-0 absolute bg-[#e4e4e4]/90 rounded-full" />
                            <div className="w-[19.05px] h-[18.15px] left-[11.57px] top-[11.57px] absolute">
                            </div>
                        </div>
                        <div className="w-10 h-10 left-0 top-0 absolute">
                            <div className="w-10 h-10 left-0 top-0 absolute bg-[#e4e4e4]/90 rounded-full" />
                            <div className="w-[25px] h-[25px] left-[6px] top-[8px] absolute bg-black/0" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default trangGioiThieu;