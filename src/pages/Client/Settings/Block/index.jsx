import './main.scss';

const BlockItem = ({ title, description, learnMore }) => (
  <div className="row block-item">
    <div className='col-10'>
        <h4 className="block-item__title">{title}</h4>
        <p className="block-item__description">{description}</p>
        {learnMore && (
        <a href="#learn-more" className="block-item__link">
            {learnMore}
        </a>
        )}
    </div>
    <div className='col-2'>
        <button className="block-item__edit-btn">Edit</button>
    </div>
  </div>
);

const BlockManagement = () => {
  const blockItems = [
    {
      title: 'Danh sách hạn chế',
      description:
        'Khi bạn thêm trang cá nhân của ai đó vào Danh sách hạn chế trên Facebook, họ sẽ không nhìn thấy các bài viết mà bạn chỉ chia sẻ với Bạn bè. Họ có thể vẫn nhìn thấy nội dung bạn chia sẻ Công khai hoặc trên trang cá nhân của người khác.',
      learnMore: 'Tìm hiểu thêm',
    },
    {
      title: 'Chặn người dùng',
      description:
        'Khi bạn chặn ai đó, họ sẽ không xem được nội dung bạn đăng trên dòng thời gian của mình...',
    },
    {
      title: 'Chặn tin nhắn',
      description:
        'Nếu bạn chặn trang cá nhân của ai đó trên Facebook, họ cũng sẽ không thể liên hệ với bạn trong Messenger...',
      learnMore: 'Tìm hiểu thêm',
    },
    {
      title: 'Chặn lời mời cài đặt ứng dụng',
      description:
        'Sau khi chặn lời mời cài đặt ứng dụng từ trang cá nhân của người khác...',
    },
    {
      title: 'Chặn lời mời tham gia sự kiện',
      description:
        'Khi bạn chặn lời mời tham gia sự kiện từ trang cá nhân của một người...',
    },
    {
      title: 'Chặn trang',
      description:
        'Sau khi chặn một Trang, Trang đó sẽ không thể tương tác với bài viết của bạn hoặc phần hồi bình luận của bạn...',
    },
  ];

  return (
    <div className='row block-management-container'>
        {/* <div className='col-2'></div> */}
        <div className="col-10 block-management">
            <h2 className="block-management__heading">Đang chặn</h2>
            <div className="block-management__content">
                <h3 className="block-management__subheading">Quản lý chặn</h3>
                {blockItems.map((item, index) => (
                <BlockItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    learnMore={item.learnMore}
                />
                ))}
            </div>
        </div>
    </div>
  );
};

export default BlockManagement;