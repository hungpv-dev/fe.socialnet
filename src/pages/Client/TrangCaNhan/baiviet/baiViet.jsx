
const baiViet = () => {
  return(
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <div className="w-[36rem] rounded-lg bg-slate-500 p-12">
      <div className="text-center">Tạo bài viết</div>
            <hr className="p-2" />
      <form action="">
      <div className="flex">
  <img className="w-[85px] h-[85px] rounded-full" src="https://tse1.mm.bing.net/th?id=OIP.-RaIoDl0_uGYZ7MKm473XwHaFj&pid=Api&rs=1&c=1&qlt=95&w=146&h=109" alt="" />
  
  <div className="flex flex-col justify-center relative -top-1 m-2">
    <div>Thang</div>
    <div className="bg-slate-600 p-1 rounded-md">
      <button>Chỉ mình chúng tôi</button>
    </div>
  </div>
</div>
<div className="flex flex-col justify-center relative m-4">
<input
    className=" bg-slate-500 border-2 border-slate-500 p-2 mb-4"
    type="text"
    placeholder="Bạn đang nghĩ j"
  />
        <div className="bg-blue-500 text-center mt-2 p-2 rounded-md">
        <button>Đăng</button>
        </div>
</div>
      </form>
      </div>
    </div>
  )

}
export default baiViet