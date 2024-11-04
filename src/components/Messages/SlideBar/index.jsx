import classNames from 'classnames/bind';

import styles from "./main.scss";
import User from '../User';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { PupupCreateGroupChat } from '@/components/PopupComponent';
import { Avatar, Badge, CircularProgress } from '@mui/material';
import useChatRoom from '@/hooks/useChatRoom';
import { setRooms } from '@/actions/rooms';
import { debounce } from 'lodash';
const cx = classNames.bind(styles);

function SlideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const chatRoom = useChatRoom();
  const [modalVisible, setModalVisible] = useState(false);
  const [createGroupModalVisible, setCreateGroupModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState({
    friends: [],
    rooms: []
  });
  const modalPopup = useRef(null);
  const buttonToggle = useRef(null);
  const sliderbarRef = useRef(null);

  var rooms = useSelector((state) => state.rooms);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const toggleCreateGroupModal = () => {
    setCreateGroupModalVisible(!createGroupModalVisible);
    setModalVisible(false);
  };

  const handleClickOutside = (event) => {
    if (
      modalPopup.current &&
      !modalPopup.current.contains(event.target) &&
      !buttonToggle.current.contains(event.target)
    ) {
      setModalVisible(false);
    }
  };

  const debouncedSearch = useRef(
    debounce(async (value) => {
      if (value.trim()) {
        try {
          setIsSearchLoading(true);
          const response = await chatRoom.search(value);
          if (response) {
            setSearchResults(response);
          } else {
            setSearchResults({
              friends: [],
              rooms: []
            });
          }
        } catch (error) {
          console.error('Lỗi tìm kiếm:', error);
          setSearchResults({
            friends: [],
            rooms: []
          });
        } finally {
          setIsSearchLoading(false);
        }
      } else {
        setSearchResults({
          friends: [],
          rooms: []
        });
      }
    }, 500)
  ).current;

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleFriendClick = async (friendId) => {
    try {
      const response = await chatRoom.createPrivateRoom(friendId);
      if (response?.data) {
        const room = response.data.data;
        navigate(`/messages/${room.chat_room_id}`);
      }
    } catch (error) {
      console.error('Lỗi khi tạo phòng chat:', error);
    }
  };

  useEffect(() => {
    if (modalVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalVisible]);

  useEffect(() => {
    const handleScroll = async () => {
      const element = sliderbarRef.current;
      if (element.scrollHeight - element.scrollTop === element.clientHeight && !isLoading && hasMore) {
        setIsLoading(true);
        const responseRooms = await chatRoom.index(rooms.length);
        if (responseRooms?.data?.length) {
          dispatch(setRooms([...rooms, ...responseRooms.data]));
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
      }
    };

    const sliderbar = sliderbarRef.current;
    if (sliderbar) {
      sliderbar.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (sliderbar) {
        sliderbar.removeEventListener('scroll', handleScroll);
      }
    };
  }, [rooms, isLoading, hasMore]);

  return (
    <aside id='sliderbar' ref={sliderbarRef} className={cx("slidebar")}>
      <div className='nav-top'>
        <header className='d-flex justify-content-between align-items-center'>
          <div className='title'>
            <Link to="/">
              <h3 className='fw-bold'>Đoạn chat</h3>
            </Link>
          </div>
          <button
            ref={buttonToggle}
            onClick={toggleModal}
            className='icon d-flex justify-content-center align-items-center'
          >
            <i className="bi bi-three-dots fs-3 d-flex justify-content-center align-items-center"></i>
          </button>
          {modalVisible && (
            <div className='popup-modal border p-2' ref={modalPopup}>
              <ul className='list-unstyled mb-0'>
                <li className='d-flex align-items-center fs-8' onClick={toggleCreateGroupModal}>
                  <div className='modal-icon fw-bold m-1 me-3 fs-5'>
                    <i className="bi bi-people-fill"></i>
                  </div>
                  <div className='modal-text'>
                    <p className='m-0 fw-bold'>Tạo nhóm chat</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </header>
        {createGroupModalVisible && <PupupCreateGroupChat onClose={() => setCreateGroupModalVisible(false)} />}
        <div className='search'>
          <div className='icon me-2'>
            {isSearchLoading ? (
              <CircularProgress size={16} />
            ) : (
              <i className="bi bi-search"></i>
            )}
          </div>
          <input 
            type="search" 
            className='input-search' 
            placeholder='Tìm kiếm trên social chat'
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className='list-user mb-2 p-2 d-flex flex-column gap-2'>
        {isSearchLoading ? (
          <div className="d-flex justify-content-center align-items-center p-4">
            <CircularProgress size={30} />
          </div>
        ) : searchTerm ? (
          <>
            {searchResults.rooms.length > 0 && (
              <div className="search-section">
                <h6 className="fw-bold mb-2">Đoạn chat</h6>
                {searchResults.rooms.map((room) => (
                  <User key={room.chat_room_id} room={room} />
                ))}
              </div>
            )}
            {searchResults.friends.length > 0 && (
              <div className="search-section">
                <h6 className="fw-bold mb-2">Bạn bè</h6>
                {searchResults.friends.map((friend) => (
                  <div 
                    key={friend.id} 
                    className={cx("friend-item", "d-flex", "align-items-center", "gap-2", "p-2")}
                    onClick={() => handleFriendClick(friend.id)}
                    style={{ 
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      borderRadius: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f0f2f5';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div className={cx("avatar-wrapper")}>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color={friend.is_online ? "success" : "default"}
                      >
                        <Avatar 
                          src={friend.avatar} 
                          alt={friend.name}
                          className={cx("friend-avatar")} 
                        />
                      </Badge>
                    </div>
                    <div className={cx("friend-name", "fw-bold")}>
                      {friend.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {searchResults.friends.length === 0 && searchResults.rooms.length === 0 && (
              <div className="text-center p-4">
                <i className="bi bi-search fs-1 text-muted mb-2"></i>
                <p className="text-muted mb-0">Không tìm thấy kết quả phù hợp</p>
              </div>
            )}
          </>
        ) : (
          <>
            {rooms.map((room) => (
              <User key={room.chat_room_id} currentRooms={rooms} room={room} />
            ))}
          </>
        )}
        {isLoading && (
          <div className="d-flex justify-content-center p-3">
            <CircularProgress size={25} />
          </div>
        )}
      </div>
    </aside>
  );
}

export default SlideBar;
