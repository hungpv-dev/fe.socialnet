import './css.scss'

const tieuDe = () => {
   return (
    <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-[1440px] relative">
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
        </div>
        </div>
   )
}

export default tieuDe
