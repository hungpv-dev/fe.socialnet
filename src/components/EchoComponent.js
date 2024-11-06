import Echo from 'laravel-echo';
import io from 'socket.io-client';

const echo = new Echo({
    broadcaster: 'socket.io',
    client: io,
    toLogConsole: true,
    host: window.location.hostname + ':6001',
    transport: ['websocket','polling','flashsocket'],
    auth: {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
    },
});

export default echo;