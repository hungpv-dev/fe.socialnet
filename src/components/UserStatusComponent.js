import { useSelector } from 'react-redux';
import { formatDateToNow } from './FormatDate';
import axiosInstance from '@/axios';

function isOnline(users,list){
  // let time_offline = new Date().toISOString();
  let time_offline = null;
  let u = null;
  list.forEach(item => {
    let user = users.find(u => u.id === item.id);
    if (!time_offline || new Date(item.time_offline) > new Date(time_offline)) {
      time_offline = item.time_offline;
    }
    if(user){
      u = user;
    }
  })
  return {time_offline,user: u};
}

export const GetUserStatus = ({listUser}) => {
  const users = useSelector(state => state.user_online);
  let { user } = isOnline(users,listUser);
  return <>
    <div className={user ? 'status' : ''}></div>
  </>;
}
export const GetTimeOffline = ({listUser}) => {
  const users = useSelector(state => state.user_online);
  let { user, time_offline } = isOnline(users,listUser);

  return <>
    {user ? 'Đang hoạt động' : formatDateToNow(time_offline)}
  </>;
}

export const changeStatus = async (id,status) => {
  return await axiosInstance.post('change-status',{user_id:id,status});
}