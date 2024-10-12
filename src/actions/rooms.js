export const getRooms = () => {
    return {
        type: 'GET',
    };
};
export const setRooms = (rooms) => {
    return {
        type: 'SET',
        payload: rooms,
    };
};