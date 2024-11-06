export const getRooms = () => {
    return {
        type: 'GET_ROOM',
    };
};
export const setRooms = (rooms) => {
    return {
        type: 'SET_ROOM',
        payload: rooms,
    };
};